import { getAddress } from '@ethersproject/address';
import mapKeys from 'lodash/mapKeys';
import { resolve } from 'path';
import { parseJsonFile } from '../src/parser';

export type OverrideToken = {
  color?: string;
  isCurated?: boolean;
  name?: string;
  symbol?: string;
  shadowColor?: string;
};

type OverrideFile = { [address: string]: OverrideToken };

export default async function parseOverrideFile(): Promise<OverrideFile> {
  // load svg manifest JSON file from directory
  const jsonFile = resolve(process.cwd(), 'chef.json');
  return parseJsonFile<OverrideFile>(jsonFile).then(override => {
    return mapKeys(override, (...args) => {
      if (args[1] === 'ETH') return args[1];
      return getAddress(args[1]);
    });
  });
}
