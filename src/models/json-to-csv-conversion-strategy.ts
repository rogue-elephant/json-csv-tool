/** Interface for specifying various strategies to apply whilst converting a JSON object to CSV.
 * @export
 * @interface JsonToCsvConversionStrategy
 */
export interface JsonToCsvConversionStrategy {
    /** Specifies a list of property names from the JSON object to output to the CSV.
     * All other property names will be ignored.
     * @type {string[]}
     * @memberof JsonToCsvConversionStrategy
     */
    whiteList?: string[];

    /** Specifies a list of property names from the JSON object to NOT output to the CSV.
     * All other property names will be output.
     * @type {string[]}
     * @memberof JsonToCsvConversionStrategy
     */
    blackList?: string[];
}