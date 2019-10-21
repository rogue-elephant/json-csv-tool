export class ConvertedCsv {
  public columnNames: string[] = [];
  public rows: IRowValue[][] = [];
  public title?: string;

  public get csv(): string {
    let output = this.columnNames.join(',') + '\r\n';

    output += this.rows.map(row =>
      this.columnNames.map(columnName => {
        const foundRowValues = row.filter(x =>
          x.columnName === columnName);
        return foundRowValues.length > 0 ? foundRowValues[0].value : '';
      }).join(',')
    ).join('\r\n');

    return output;
  }
}


export interface IRowValue {
  columnName: string,
  value: string
}