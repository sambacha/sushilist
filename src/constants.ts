import { resolve } from 'path';
import { tmpdir } from 'os';
import * as z from 'zod';

export const CONTRACT_MAP_REPO = 'metamask/contract-metadata';
export const CONTRACT_MAP_OUTPUT_PATH = resolve(tmpdir(), 'contract-metadata');

export const ETHEREUM_LISTS_REPO = 'ethereum-lists/tokens/tokens/eth';
export const ETHEREUM_LISTS_OUTPUT_PATH = resolve(tmpdir(), 'ethereum-lists/tokens');

/**
 * @todo add semver or hash of the fetched JSON object
 */

export const TokenListItemSchema = z.string().url().nonempty();
export type TokenListItem = z.infer<typeof TokenListItemSchema>;
export const TokenListTypeSchema = z.record(TokenListItemSchema);
export type TokenListType = z.infer<typeof TokenListTypeSchema>;

/**
 *  @constant {TokenList} TOKEN_LISTS
 *  @description defines external token lists to aggregate
 *  @note there is no versioning in these semantics
 */
export const TOKEN_LISTS: TokenListType = {
  coingecko: 'https://tokens.coingecko.com/uniswap/all.json',
};

export const TokenListEnumSchema = z.enum(['coingecko']);
export type TokenListEnum = z.infer<typeof TokenListEnumSchema>;

/**
 * @exports SSocialSchema
 * @description social media profile links
 */

export const SocialSchema = z.object({
  blog: z.string().optional(),
  chat: z.string().optional(),
  discord: z.string().optional(),
  facebook: z.string().optional(),
  forum: z.string().optional(),
  github: z.string().optional(),
  gitter: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  medium: z.string().optional(),
  reddit: z.string().optional(),
  slack: z.string().optional(),
  telegram: z.string().optional(),
  twitter: z.string().optional(),
  youtube: z.string().optional(),
});

export const TokenDeprecationSchema = z.object({
  new_address: z.string().optional(),
});

export const TokenExtensionsSchema = z.object({
  color: z.string().optional(),
  isRainbowCurated: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  shadowColor: z.string().optional(),
});
export type TokenExtensionsType = z.infer<typeof TokenExtensionsSchema>;

/**
 * @exports TokenSchema
 *  @summary token schema that is used to parse the JSON files.
 */

export const TokenSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  chainId: z.number().optional(),
  decimals: z.number().min(0),
  deprecation: TokenDeprecationSchema.optional(),
  extensions: TokenExtensionsSchema.optional(),
  name: z.string(),
  social: SocialSchema.optional(),
  symbol: z.string(),
  website: z.string().optional(),
});

/**
 * @exports RawContractMapTokenSchema
 * @summary token data that is loaded from the JSON files.
 */
export const RawContractMapTokenSchema = z.object({
  address: z.string(),
  decimals: z.union([z.string(), z.number()]),
  name: z.string(),
  symbol: z.string(),
});

/**
 *  @exports RawEthereumListsTokenSchema
 *  @summary token data that is loaded from the JSON files.
 *  These are generally Optional fields
 */
export const RawEthereumListsTokenSchema = z.object({
  address: z.string().optional(),
  decimals: z.union([z.string(), z.number()]).optional(),
  deprecation: TokenDeprecationSchema.optional(),
  name: z.string().optional(),
  social: SocialSchema.optional(),
  symbol: z.string().optional(),
  website: z.string().optional(),
});

/**
 * @export z.infer extract the TypeScript type of the exported schemas
 */
export type RawContractMapToken = z.infer<typeof RawContractMapTokenSchema>;
export type RawEthereumListsToken = z.infer<typeof RawEthereumListsTokenSchema>;
export type Token = z.infer<typeof TokenSchema>;
export type TokenSocialMetadata = z.infer<typeof SocialSchema>;
