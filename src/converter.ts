import { Table, IRowValue } from './models/table';
import { IJsonToCsvConversionStrategy } from './models/json-to-csv-conversion-strategy';

/** Provides functionality for converting JSON to CSV.
 * @export
 * @class JsonCsvConverter
 */
export class JsonCsvConverter {
  public convertJsonToCsv = (jsonInput: any, conversionStrategy?: IJsonToCsvConversionStrategy) => {
    const table = new Table();
    const strategy: IJsonToCsvConversionStrategy = conversionStrategy || {};

    // Check if the input is an array of JSON
    const jsonArray: any[] = Array.isArray(jsonInput) ? jsonInput : [jsonInput];

    // Loop through each JSON object in the array
    jsonArray.forEach(json => {
      // Loop through the object keys and push each into the csv output object
      // whilst also performing any strategies from the conversionStrategy
      const row: IRowValue[] = [];

      this.iterateKeys(json, table, row, strategy);

      table.rows.push(row);
    });

    return table;
  };

  private iterateKeys = (
    json: any,
    table: Table,
    row: IRowValue[],
    strategy: IJsonToCsvConversionStrategy,
    prefix?: string,
    nestedLevel: number = 0
  ) => {
    for (let propertyKey in json) {
      if (json.hasOwnProperty(propertyKey)) {
        let propertyValue = json[propertyKey];
        if (prefix) {
          propertyKey = `${prefix}_${propertyKey}`;
        }
        if (
          table.title == null &&
          ((strategy.titlePropertyName && strategy.titlePropertyName === propertyKey) ||
            (strategy.titlePropertyName == null && ['name', 'description', 'desc'].indexOf(propertyKey) !== -1))
        ) {
          table.title = propertyValue;
        }

        // See if this property should be skipped based on the strategy
        if (
          nestedLevel === 0 &&
          (prefix == null && (strategy.blackList && strategy.blackList.indexOf(propertyKey) > -1)) ||
          (prefix == null && (strategy.whiteList && strategy.whiteList.indexOf(propertyKey) === -1))
        ) {
          continue;
        }

        let linkedTable: any = null;

        if(propertyValue) {
          if (Object.getPrototypeOf(propertyValue) === Object.prototype) {
            this.iterateKeys(propertyValue, table, row, strategy, propertyKey, nestedLevel++);
            continue;
          } else if (Array.isArray(propertyValue)) {
            if((propertyValue as any[]).filter(x => Object.getPrototypeOf(x) === Object.prototype).length > 0) {
              linkedTable = new Table();
              linkedTable.title = propertyKey;
              propertyValue.forEach(x => {
                const oneToManyTableRow: IRowValue[] = [];
                this.iterateKeys(x, linkedTable, oneToManyTableRow, strategy, '', nestedLevel++);
                linkedTable.rows.push(oneToManyTableRow);
              });
              propertyValue = linkedTable.rows.length;
            } else
              propertyValue = propertyValue.join(';');
          }
        }
        
        if (table.columnNames.indexOf(propertyKey) === -1) {
          table.columnNames.push(propertyKey);
        }

        row.push({ columnName: propertyKey, value: propertyValue, linkedTable });
      }
    }
  };
}
