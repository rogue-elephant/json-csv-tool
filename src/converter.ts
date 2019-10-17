import { ConvertedCsv } from "./models/converted-csv";
import { JsonToCsvConversionStrategy } from "./models/json-to-csv-conversion-strategy";

/** Provides functionality for converting JSON to CSV.
 * @export
 * @class JsonCsvConverter
 */
export class JsonCsvConverter {
    public ConvertJsonToCsv = (json: any, conversionStrategy?: JsonToCsvConversionStrategy) => {
        const csvOutput = new ConvertedCsv();
        conversionStrategy = conversionStrategy || {};

        // Loop through the object keys and push each into the csv output object
        // whilst also performing any strategies from the conversionStrategy
        for (const propertyKey in json) {
            if (json.hasOwnProperty(propertyKey)) {
                // See if this property should be skipped based on the strategy
                if (
                    (conversionStrategy.blackList && conversionStrategy.blackList.indexOf(propertyKey) > -1)
                    ||
                    (conversionStrategy.whiteList && conversionStrategy.whiteList.indexOf(propertyKey) === -1)
                ) {
                    continue;
                }
                const propertyValue = json[propertyKey];
                const existingKeys = csvOutput.columnNames.filter(columnName => columnName === propertyKey);

                csvOutput.columnNames.push(
                    `${existingKeys.length > 0 ?
                        (
                            conversionStrategy.duplicateKeyFormatting ? conversionStrategy.duplicateKeyFormatting(propertyKey, existingKeys.length)
                                : `${propertyKey}_${existingKeys.length}`
                        )
                        : propertyKey}`
                );
                csvOutput.values.push(propertyValue);
            }
        }
        return csvOutput;
    }
}
