export interface JsonToCsvConversionStrategy {
    whiteList?: string[];
    blackList?: string[];
    duplicateKeyFormatting?: duplicateKeyFormattingDelegate;
}

export type duplicateKeyFormattingDelegate = (key: string, index: number) => string;