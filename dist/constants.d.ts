import * as z from 'zod';
export declare const CONTRACT_MAP_REPO = "metamask/contract-metadata";
export declare const CONTRACT_MAP_OUTPUT_PATH: string;
export declare const ETHEREUM_LISTS_REPO = "ethereum-lists/tokens/tokens/eth";
export declare const ETHEREUM_LISTS_OUTPUT_PATH: string;
/**
 * @todo add semver or hash of the fetched JSON object
 */
export declare const TokenListItemSchema: z.ZodString;
export declare type TokenListItem = z.infer<typeof TokenListItemSchema>;
export declare const TokenListTypeSchema: z.ZodRecord<z.ZodString>;
export declare type TokenListType = z.infer<typeof TokenListTypeSchema>;
/**
 *  @constant {TokenList} TOKEN_LISTS
 *  @description defines external token lists to aggregate
 *  @note there is no versioning in these semantics
 */
export declare const TOKEN_LISTS: TokenListType;
export declare const TokenListEnumSchema: z.ZodEnum<["coingecko"]>;
export declare type TokenListEnum = z.infer<typeof TokenListEnumSchema>;
/**
 * @exports SSocialSchema
 * @description social media profile links
 */
export declare const SocialSchema: z.ZodObject<{
    blog: z.ZodOptional<z.ZodString>;
    chat: z.ZodOptional<z.ZodString>;
    discord: z.ZodOptional<z.ZodString>;
    facebook: z.ZodOptional<z.ZodString>;
    forum: z.ZodOptional<z.ZodString>;
    github: z.ZodOptional<z.ZodString>;
    gitter: z.ZodOptional<z.ZodString>;
    instagram: z.ZodOptional<z.ZodString>;
    linkedin: z.ZodOptional<z.ZodString>;
    medium: z.ZodOptional<z.ZodString>;
    reddit: z.ZodOptional<z.ZodString>;
    slack: z.ZodOptional<z.ZodString>;
    telegram: z.ZodOptional<z.ZodString>;
    twitter: z.ZodOptional<z.ZodString>;
    youtube: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, {
    blog?: string | undefined;
    chat?: string | undefined;
    discord?: string | undefined;
    facebook?: string | undefined;
    forum?: string | undefined;
    github?: string | undefined;
    gitter?: string | undefined;
    instagram?: string | undefined;
    linkedin?: string | undefined;
    medium?: string | undefined;
    reddit?: string | undefined;
    slack?: string | undefined;
    telegram?: string | undefined;
    twitter?: string | undefined;
    youtube?: string | undefined;
}, {
    blog?: string | undefined;
    chat?: string | undefined;
    discord?: string | undefined;
    facebook?: string | undefined;
    forum?: string | undefined;
    github?: string | undefined;
    gitter?: string | undefined;
    instagram?: string | undefined;
    linkedin?: string | undefined;
    medium?: string | undefined;
    reddit?: string | undefined;
    slack?: string | undefined;
    telegram?: string | undefined;
    twitter?: string | undefined;
    youtube?: string | undefined;
}>;
export declare const TokenDeprecationSchema: z.ZodObject<{
    new_address: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, {
    new_address?: string | undefined;
}, {
    new_address?: string | undefined;
}>;
export declare const TokenExtensionsSchema: z.ZodObject<{
    color: z.ZodOptional<z.ZodString>;
    isChefCurated: z.ZodOptional<z.ZodBoolean>;
    isVerified: z.ZodOptional<z.ZodBoolean>;
    shadowColor: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, {
    color?: string | undefined;
    isChefCurated?: boolean | undefined;
    isVerified?: boolean | undefined;
    shadowColor?: string | undefined;
}, {
    color?: string | undefined;
    isChefCurated?: boolean | undefined;
    isVerified?: boolean | undefined;
    shadowColor?: string | undefined;
}>;
export declare type TokenExtensionsType = z.infer<typeof TokenExtensionsSchema>;
/**
 * @exports TokenSchema
 *  @summary token schema that is used to parse the JSON files.
 */
export declare const TokenSchema: z.ZodObject<{
    address: z.ZodString;
    chainId: z.ZodOptional<z.ZodNumber>;
    decimals: z.ZodNumber;
    deprecation: z.ZodOptional<z.ZodObject<{
        new_address: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, {
        new_address?: string | undefined;
    }, {
        new_address?: string | undefined;
    }>>;
    extensions: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        isChefCurated: z.ZodOptional<z.ZodBoolean>;
        isVerified: z.ZodOptional<z.ZodBoolean>;
        shadowColor: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, {
        color?: string | undefined;
        isChefCurated?: boolean | undefined;
        isVerified?: boolean | undefined;
        shadowColor?: string | undefined;
    }, {
        color?: string | undefined;
        isChefCurated?: boolean | undefined;
        isVerified?: boolean | undefined;
        shadowColor?: string | undefined;
    }>>;
    name: z.ZodString;
    social: z.ZodOptional<z.ZodObject<{
        blog: z.ZodOptional<z.ZodString>;
        chat: z.ZodOptional<z.ZodString>;
        discord: z.ZodOptional<z.ZodString>;
        facebook: z.ZodOptional<z.ZodString>;
        forum: z.ZodOptional<z.ZodString>;
        github: z.ZodOptional<z.ZodString>;
        gitter: z.ZodOptional<z.ZodString>;
        instagram: z.ZodOptional<z.ZodString>;
        linkedin: z.ZodOptional<z.ZodString>;
        medium: z.ZodOptional<z.ZodString>;
        reddit: z.ZodOptional<z.ZodString>;
        slack: z.ZodOptional<z.ZodString>;
        telegram: z.ZodOptional<z.ZodString>;
        twitter: z.ZodOptional<z.ZodString>;
        youtube: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, {
        blog?: string | undefined;
        chat?: string | undefined;
        discord?: string | undefined;
        facebook?: string | undefined;
        forum?: string | undefined;
        github?: string | undefined;
        gitter?: string | undefined;
        instagram?: string | undefined;
        linkedin?: string | undefined;
        medium?: string | undefined;
        reddit?: string | undefined;
        slack?: string | undefined;
        telegram?: string | undefined;
        twitter?: string | undefined;
        youtube?: string | undefined;
    }, {
        blog?: string | undefined;
        chat?: string | undefined;
        discord?: string | undefined;
        facebook?: string | undefined;
        forum?: string | undefined;
        github?: string | undefined;
        gitter?: string | undefined;
        instagram?: string | undefined;
        linkedin?: string | undefined;
        medium?: string | undefined;
        reddit?: string | undefined;
        slack?: string | undefined;
        telegram?: string | undefined;
        twitter?: string | undefined;
        youtube?: string | undefined;
    }>>;
    symbol: z.ZodString;
    website: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, {
    deprecation?: {
        new_address?: string | undefined;
    } | undefined;
    social?: {
        blog?: string | undefined;
        chat?: string | undefined;
        discord?: string | undefined;
        facebook?: string | undefined;
        forum?: string | undefined;
        github?: string | undefined;
        gitter?: string | undefined;
        instagram?: string | undefined;
        linkedin?: string | undefined;
        medium?: string | undefined;
        reddit?: string | undefined;
        slack?: string | undefined;
        telegram?: string | undefined;
        twitter?: string | undefined;
        youtube?: string | undefined;
    } | undefined;
    website?: string | undefined;
    chainId?: number | undefined;
    extensions?: {
        color?: string | undefined;
        isChefCurated?: boolean | undefined;
        isVerified?: boolean | undefined;
        shadowColor?: string | undefined;
    } | undefined;
    symbol: string;
    address: string;
    decimals: number;
    name: string;
}, {
    deprecation?: {
        new_address?: string | undefined;
    } | undefined;
    social?: {
        blog?: string | undefined;
        chat?: string | undefined;
        discord?: string | undefined;
        facebook?: string | undefined;
        forum?: string | undefined;
        github?: string | undefined;
        gitter?: string | undefined;
        instagram?: string | undefined;
        linkedin?: string | undefined;
        medium?: string | undefined;
        reddit?: string | undefined;
        slack?: string | undefined;
        telegram?: string | undefined;
        twitter?: string | undefined;
        youtube?: string | undefined;
    } | undefined;
    website?: string | undefined;
    chainId?: number | undefined;
    extensions?: {
        color?: string | undefined;
        isChefCurated?: boolean | undefined;
        isVerified?: boolean | undefined;
        shadowColor?: string | undefined;
    } | undefined;
    symbol: string;
    address: string;
    decimals: number;
    name: string;
}>;
/**
 * @exports RawContractMapTokenSchema
 * @summary token data that is loaded from the JSON files.
 */
export declare const RawContractMapTokenSchema: z.ZodObject<{
    address: z.ZodString;
    decimals: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    name: z.ZodString;
    symbol: z.ZodString;
}, "passthrough", z.ZodTypeAny, {
    symbol: string;
    address: string;
    decimals: string | number;
    name: string;
}, {
    symbol: string;
    address: string;
    decimals: string | number;
    name: string;
}>;
/**
 *  @exports RawEthereumListsTokenSchema
 *  @summary token data that is loaded from the JSON files.
 *  These are generally Optional fields
 */
export declare const RawEthereumListsTokenSchema: z.ZodObject<{
    address: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    deprecation: z.ZodOptional<z.ZodObject<{
        new_address: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, {
        new_address?: string | undefined;
    }, {
        new_address?: string | undefined;
    }>>;
    name: z.ZodOptional<z.ZodString>;
    social: z.ZodOptional<z.ZodObject<{
        blog: z.ZodOptional<z.ZodString>;
        chat: z.ZodOptional<z.ZodString>;
        discord: z.ZodOptional<z.ZodString>;
        facebook: z.ZodOptional<z.ZodString>;
        forum: z.ZodOptional<z.ZodString>;
        github: z.ZodOptional<z.ZodString>;
        gitter: z.ZodOptional<z.ZodString>;
        instagram: z.ZodOptional<z.ZodString>;
        linkedin: z.ZodOptional<z.ZodString>;
        medium: z.ZodOptional<z.ZodString>;
        reddit: z.ZodOptional<z.ZodString>;
        slack: z.ZodOptional<z.ZodString>;
        telegram: z.ZodOptional<z.ZodString>;
        twitter: z.ZodOptional<z.ZodString>;
        youtube: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, {
        blog?: string | undefined;
        chat?: string | undefined;
        discord?: string | undefined;
        facebook?: string | undefined;
        forum?: string | undefined;
        github?: string | undefined;
        gitter?: string | undefined;
        instagram?: string | undefined;
        linkedin?: string | undefined;
        medium?: string | undefined;
        reddit?: string | undefined;
        slack?: string | undefined;
        telegram?: string | undefined;
        twitter?: string | undefined;
        youtube?: string | undefined;
    }, {
        blog?: string | undefined;
        chat?: string | undefined;
        discord?: string | undefined;
        facebook?: string | undefined;
        forum?: string | undefined;
        github?: string | undefined;
        gitter?: string | undefined;
        instagram?: string | undefined;
        linkedin?: string | undefined;
        medium?: string | undefined;
        reddit?: string | undefined;
        slack?: string | undefined;
        telegram?: string | undefined;
        twitter?: string | undefined;
        youtube?: string | undefined;
    }>>;
    symbol: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, {
    symbol?: string | undefined;
    address?: string | undefined;
    decimals?: string | number | undefined;
    name?: string | undefined;
    deprecation?: {
        new_address?: string | undefined;
    } | undefined;
    social?: {
        blog?: string | undefined;
        chat?: string | undefined;
        discord?: string | undefined;
        facebook?: string | undefined;
        forum?: string | undefined;
        github?: string | undefined;
        gitter?: string | undefined;
        instagram?: string | undefined;
        linkedin?: string | undefined;
        medium?: string | undefined;
        reddit?: string | undefined;
        slack?: string | undefined;
        telegram?: string | undefined;
        twitter?: string | undefined;
        youtube?: string | undefined;
    } | undefined;
    website?: string | undefined;
}, {
    symbol?: string | undefined;
    address?: string | undefined;
    decimals?: string | number | undefined;
    name?: string | undefined;
    deprecation?: {
        new_address?: string | undefined;
    } | undefined;
    social?: {
        blog?: string | undefined;
        chat?: string | undefined;
        discord?: string | undefined;
        facebook?: string | undefined;
        forum?: string | undefined;
        github?: string | undefined;
        gitter?: string | undefined;
        instagram?: string | undefined;
        linkedin?: string | undefined;
        medium?: string | undefined;
        reddit?: string | undefined;
        slack?: string | undefined;
        telegram?: string | undefined;
        twitter?: string | undefined;
        youtube?: string | undefined;
    } | undefined;
    website?: string | undefined;
}>;
/**
 * @export z.infer extract the TypeScript type of the exported schemas
 */
export declare type RawContractMapToken = z.infer<typeof RawContractMapTokenSchema>;
export declare type RawEthereumListsToken = z.infer<typeof RawEthereumListsTokenSchema>;
export declare type Token = z.infer<typeof TokenSchema>;
export declare type TokenSocialMetadata = z.infer<typeof SocialSchema>;
