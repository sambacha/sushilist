import fetch from 'node-fetch';
import * as z from 'zod';
import { TOKEN_LISTS, TokenListEnum, TokenListEnumSchema } from '../constants';
import { reduceArrayToObject } from '../utils';

export const TokenListStore = z.object({
  tags: z
    .any()
    .array()
    .optional(),
  tokens: z
    .any()
    .array()
    .optional(),
});
export type TokenListStoreType = z.infer<typeof TokenListStore>;
export const TokenListStoreRecord = z.record(TokenListStore);
export type TokenListStoreRecordType = z.infer<typeof TokenListStoreRecord>;

/** 

TODO

const omitTokenWithTag = (tokens: any[], tag: string) =>
  tokens.filter(({ tags = [] }: TokenListStoreType) => !tags.includes(tag));

const pickTokenWithTag = (tokens: any[], tag: string) =>
  tokens.filter(({ tags = [] }: TokenListStoreType) => tags.includes(tag));

  */
// const { aave, sushibar } = TokenListEnumSchema.enum;

export default async function parseTokenLists() {
  const listsArray = await Promise.all(
    TokenListEnumSchema.options.map(
      async (list: TokenListEnum): Promise<TokenListStoreRecordType> => {
        return new Promise(async (resolve, reject) =>
          // fetch the TokenList from remote uri
          fetch(TOKEN_LISTS[list])
            .then((res) => res.json())
            .then(({ tags, tokens }) => resolve({ [list]: { tags, tokens } }))
            .catch(reject)
        );
      }
    )
  );

  return reduceArrayToObject(
    listsArray.map((list: any) => {
      //     const listName = Object.keys(list)[0];
      const newList = { ...list };
      /** 
 
TODO

      if (listName === sushibar) {
        newList[sushibar].tokens = omitTokenWithTag(newList[sushibar].tokens, 'bases');
      }

      if (listName === onsen) {
        newList[onsen].tokens = [
          ...pickTokenWithTag(newList[onsen].tokens, '*'),
          ...pickTokenWithTag(newList[onsen].tokens, '*'),
        ];
      }
      
*/

      return newList;
    })
  );
}
