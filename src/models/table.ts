export class Table {
  public columnNames: string[] = [];
  public rows: IRowValue[][] = [];
  public title?: string;

  public get csv(): string {
    let output = '';
    const outputTable = (table: Table) => {
      output += this.columnNames.join(',') + '\r\n';

      output += this.rows
        .map(row =>
          this.columnNames
            .map(columnName => {
              const foundRowValues = row.filter(x => x.columnName === columnName);
              return foundRowValues.length > 0 ? foundRowValues[0].value : '';
            })
            .join(','),
        )
        .join('\r\n');
    };
    outputTable(this);
    this.rows
      .filter(row => row.filter(x => x.linkedTable != null).length > 0)
      .map(row => row.filter(x => x.linkedTable != null).map(x => x.linkedTable))
      .forEach(tableList => {
        tableList.forEach(table => {
          table = table as Table;
          output += `\r\n\r\n${table.title}\r\n${table.csv}`;
        });
      });

    return output;
  }
}

export interface IRowValue {
  columnName: string;
  value: string;
  linkedTable?: Table;
}
