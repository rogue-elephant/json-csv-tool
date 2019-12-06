/** Interface for specifying various strategies to apply whilst converting a JSON object to CSV.
 * @export
 * @interface JsonToCsvConversionStrategy
 */
export interface IJsonToCsvConversionStrategy {
  /** Specifies a list of property names from the JSON object to output to the CSV.
   * All other property names will be ignored.
   * Can use dot notation '.' operator to denote child relationship, e.g. ['cards.id', 'cards.desc', 'people.*']
   * @type {string[]}
   * @memberof IJsonToCsvConversionStrategy
   */
  whiteList?: string[];

  /** Specifies a list of property names from the JSON object to NOT output to the CSV.
   * All other property names will be output.
   * Can use dot notation '.' operator to denote child relationship, e.g. ['cards.id', 'cards.desc', 'people.*']
   * @type {string[]}
   * @memberof IJsonToCsvConversionStrategy
   */
  blackList?: string[];

  /** Specify a Json property that can be used to determine a title for the output.
   * Can be used for a filename when creating a file etc.
   * @type {string}
   * @memberof IJsonToCsvConversionStrategy
   */
  titlePropertyName?: string;
}
