export class JsonToCsvConversion {
  public columnNames: any[] = [];
  public values: any[] = [];

  constructor(source: any) {
    this.convertJsonToCsv(source);
  }

  private convertJsonToCsv = (json: any) => {
    for (const propertyKey in json) {
      if (json.hasOwnProperty(propertyKey)) {
        const propertyValue = json[propertyKey];

        const existingKeys = this.columnNames.filter(columnName => columnName === propertyKey);
        this.columnNames.push(`${propertyKey}${existingKeys.length > 0 ? `_${existingKeys.length}` : ''}`);
        this.values.push(propertyValue);
      }
    }
  };
}
