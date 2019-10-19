export class ConvertedCsv {
  public columnNames: string[] = [];
  public values: string[][] = [];
  public title?: string;

  public get csv(): string {
    let output = this.columnNames.join(',');
    output += '\r\n';
    output += this.values.map(x => x.join(',')).join('\r\n');

    return output;
  }
}
