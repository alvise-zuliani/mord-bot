export class Dice {
    /**
     * Roll a die with the given number of sides.
     * @param {number} sides - Number of faces on the die.
     * @returns {number} A random integer between 1 and sides.
     */
    static roll(sides) {
      return Math.floor(Math.random() * sides) + 1;
    }
  
    /**
     * Roll a standard 3-sided die (d3).
     * @returns {number} A random integer between 1 and 3.
     */
    static rollD3() {
      return Dice.roll(3);
    }
    
    /**
     * Roll a standard 6-sided die (d6).
     * @returns {number} A random integer between 1 and 6.
     */
    static rollD6() {
      return Dice.roll(6);
    }

    /**
     * Roll two standard 6-sided die (d6) and sum the results.
     * @returns {number} An integer between 2 and 12.
     */
    static roll2D6() {
      return Dice.roll(6) + Dice.roll(6);
    }

    /**
     * Roll an X amount of standard 6-sided die (d6) and sum the results.
     * @returns {number} An integer.
     */
    static rollXD6(x) {
      let rolls = [];
      for (i = 0; i < x; i++){
        rolls.push(Dice.rollD6())
      }
      return rolls.reduce((sum, val) => sum + val, 0);
    }
  
    /**
     * Roll a d66: two d6 dice, one for tens and one for ones, concatenated.
     * E.g. rolling (3, 5) => 35.
     * @returns {number} A number between 11 and 66 (both digits 1-6).
     */
    static rollD66() {
      const tens = Dice.roll(6);
      const ones = Dice.roll(6);
      // Combine tens and ones
      return tens * 10 + ones;
    }
  }
  