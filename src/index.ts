#!/usr/bin/env node

/**
 * @title SushiSwap Generated Tokenlist
 * @description Generateds Tokenlist, and lists for Onsen and SushiBar
 * @version v0.1.0
 * @license "COPYRIGHT 2021 SUSHISWAP CONTRIBUTORS"
 */

import { getAddress } from '@ethersproject/address';
import compact from 'lodash/compact';
import filter from 'lodash/filter';
import find from 'lodash/find';
import keyBy from 'lodash/keyBy';
import matchesProperty from 'lodash/matchesProperty';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import some from 'lodash/some';
import uniq from 'lodash/uniq';
import { resolve } from 'path';
import { Token, TokenExtensionsType, TokenListEnumSchema } from './constants';
import parseEthereumLists from '../parse/parse-ethereum-lists';
import parseOverrideFile from '../parse/chef-overrides';
import parseContractMap from '../parse/parse-contract-map';
import parseSVGIconTokenFiles from '../parse/svg-icons';
import parseTokenLists from '../parse/token-lists';
import { deeplyTrimAllTokenStrings, sortTokens, writeToDisk } from './parser';

import * as Types from './constants';
export { Types };

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

console.log(' 🍣 rolling up the token list ');

function normalizeList(list: any[]) {
  return keyBy(list, ({ address }) => getAddress(address));
}

// Entry point
(async function () {
  const contractMapTokens = await parseContractMap();
  const [uniqueEthereumListTokens, duplicateEthereumListTokens] = await parseEthereumLists();
  const sushiswapOverrides = await parseOverrideFile();
  const svgIcons = await parseSVGIconTokenFiles();
  const tokenListTokens: any = await parseTokenLists();
  const { coingecko, ...preferredTokenLists } = tokenListTokens;

  const sources = {
    default: [
      duplicateEthereumListTokens,
      uniqueEthereumListTokens,
      contractMapTokens,
      coingecko.tokens.flat(),
    ].map(normalizeList),
    preferred: [
      Object.values(preferredTokenLists)
        .map(({ tokens }: any) => tokens)
        .flat(),
    ].map(normalizeList),
  };

  const defaultSources: any = merge({}, ...sources.default);
  const allKnownTokenAddresses: any = uniq(
    compact([
      ...sources.default.map(Object.keys).flat(),
      ...sources.preferred.map(Object.keys).flat(),
    ]).map(getAddress)
  );

  function resolveTokenInfo(tokenAddress: string) {
    function matchToken({ address }: Token): boolean {
      return getAddress(address) === getAddress(tokenAddress);
    }

    const lists = pick(
      tokenListTokens,
      Object.keys(tokenListTokens).filter((list: any) =>
        some(tokenListTokens[list].tokens, matchToken)
      )
    );

    if (Object.keys(lists).length === 1) {
      return find(lists[Object.keys(lists)[0]].tokens, matchToken);
    } else if (Object.keys(lists).length > 1) {
      const listNames = Object.keys(lists);
      if (listNames.includes(TokenListEnumSchema.enum.coingecko)) {
        return find(lists.coingecko.tokens, matchToken);
      }
    }

    return defaultSources[tokenAddress];
  }

  function buildTokenList() {
    return allKnownTokenAddresses.map((tokenAddress: string) => {
      const token = resolveTokenInfo(tokenAddress);
      const overrideToken = sushiswapOverrides[tokenAddress];

      let { chainId = 1, color, decimals, name, shadowColor, symbol } = token;

      const isSushiBar = sources.preferred.map(Object.keys).flat().includes(tokenAddress);

      if (isSushiBar) {
        const logoData = svgIcons.find((item) => item.symbol === symbol);
        color = logoData?.color;
      }
      /**
       *
       * @extends TokenExtensionsType
       */

      const extensions: TokenExtensionsType = {
        color: overrideToken?.color || color,
        isOnsenActive: overrideToken?.isisOnsen ? true : undefined,
        isSushiBar: isSushiBar || overrideToken?.isisOnsen ? true : undefined,
        shadowColor: overrideToken?.shadowColor || shadowColor,
      };

      return deeplyTrimAllTokenStrings({
        address: tokenAddress,
        chainId,
        decimals,
        name: overrideToken?.name || name,
        symbol: overrideToken?.symbol || symbol,
        ...(compact(Object.values(extensions)).length ? { extensions } : undefined),
      });
    });
  }

  const tokens = await sortTokens(buildTokenList());
  await writeToDisk(
    {
      name: 'SushiSwap Menu List',
      timestamp: new Date().toISOString(),
      logoURI: 'https://avatars.githubusercontent.com/u/72222929?s=200&v=4',
      version: {
        major: 1,
        minor: 2,
        patch: 1,
      },
      keywords: ['sushiswap'],
      tokens,
    },
    resolve(process.cwd(), './output'),
    'sushiswap-token-list.json'
  );

  console.log(
    '# of "isOnsenActive" tokens: ',
    filter(tokens, matchesProperty('extensions.isOnsenActive', true)).length
  );
  console.log(
    '# of "isSushiBar" tokens: ',
    filter(tokens, matchesProperty('extensions.isSushiBar', true)).length
  );
})();
