import { Dice } from "./dice.js";
import { findMatches, sum } from "../utils.js";
import { TextDecoration } from "../utils/textDecoration.js";

export class RandomTables {

  /**
   * Returns the injury or outcome description for a given d66 roll.
   * @param {number} roll - The result of a d66 roll (11 through 66).
   * @returns {string} The corresponding outcome description.
  **/
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
          return 'Sold To The Pits. The warrior wakes up in the infamous fighting pits of Cutthroat\'s Haven and must fight against a Pit Fighter. Roll to see which side charges, and fight the battle as normal. If the warrior loses, roll to see whether he is dead or injured (ie, a D66 roll of 11-35). If he is not dead, he is thrown out of the fighting pits without his armour and weapons and may re-join his warband. If the warrior wins he gains 50 gc, +2 Experience and is free to rejoin his warband with all his weapons and equipment.';
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
            return _strOrAtkRoll();
        }
        case (roll == 7): {
            return 'Choose either +1 WS or +1 BS';
        }
        case (roll == 8): {
            return _initOrLdRoll();
        }
        case (roll == 9): {
            return _woundOrToughRoll();
        }
        case (roll >= 10): {
            return 'New Skill or Random Spell';
        }
    }
  }

  static henchAdvanceRoll() {
    const roll = Dice.roll2D6;

    switch(true) {
        case (roll >= 2 && roll <= 4): {
            return '+1 Initiative.';
        }
        case (roll == 5): {
            return '+1 Strength.';
        }
        case (roll >= 6 && roll <= 7): {
            return 'Choose either +1 WS or +1 BS.';
        }
        case (roll == 8): {
            return '+1 Attack.';
        }
        case (roll == 9): {
            return '+1 Leadership.';
        }
        case (roll >= 10): {
            return 'The lad\'s got talent. One model in the group becomes a Hero. If you already have the maximum number of Heroes, roll again. The new Hero remains the same Henchman type (e.g., a Ghoul stays as a Ghoul) and starts with the same experience the Henchman had, with all his characteristic increases intact. You may choose two skill lists available to Heroes in your warband. These are the skill types your new Hero can choose from when he gains new skills. He can immediately make one roll on the Heroes Advance table. The remaining members of the Henchmen group, if any, roll again for the advance that they have earned, re-rolling any results of 10-12.';
        }
    }
  }

  static explorationRoll(numOfDice) {
    const rolls = Dice.rollXD6(numOfDice, false);

    function _earn() {
        function _explore() {
            function _countMatches(result, numOfMatches) {
                return rolls.filter(roll => roll === result).length  === numOfMatches;
            }

            function _double(result) {
                return _countMatches(result, 2);
            }
            function _triple(result) {
                return _countMatches(result, 2);
            }
            function _fourOfAKind(result) {
                return _countMatches(result, 2);
            }
            function _fiveOfAKind(result) {
                return _countMatches(result, 2);
            }
            function _sixOfAKind(result) {
                return _countMatches(result, 2);
            }

            function _shopRoll(){
                const roll = Dice.rollD6(true);
                const foundLuckyCharm = roll === 1;
                const luckyCharm = foundLuckyCharm ? ' and a Lucky Charm' : '.';

                return `After a thorough search you find loot worth ${roll} gc${luckyCharm}.`;
            }

            function _corpseRoll() {
                const roll = Dice.rollD6();

                function _declare(finding) {
                    return `You find ${finding}.`
                }

                switch(true) {
                    case (roll >= 1 && roll <= 2): {
                        return _declare(`${Dice.rollD6(true)} gc`);
                    }
                    case (roll === 3): {
                        return _declare('a dagger');
                    } 
                    case (roll === 4): {
                        return _declare('an axe');
                    }
                    case (roll === 5): {
                        return _declare('a sword');
                    }
                    case (roll === 6): {
                        return _declare('a suit of light armor');
                    }
                }
            }

            function _overturnedCartRoll() {
                const roll = Dice.rollD6();

                function _declare(finding) {
                    return `You find ${finding}.`;
                }

                switch(true) {
                    case (roll >= 1 && roll <= 2): {
                        return _declare('a Mordheim map');
                    }
                    case (roll >= 3 && roll <= 4): {
                        return _declare(`a purse with ${Dice.roll2D6(true)} gc`);
                    } 
                    case (roll >= 5): {
                        return _declare('a jewelled sword and dagger. These can be sold at the full value of a sword and a dagger, instead of halved');
                    }
                }
            }

            function _smithyRoll() {
                const roll = Dice.rollD6();

                function _declare(finding) {
                    return `You find ${finding}.`;
                }

                switch(true) {
                    case (roll === 1): {
                        return _declare('a sword');
                    }
                    case (roll === 2): {
                        return _declare(`a double-handed weapon`);
                    } 
                    case (roll === 3): {
                        return _declare('a flail');
                    }
                    case (roll === 4): {
                        return _declare(`${Dice.rollD3(true)} halberds`);
                    }
                    case (roll === 5): {
                        return _declare(`a lance`);
                    }
                    case (roll === 6): {
                        return _declare(`${Dice.roll2D6} gc worth of metal`);
                    }
                }
            }

            

            const locations = {
                doubles: {
                  1: { name: 'Well', description: `${TextDecoration.fluff('The public wells, of which there were several in Mordheim, were covered by rooves raised up on pillars and adorned with carvings and fountains. The city was proud of its water system. Unfortunately, like all the other wells, this one is in a parlous state and undoubtedly polluted with wyrdstone.Choose one of your Heroes and roll a D6. If the result is equal to or lower than his Toughness, he finds one shard of wyrdstone at the bottom of the well. If he fails, the Hero swallows tainted water and must miss the next game through sickness.')} \n\n Choose one of your Heroes and roll a D6. If the result is equal to or lower than his Toughness, he finds one shard of wyrdstone at the bottom of the well. If he fails, the Hero swallows tainted water and must miss the next game through sickness.`, matched: _double(1) },
                  2: { name: 'Shop', description: `${TextDecoration.fluff('The Merchants Guild shop has been thoroughly ransacked. Even so, there are still items scattered around the single, long room, mingled in with the rubble. Some are useful, such as cast iron pots and pans and rolls of fine cloth. All manner of smaller items are lying about – the sort of frippery which no longer has a use in a devastated city with few inhabitants.')}\n\n${_shopRoll()}`, matched: _double(2) },
                  3: { name: 'Corpse', description: `${TextDecoration.fluff('You find a still-warm corpse. A chipped dagger sticks out of his back. Surprisingly, his possessions have not been looted.')}\n\n${_corpseRoll()}`, matched: _double(3) },
                  4: { name: 'Straggler', description: `${TextDecoration.fluff('Your warband encounters one of the survivors of Mordheim, who has lost his sanity along with all his worldly possessions.')}\n\nSkaven warbands can sell the straggler to agents of Clan Eshin (who will use the man for food or slavery) and gain ${Dice.roll2D6(true)} gc.\n\nPossessed warbands can sacrifice the unfortunate individual for the glory of the Chaos gods. The leader of the warband will gain +1 Experience. Undead warbands can kill the man and gain a Zombie for no cost.\n\nAny other warband can interrogate the man and gain insight into the city. Next time you roll on the Exploration chart, roll one dice more than is usually allowed, and discard any one dice. (For example, if you have three Heroes, roll four dice and pick any three).`, matched: _double(4) },
                  5: { name: 'Overturned Cart', description: `${TextDecoration.fluff('Stuck in a ruined gateway is an overturned wagon - the covered type that nobles travel in from the city to their estates in the country. Since anyone important fled a long time ago, what is it doing here? The horses have broken their traces, or did someone cut them free?')}\n\n${_overturnedCartRoll()}`, matched: _double(5) },
                  6: { name: 'Ruined Hovels', description: `${TextDecoration.fluff('The street consists of ruined hovels, which are leaning over at alarming angles. Not much worth looting here.')}\n\nYou find loot worth ${Dice.rollD6(true)} gc amidst the ruins`, matched: _double(6) },
                },
                triples: {
                  1: { name: 'Tavern', description: `${TextDecoration.fluff('The ruin of a tavern is recognisable by its sign still hanging on the wall. The upper part of the building is ruined, but the cellars are cut into rock and are still full of barrels. There are broken flagons and tankards everywhere.')}\n\nYou could easily sell the barrels for a good price. Unfortunately your men are also interested in the contents! The warband’s leader must take a Leadership test. If he passes, the warband gains ${Dice.rollXD6(4, true, true)} gc worth of wines and ales which can be sold immediately.\n\nIf he fails, the men drink most of the alcohol despite their leader's threats and curses. You have ${Dice.rollD6(true)} gc worth of alcohol left when the warband reaches their encampment.\n\nUndead, Witch Hunter and Sisters of Sigmar warbands automatically pass this test, as they are not tempted by such worldly things as alcohol.`, matched: _triple(1) },
                  2: { name: 'Smithy', description: `${TextDecoration.fluff('The furnace and toppled anvil make it obvious what work was done here. Most of the iron and the tools have been looted long ago. Coal and slag litter the floor but there may still be weapons to be found among the debris.')}\n\n${_smithyRoll()}`, matched: _triple(2) },
                  3: { name: 'Prisoners', description: `${TextDecoration.fluff('A muffled sound comes from one of the buildings. Inside you find a group of finely dressed people who have been locked in a cellar. Perhaps they are prisoners taken by cultists, ready to be sacrificed during Geheimnisnacht.')}\n\nPossessed warbands can sacrifice the victims (undoubtedly finishing the job of the captors). They gain ${Dice.rollD3(true)} Experience which is distributed amongst the Heroes of the warband.\n\nUndead warbands can callously kill the prisoners and gain ${Dice.rollD3(true)} Zombies at no cost.\n\nSkaven can sell the prisoners into slavery for ${Dice.rollXD6(3, true, true)} gc.\n\nOther warbands can escort the prisoners out of the city. For their trouble, they are rewarded with ${Dice.roll2D6(true)} gc. In addition, one of the prisoners decides he wishes to join the warband. If you can afford to equip the new recruit with weapons and armour, you may add a new Henchman to any of your human Henchman groups (with the same stats as the rest of the group, even if they have already accumulated experience).`, matched: _triple(3) },
                  4: { name: 'Fletcher', description: `${TextDecoration.fluff()}`, matched: _triple(4) },
                  5: { name: 'Market Hall', description: `${TextDecoration.fluff()}`, matched: _triple(5) },
                  6: { name: 'Returning a Favour', description: `${TextDecoration.fluff()}`, matched: _triple(6) },
                },
                fourOfAKind: {
                  1: { name: 'Gunsmith', description: `${TextDecoration.fluff()}`, matched: _fourOfAKind(1) },
                  2: { name: 'Shrine', description: '', matched: _fourOfAKind(2) },
                  3: { name: 'Townhouse', description: '', matched: _fourOfAKind(3) },
                  4: { name: 'Armourer', description: '', matched: _fourOfAKind(4) },
                  5: { name: 'Graveyard', description: '', matched: _fourOfAKind(5) },
                  6: { name: 'Catacombs', description: '', matched: _fourOfAKind(6) },
                },
                fiveOfAKind: {
                  1: { name: 'Moneylender\'s House', description: '', matched: _fiveOfAKind(1) },
                  2: { name: 'Alchemist\'s Laboratory', description: '', matched: _fiveOfAKind(2) },
                  3: { name: 'Jewelsmith', description: '', matched: _fiveOfAKind(3) },
                  4: { name: 'Merchant\'s House', description: '', matched: _fiveOfAKind(4) },
                  5: { name: 'Shattered Building', description: '', matched: _fiveOfAKind(5) },
                  6: { name: 'Entrance to the Catacombs', matched: _fiveOfAKind(6) },
                },
                sixOfAKind: {
                  1: { name: 'The Pit', description: '', matched: _sixOfAKind(1) },
                  2: { name: 'Hidden Treasure', description: '', matched: _sixOfAKind(2) },
                  3: { name: 'Dwarf Smithy', description: '', matched: _sixOfAKind(3) },
                  4: { name: 'Slaughtered Warband', description: '', matched: _sixOfAKind(4) },
                  5: { name: 'Fighting Arena', description: '', matched: _sixOfAKind(5) },
                  6: { name: 'Noble\'s Villa', description: '', matched: _sixOfAKind(6) },
                }
              };
              

            // DOUBLES
            const well = _double(1);
            const shop = _double(2);
            const corpse = _double(3);
            const straggler = _double(4);
            const overturnedCart = _double(5);
            const ruinedHovels = _double(6);

            // TRIPLES
            const tavern = _triple(1);
            const smithy = _triple(2);
            const prisoners = _triple(3);
            const fletcher = _triple(4);
            const marketHall = _triple(5);
            const returningAFavor = _triple(6);

            // FOUR OF A KIND
            const gunsmith = _fourOfAKind(1);
            const shrine = _fourOfAKind(2);
            const townhouse = _fourOfAKind(3);
            const armourer = _fourOfAKind(4);
            const graveyard = _fourOfAKind(5);
            const catacombs = _fourOfAKind(6);

            // FIVE OF A KIND
            const moneylendersHouse = _fiveOfAKind(1);
            const alchemistsLaboratory = _fiveOfAKind(2);
            const jewelsmith = _fiveOfAKind(3);
            const merchantsHouse = _fiveOfAKind(4);
            const shatteredBuilding = _fiveOfAKind(5);
            const entranceToTheCatacombs = _fiveOfAKind(6);

            // SIX OF A KIND
            const thePit = _sixOfAKind(1);
            const hiddenTreasure = _sixOfAKind(2);
            const dwarfsSmithy = _sixOfAKind(3);
            const slaughteredWarband = _sixOfAKind(4);
            const fightingArena = _sixOfAKind(5);
            const noblesVilla =_sixOfAKind(6);

            switch (true) {

                // DOUBLES
                case (well): {
                    return '';
                }
                case (well): {
                    return '';
                }
                case (well): {
                    return '';
                }
                case (well): {
                    return '';
                }
                case (well): {
                    return '';
                }
                case (well): {
                    return '';
                }
            }
        }

        function _declare(quantity){
            return `${quantity} shards found.`;
        }

        const sum = sum(rolls);

        switch(true) {
          case (sum >= 1 && sum <= 5): {
              return _declare(1);
          }
          case (sum >= 6 && sum <= 11): {
              return _declare(2);
          }
          case (sum >= 12 && sum <= 17): {
              return _declare(3);
          }
          case (sum >= 18 && sum <= 24): {
              return _declare(4);
          }
          case (sum >= 25 && sum <= 30): {
              return _declare(5);
          }
          case (sum >= 31 && sum <= 35): {
              return _declare(6);
          }
          case (sum >= 36): {
            return _declare(7);
          }
        }
    }
  }
}