export declare type SvgToken = {
    color: string;
    name?: string;
    symbol: string;
};
export default function parseSVGIconTokenFiles(): Promise<SvgToken[]>;
