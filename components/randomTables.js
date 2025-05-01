import { Dice } from "./dice";

export class RandomTables {
  // d66Results.js
  
  /**
   * Returns the injury or outcome description for a given d66 roll.
   * @param {number} roll - The result of a d66 roll (11 through 66).
   * @returns {string} The corresponding outcome description.
   */
  static injuryRoll() {
      const roll = Dice.rollD66();
    
      function _multipleInjuriesRoll() {
        let outcomes = [];
        for (let i = 0; i < Dice.rollD6(); i++) {
          const newRoll = Dice.rollD66();
          const outcome = injuryRoll(newRoll);
          // skip Dead, Captured, Multiple Injuries outcomes to avoid infinite loops
          if (!['Dead', 'Captured', 'Multiple Injuries'].includes(outcome.description)) {
            outcomes.push(outcome);
          }
        }
        return outcomes.join('\n');
      }

      function _armWoundRoll(){
        const roll = Dice.rollD6();
        switch (true) {
            case (roll == 1): {
                return 'Amputated.';
            }
            default: {
                return 'Miss next game.';
            }
        }
      }

      function _madnessRoll(){
        const roll = Dice.rollD6();
        switch (true) {
            case (roll >= 1 && roll <= 3): {
                return 'Stupidity.';
            }
            default: {
                return 'Frenzy.';
            }
        }
      }

      function _smashedLegRoll() {
        const roll = Dice.rollD6();
        switch (true) {
            case (roll == 1): {
                return 'Can\'t run.';
            }
            default: {
                return 'Miss next game.';
            }
        }
      }

      function _deepWoundRoll() {
        return `Miss ${Dice.rollD3()} games.`;
      }

      function _hateRoll() {
        const roll = Dice.rollD6();
        switch (true) {
            case (roll <= 3): {
                return 'Hates individual (enemy leader if it was a henchman).';
            }
            case (roll == 4): {
                return 'Hates leader.';
            }
            case (roll == 5): {
                return 'Hates warband.';
            }
            case (roll == 6): {
                return 'Hates warband type.';
            }
        }
      }

      function _ransomRoll() {
        return Dice.rollD6() * 5;
      }

      switch (true) {
      case (roll >= 11 && roll <= 15):
          return 'Dead.';
      case (roll >= 16 && roll <= 21):
          return `Multiple Injuries. ${_multipleInjuriesRoll()}`;
      case roll === 22:
          return 'Leg Wound. -1 Movement.';
      case roll === 23:
          return `Arm Wound. ${_armWoundRoll()}`;
      case roll === 24:
          return `Madness. ${_madnessRoll()}`;
      case roll === 25:
          return `Smashed Leg. ${_smashedLegRoll()}`;
      case roll === 26:
          return 'Chest Wound. -1 Toughness.';
      case roll >= 31 && roll <= 36:
          switch (roll) {
          case 31:
              return 'Blinded In One Eye. -1 Ballistic Skill. If twice, retire.';
          case 32:
              return 'Old Battle Wound. Roll D6 at start of each battle. 1 = can\'t play.';
          case 33:
              return 'Nervous Condition. -1 Initiative.';
          case 34:
              return 'Hand Injury. -1 Weapon Skill.';
          case 35:
              return `Deep Wound. ${_deepWoundRoll()}`;
          case 36:
              return 'Robbed. Loses all gear.';
          }
          break;
      case (roll >= 41 && roll <= 55):
          return 'Full Recovery.';
      case roll === 56:
          return `Bitter Enmity. ${_hateRoll()}`;
      case roll === 61:
          return `Captured. The warrior regains consciousness and finds himself held captive by the other warband. He may be ransomed at a price set by the captor or exchanged for one of their warband who is being held captive. Captives may be sold to slavers at a price of ${_ransomRoll()} gc. Undead may kill their captive and gain a new Zombie. The Possessed may sacrifice the prisoner. The leader of the warband will gain +1 Experience if they do so. Captives who are exchanged or ransomed retain all their weapons, armour and equipment; if captives are sold, killed or turned to Zombies, their weaponry, etc, is retained by their captors.`;
      case (roll === 62 || roll === 63):
          return 'Hardened. Immune to fear.';
      case roll === 64:
          return 'Horrible Scars. Causes Fear.';
      case roll === 65:
          return 'Sold To The Pits. Click link for details.';
      case roll === 66:
          return 'Survives Against The Odds. +1 XP.';
      default:
          return 'Invalid roll. Must be between 11 and 66 using d66 rules.';
      }
  }
    
  static advanceRoll() {
    const roll = Dice.roll2D6();

    function _strOrAtkRoll() {
        const roll = Dice.rollD6();
        
        switch (true){
            case (roll <= 3): {
                return '+1 Strength.'
            }
            case (roll > 3): {
                return '+1 Attack.'
            }
        }
    }

    function _initOrLdRoll() {
        const roll = Dice.rollD6();
        
        switch (true){
            case (roll <= 3): {
                return '+1 Initiative.'
            }
            case (roll > 3): {
                return '+1 Leadership.'
            }
        }
    }

    function _woundOrToughRoll() {
        const roll = Dice.rollD6();
        
        switch (true){
            case (roll <= 3): {
                return '+1 Wound.'
            }
            case (roll > 3): {
                return '+1 Toughness.'
            }
        }
    }

    switch(true) {
        case (roll >= 2 && roll <= 5): {
            return 'New Skill or random Spell';
        }
        case (roll == 6): {
            return `${_strOrAtkRoll()}`;
        }
        case (roll == 7): {
            return 'Choose either +1 WS or +1 BS';
        }
        case (roll == 8): {
            return `${_initOrLdRoll}`;
        }
        case (roll == 9): {
            return `${_woundOrToughRoll}`;
        }
        case (roll >= 10): {
            return 'New Skill or Random Spell';
        }
    }
  }
}