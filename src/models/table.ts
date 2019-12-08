export class Table {
  public columnNames: string[] = [];
  public rows: IRowValue[][] = [];
  public title?: string;

  protected newlineChars = [
    '\r',
    '\n',
    '\r\n',
    '\n\n',
    '\r\r',
    '\u{000a}',
    '\u{000b}',
    '\u{000c}',
    '\u{000d}',
    '\u{0085}',
    '\u{2028}',
    '\u{2029}',
  ];

  public getCsv(): string {
    const removeUnwantedCharsPfa = (value: string) => this.removeUnwantedChars(value, [...this.newlineChars, ',']);
    return this.generateOutput(
      ',',
      (output: string, table: Table) =>
        output + `${table.title}\r\n` + table.columnNames.map(x => removeUnwantedCharsPfa(x)).join(',') + '\r\n',
      (rowCol: IRowValue) => removeUnwantedCharsPfa(rowCol.value),
    );
  }

  public getMarkdown(): string {
    const removeUnwantedCharsPfa = (value: string) => this.removeUnwantedChars(value, this.newlineChars);
    return this.generateOutput(
      '|',
      (output: string, table: Table) =>
        output +
        `# ${table.title} <a name="${(table.title as string).split(' ').join('_')}"></a>\r\n` +
        '|' +
        table.columnNames.map(x => '*' + removeUnwantedCharsPfa(x) + '*').join('|') +
        '\r\n' +
        '|' +
        table.columnNames.map(x => '---').join('|') +
        '\r\n',
      (rowCol: IRowValue) => removeUnwantedCharsPfa(rowCol.value),
      (rowCol: IRowValue) =>
        `[${removeUnwantedCharsPfa(rowCol.value)}](#${((rowCol.linkedTable as Table).title as string)
          .split(' ')
          .join('_')})`,
    );
  }

  public generateOutput(
    seperator: string,
    topLevelCallback?: any,
    rowLevelCallback?: any,
    rowLevelLinkedTableCallback?: any,
  ): string {
    let output = '';
    output = topLevelCallback ? topLevelCallback(output, this) : output;
    const linkedTables: Table[] = [];

    output += this.rows
      .map(row =>
        this.columnNames
          .map(columnName => {
            const foundRowValues = row.filter(x => x.columnName === columnName);
            if (foundRowValues.length > 0) {
              if (foundRowValues[0].linkedTable != null) {
                linkedTables.push(foundRowValues[0].linkedTable);
                return rowLevelLinkedTableCallback
                  ? rowLevelLinkedTableCallback(foundRowValues[0])
                  : rowLevelCallback
                  ? rowLevelCallback(foundRowValues[0])
                  : foundRowValues[0].value;
              }
              return rowLevelCallback ? rowLevelCallback(foundRowValues[0]) : foundRowValues[0].value;
            } else {
              return '';
            }
          })
          .join(seperator),
      )
      .join('\r\n');
    linkedTables.forEach(
      table =>
        (output += `\r\n\r\n${table.generateOutput(
          seperator,
          topLevelCallback,
          rowLevelCallback,
          rowLevelLinkedTableCallback,
        )}`),
    );

    return output;
  }

  protected removeUnwantedChars = (value: any, unwantedChars: string[], replaceWith: string = '') =>
    value.toString().replace(new RegExp(unwantedChars.join('|'), 'g'), replaceWith);
}

export interface IRowValue {
  columnName: string;
  value: string;
  linkedTable?: Table;
}
