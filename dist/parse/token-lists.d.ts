import * as z from 'zod';
export declare const TokenListStore: z.ZodObject<{
    tags: z.ZodOptional<z.ZodArray<z.ZodAny>>;
    tokens: z.ZodOptional<z.ZodArray<z.ZodAny>>;
}, "passthrough", z.ZodTypeAny, {
    tags?: any[] | undefined;
    tokens?: any[] | undefined;
}, {
    tags?: any[] | undefined;
    tokens?: any[] | undefined;
}>;
export declare type TokenListStoreType = z.infer<typeof TokenListStore>;
export declare const TokenListStoreRecord: z.ZodRecord<z.ZodObject<{
    tags: z.ZodOptional<z.ZodArray<z.ZodAny>>;
    tokens: z.ZodOptional<z.ZodArray<z.ZodAny>>;
}, "passthrough", z.ZodTypeAny, {
    tags?: any[] | undefined;
    tokens?: any[] | undefined;
}, {
    tags?: any[] | undefined;
    tokens?: any[] | undefined;
}>>;
export declare type TokenListStoreRecordType = z.infer<typeof TokenListStoreRecord>;
/**

TODO

const omitTokenWithTag = (tokens: any[], tag: string) =>
  tokens.filter(({ tags = [] }: TokenListStoreType) => !tags.includes(tag));

const pickTokenWithTag = (tokens: any[], tag: string) =>
  tokens.filter(({ tags = [] }: TokenListStoreType) => tags.includes(tag));

  */
export default function parseTokenLists(): Promise<any>;
