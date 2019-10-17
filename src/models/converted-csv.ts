export class ConvertedCsv {
    public columnNames: string[] = [];
    public values: string[] = [];
    public toFullArray = () => this.columnNames.concat(this.values);
}