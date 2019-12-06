import { Table, IRowValue } from './models/table';
import { IJsonToCsvConversionStrategy } from './models/json-to-csv-conversion-strategy';
import { access } from 'fs';

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

      if (row.length > 0) {
        table.rows.push(row);
      }
    });

    return table;
  };

  private iterateKeys = (
    json: any,
    table: Table,
    row: IRowValue[],
    strategy: IJsonToCsvConversionStrategy,
    prefix: string = '',
    nestedLevel: number = 0,
  ) => {
    for (let propertyKey in json) {
      if (json.hasOwnProperty(propertyKey)) {
        let propertyValue = json[propertyKey];
        if (prefix) {
          propertyKey = `${prefix}.${propertyKey}`;
        }
        const fullPropName = nestedLevel > 0 ? `${table.title}.${propertyKey}` : propertyKey;
        if (
          table.title == null &&
          ((strategy.titlePropertyName && strategy.titlePropertyName === propertyKey) ||
            (strategy.titlePropertyName == null && ['name', 'description', 'desc', 'title'].indexOf(propertyKey) !== -1))
        ) {
          table.title = propertyValue;
        }

        // See if this property should be skipped based on the strategy
        if (
          (strategy.blackList &&
            (strategy.blackList.indexOf(fullPropName) > -1 || strategy.blackList.indexOf(`${table.title}.*`) > -1)) ||
          (strategy.whiteList &&
            (strategy.whiteList.indexOf(fullPropName) === -1 &&
              strategy.whiteList.indexOf(`${table.title}.*`) === -1) &&
            strategy.whiteList.filter(x => x.indexOf(`${propertyKey}.`) > -1).length < 1)
        ) {
          continue;
        }

        let linkedTable: any = null;

        if (propertyValue) {
          if (Object.getPrototypeOf(propertyValue) === Object.prototype) {
            this.iterateKeys(propertyValue, table, row, strategy, propertyKey, nestedLevel + 1);
            continue;
          } else if (Array.isArray(propertyValue)) {
            if ((propertyValue as any[]).filter(x => Object.getPrototypeOf(x) === Object.prototype).length > 0) {
              linkedTable = new Table();
              linkedTable.title = propertyKey;
              propertyValue.forEach(x => {
                const oneToManyTableRow: IRowValue[] = [];
                this.iterateKeys(x, linkedTable, oneToManyTableRow, strategy, '', nestedLevel + 1);
                if(oneToManyTableRow.length > 0) {
                  linkedTable.rows.push(oneToManyTableRow);
                }
              });
              propertyValue = linkedTable.rows.length;
            } else {
              propertyValue = propertyValue.join(';');
            }
          }
        }

        if (table.columnNames.indexOf(propertyKey) === -1) {
          table.columnNames.push(propertyKey);
        }

        const rowValues: IRowValue = { columnName: propertyKey, value: propertyValue };
        if (linkedTable) {
          rowValues.linkedTable = linkedTable;
        }

        row.push(rowValues);
      }
    }
  };
}
