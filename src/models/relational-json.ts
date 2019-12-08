/** Object that represents the converted JSON properties and relationships in a tabular form with nested tables.
 * @export
 * @class RelationalJson
 */
export class RelationalJson {
  public columnNames: string[] = [];
  public rows: IRowValue[][] = [];
  public title?: string;
}

export interface IRowValue {
  columnName: string;
  value: string;
  linkedTable?: RelationalJson;
}
