import { ConvertedCsv } from "./models/converted-csv";
import { IJsonToCsvConversionStrategy } from "./models/json-to-csv-conversion-strategy";

/** Provides functionality for converting JSON to CSV.
 * @export
 * @class JsonCsvConverter
 */
export class JsonCsvConverter {
    public convertJsonToCsv = (jsonInput: any, conversionStrategy?: IJsonToCsvConversionStrategy) => {
        const csvOutput = new ConvertedCsv();
        const strategy: IJsonToCsvConversionStrategy = conversionStrategy || {};

        // Check if the input is an array of JSON
        const jsonArray: any[] = Array.isArray(jsonInput) ? jsonInput : [jsonInput];

        // Loop through each JSON object in the array
        jsonArray.forEach(json => {
            // Loop through the object keys and push each into the csv output object
            // whilst also performing any strategies from the conversionStrategy
            const values = [];
            for (const propertyKey in json) {
                if (json.hasOwnProperty(propertyKey)) {
                    // See if this property should be skipped based on the strategy
                    if (
                        (strategy.blackList && strategy.blackList.indexOf(propertyKey) > -1)
                        ||
                        (strategy.whiteList && strategy.whiteList.indexOf(propertyKey) === -1)
                    ) {
                        continue;
                    }
                    const propertyValue = json[propertyKey];
                    if (csvOutput.columnNames.indexOf(propertyKey) === -1) {
                        csvOutput.columnNames.push(propertyKey);
                    }

                    values.push(propertyValue);
                }
            }
            csvOutput.values.push(values);
        })

        return csvOutput;
    }
}
