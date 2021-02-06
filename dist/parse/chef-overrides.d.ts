export declare type OverrideToken = {
    color?: string;
    isCurated?: boolean;
    name?: string;
    symbol?: string;
    shadowColor?: string;
};
declare type OverrideFile = {
    [address: string]: OverrideToken;
};
export default function parseOverrideFile(): Promise<OverrideFile>;
export {};
