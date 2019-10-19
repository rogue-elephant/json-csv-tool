import { ConvertedCsv } from './models/converted-csv';
import { IJsonToCsvConversionStrategy } from './models/json-to-csv-conversion-strategy';
import { isObject } from 'util';

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
      const values: string[] = [];

      this.iterateKeys(json, csvOutput, values, strategy);

      csvOutput.values.push(values);
    });

    return csvOutput;
  };

  private iterateKeys = (json: any, csvOutput: ConvertedCsv, values: string[], strategy: IJsonToCsvConversionStrategy, prefix?: string) => {
    for (const propertyKey in json) {
      if (json.hasOwnProperty(propertyKey)) {
        let propertyValue = json[propertyKey];
        if (csvOutput.title == null &&
          (
            (strategy.titlePropertyName && strategy.titlePropertyName === propertyKey)
            || strategy.titlePropertyName == null && ['name', 'description', 'desc'].indexOf(propertyKey) != -1
          )
        ) {
          csvOutput.title = propertyValue;
        }

        // See if this property should be skipped based on the strategy
        if (
          (prefix == null && (strategy.blackList && strategy.blackList.indexOf(propertyKey) > -1)) ||
          (prefix == null && (strategy.whiteList && strategy.whiteList.indexOf(propertyKey) === -1))
        ) {
          continue;
        }

        if (isObject(propertyValue)) {
          this.iterateKeys(propertyValue, csvOutput, values, strategy, propertyKey);
          continue;
        } else if (Array.isArray(propertyValue)) {
          propertyValue = propertyValue.join(';');
        }
        if (csvOutput.columnNames.indexOf(propertyKey) === -1) {
          csvOutput.columnNames.push(propertyKey);
        }

        values.push(propertyValue);
      }
    }
  }
}
