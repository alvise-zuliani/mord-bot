import { sum } from "../utils.js";
import { TextDecoration } from "../utils/textDecoration.js";

export class Dice {
    /**
     * Roll a die with the given number of sides.
     * @param {number} sides - Number of faces on the die.
     * @returns {number} A random integer between 1 and sides.
     */
    static _roll(sides) {
      return Math.floor(Math.random() * sides) + 1;
    }
  
    /**
     * Roll a standard 3-sided die (d3).
     * @returns {number} A random integer between 1 and 3.
     */
    static rollD3(asString=false) {
      const roll = Dice._roll(3);
      return asString ? TextDecoration.rolled(roll) : roll;
    }
    
    /**
     * Roll a standard 6-sided die (d6).
     * @returns {number} A random integer between 1 and 6.
     */
    static rollD6(asString=false) {
      const roll = Dice._roll(6);
      return asString ? TextDecoration.rolled(roll) : roll;
    }

    /**
     * Roll two standard 6-sided die (d6) and sum the results.
     * @returns {number} An integer between 2 and 12.
     */
    static roll2D6(asString=false) {
      const roll = Dice._roll(6) + Dice._roll(6);
      return asString ? TextDecoration.rolled(roll) : roll;
    }

    /**
     * Roll an X amount of standard 6-sided die (d6) and sum the results.
     * @returns {number} An integer.
     */
    static rollXD6(x, sum=true, asString=false) {
      let rolls = [];
      for (let i = 0; i < x; i++){
        rolls.push(Dice.rollD6());
      }
      if (sum) {
        return asString ? TextDecoration.rolled(sum(rolls)) : sum(rolls);
      } else {
        return rolls;
      }
    }
  
    /**
     * Roll a d66: two d6 dice, one for tens and one for ones, concatenated.
     * E.g. rolling (3, 5) => 35.
     * @returns {number} A number between 11 and 66 (both digits 1-6).
     */
    static rollD66(asString=false) {
      const tens = Dice._roll(6);
      const ones = Dice._roll(6);
      const combinedRoll = tens * 10 + ones;
      return asString ? TextDecoration.rolled(combinedRoll) : combinedRoll;
    }
  }
  