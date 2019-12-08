/** Object that represents the converted JSON properties and relationships in a tabular form with nested tables.
 * @export
 * @class RelationalJson
 */
export class RelationalJson {
  public columnNames: string[] = [];
  public rows: IRowValue[][] = [];
  public title: string = 'Converted JSON';

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

  public generateCsv(): string {
    const removeUnwantedCharsPfa = (value: string) => this.removeUnwantedChars(value, [...this.newlineChars, ',']);
    return this.generateOutput(
      ',',
      (output: string, table: RelationalJson) =>
        output + `${table.title}\r\n` + table.columnNames.map(x => removeUnwantedCharsPfa(x)).join(',') + '\r\n',
      (rowCol: IRowValue) => removeUnwantedCharsPfa(rowCol.value),
    );
  }

  public generateMarkdown(): string {
    const removeUnwantedCharsPfa = (value: string) => this.removeUnwantedChars(value, this.newlineChars);
    return this.generateOutput(
      '|',
      (output: string, table: RelationalJson) =>
        output +
        `# ${table.title} <a name="${(table.title as string) || ''.split(' ').join('_')}"></a>\r\n` +
        '|' +
        table.columnNames.map(x => '*' + removeUnwantedCharsPfa(x) + '*').join('|') +
        '\r\n' +
        '|' +
        table.columnNames.map(x => '---').join('|') +
        '\r\n',
      (rowCol: IRowValue) => removeUnwantedCharsPfa(rowCol.value),
      (rowCol: IRowValue) =>
        `[${removeUnwantedCharsPfa(rowCol.value)}](#${((rowCol.linkedTable as RelationalJson).title as string)
          .split(' ')
          .join('_')})`,
    );
  }

  public generateOutput(
    columnSeperator: string,
    topLevelCallback?: TopLevelCallbackDelegate,
    rowLevelCallback?: RowLevelCallbackDelegate,
    rowLevelLinkedTableCallback?: RowLevelCallbackDelegate,
    rowSeperator: string = '\r\n',
    rowStartOutput: string = '',
    tableSeperator: string = '\r\n\r\n',
  ): string {
    let output = '';
    output = topLevelCallback ? topLevelCallback(output, this) : output;
    const linkedTables: RelationalJson[] = [];

    output += this.rows
      .map(
        row =>
          rowStartOutput +
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
            .join(columnSeperator),
      )
      .join(rowSeperator) + rowSeperator;
    output += tableSeperator;
    linkedTables.forEach(
      table =>
        (output += `${table.generateOutput(
          columnSeperator,
          topLevelCallback,
          rowLevelCallback,
          rowLevelLinkedTableCallback,
          rowSeperator,
          rowStartOutput,
          tableSeperator,
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
  linkedTable?: RelationalJson;
}

export type TopLevelCallbackDelegate = (output: string, table: RelationalJson) => string;
export type RowLevelCallbackDelegate = (rowCol: IRowValue) => string;
