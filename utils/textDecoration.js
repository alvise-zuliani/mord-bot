export class TextDecoration {
    /**
   * Returns the injury or outcome description for a given d66 roll.
   * @param {number} roll - The result of a d66 roll (11 through 66).
   * @returns {string} The corresponding outcome description.
  **/

    static fluff(text) {
        return `*${text}*`;
    }

    static rolled(text) {
        return `***${text}***`;
    }
}