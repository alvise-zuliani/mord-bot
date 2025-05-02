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

        function _fletcherRoll() {
            const roll = Dice.rollD6();

            function _declare(finding) {
                return `You find ${finding}.`;
            }

            switch(true) {
                case (roll >= 1  && roll <= 2): {
                    return _declare(`${Dice.rollD3(true)} short bows`);
                }
                case (roll === 3): {
                    return _declare(`${Dice.rollD3(true)} bows`);
                }
                case (roll === 4): {
                    return _declare(`${Dice.rollD3(true)} long bows`);
                }
                case (roll === 5): {
                    return _declare('a quiver of hunting arrows');
                }
                case (roll === 6): {
                    return _declare(`${Dice.rollD3(true)} crossbows`);
                }
            }
        }

        function _gunsmithRoll() {
            const roll = Dice.rollD6();

            function _declare(finding) {
                return `You find ${finding}.`;
            }

            switch(true) {
                case (roll === 1): {
                    return _declare(`a blunderbuss`);
                }
                case (roll === 2): {
                    return _declare(`a brace of pistols`);
                }
                case (roll === 3): {
                    return _declare(`a brace of duelling pistols`);
                }
                case (roll === 4): {
                    return _declare(`${Dice.rollD3(true)} handguns`);
                }
                case (roll === 5): {
                    return _declare(`${Dice.rollD3(true)} flasks of superior blackpowder`);
                }
                case (roll === 6): {
                    return _declare(`a hochland long rifle`);
                }
            }
        }

        function _armourerRoll() {
            const roll = Dice.rollD6();

            function _declare(finding) {
                return `You find ${finding}.`;
            }

            switch(true) {
                case (roll >= 1 && roll <= 2): {
                    return _declare(`${Dice.rollD3(true)} shields or bucklers (choose which)`);
                }
                case (roll === 3): {
                    return _declare(`${Dice.rollD3(true)} helmets`);
                }
                case (roll === 4): {
                    return _declare(`${Dice.rollD3(true)} suits of light armor`);
                }
                case (roll === 5): {
                    return _declare(`${Dice.rollD3(true)} suits of heavy armor`);
                }
                case (roll === 6): {
                    return _declare('a suit of Ithilmar armor');
                }
            }
        }

        function _jewelsmithRoll() {
            const roll = Dice.rollD6();

            function _declare(finding) {
                return `You find ${finding}.`;
            }

            switch(true) {
                case (roll >= 1 && roll <= 2): {
                    return _declare(`quartz stones worth ${TextDecoration.rolled((Dice.rollD6() * 10).toString())}`);
                }
                case (roll >= 3 && roll <= 4): {
                    return _declare('amethyst worth 20 gc');
                }
                case (roll === 5): {
                    return _declare('necklace worth 50 gc');
                }
                case (roll === 6): {
                    return _declare(`a ruby worth ${TextDecoration.rolled((Dice.rollD6() * 10).toString())}`);
                }
            }
        }

        function _merchantsHouseRoll() {
            const roll = Dice.rollXD6(2, false);
            
            function _declare(finding) {
                return `You find ${finding}.`;
            }

            const doubles = roll[0] === roll[1];

            if (doubles) {
                return _declare('the symbol of the Order of Freetraders. A Hero in possession of this gains the Haggle skill.');
            } else {
                return _declare(`${TextDecoration.rolled((Dice.roll2D6 * 5).toString())}`);
            }
        }

        function  _hiddenTreasureRoll() {
            function _declare(finding) {
                return `You find ${finding}.`;
            }

            const roll = Dice.rollD6();

            const finding = [`${TextDecoration.rolled((Dice.rollXD6(5) * 5).toString())} gc`];

            if (roll >= 4) findings.push(`${Dice.rollD3(true)} piece(s) of wyrdstone`);
            if (roll >= 5) findings.push(`a holy relic`);
            if (roll >= 5) findings.push(`a suit of heavy armour`);
            if (roll >= 4) findings.push(`${Dice.rollD3(true)} gem(s) worth 10 gc each`);
            if (roll >= 5) findings.push(`an elven cloak`);
            if (roll >= 5) findings.push(`a holy tome`);
            if (roll >= 5) findings.push(`a magical artefact`);

            
            return _declare(finding.join(', '));
        }

        function _dwarfSmithyRoll() {
            const roll = Dice.rollD6();

            function _declare(finding) {
                return `You find ${finding}.`;
            }

            switch(true) {
                case (roll === 1): {
                    return _declare(`${Dice.rollD3(true)} double-handed axes`);
                }
                case (roll === 2): {
                    return _declare(`${Dice.rollD3(true)} suits of heavy armor`);
                }
                case (roll === 3): {
                    return _declare('a gromril axe');
                }
                case (roll === 4): {
                    return _declare('a gromril hammer');
                }
                case (roll === 5): {
                    return _declare('a double handed gromril axe');
                }
                case (roll === 6): {
                    return _declare('a gromril armour');
                }
            }
        }

        function _slaughteredWarbandsRoll(){
            function _declare(finding) {
                return `You find ${finding}.`;
            }
            
            const roll = Dice.rollD6();

            const finding = [`${TextDecoration.rolled((Dice.rollXD6(3) * 5).toString())} gc`, `${Dice.rollD6(true)} daggers`];
            
            if (roll >= 4) finding.push(`${rollD3(true)} suit(s) of light armour`);
            if (roll >= 5) finding.push(`1 suit of heavy armour`);
            if (roll >= 4) finding.push(`a Mordheim map`);
            if (roll >= 5) finding.push(`${rollD3(true)} halberd(s)`);
            if (roll >= 3) finding.push(`${rollD3(true)} sword(s)`);
            if (roll >= 2) finding.push(`${rollD3(true)} shield(s)`);
            if (roll >= 4) finding.push(`${rollD3(true)} bow(s)`);
            if (roll >= 2) finding.push(`${rollD3(true)} helmet(s)`);
            
            return _declare(finding.join(', '));
        }

        function _noblesVillaRoll() {
            const roll = Dice.rollD6();

            function _declare(finding) {
                return `You find ${finding}.`;
            }

            switch(true) {
                case (roll >= 1 && roll <= 2): {
                    return _declare(`${TextDecoration.rolled((Dice.rollD6 * 10).toString())} double-handed axes`);
                }
                case (roll >= 3 && roll <= 4): {
                    return _declare(`${Dice.rollD6(true)} vials of crimson shade`);
                }
                case (roll >= 5 && roll <= 6): {
                    return _declare('a hidden magical artefact carefully concealed in a hidden cellar or behind a secret door.');
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
                1: { name: 'Tavern', description: `${TextDecoration.fluff('The ruin of a tavern is recognisable by its sign still hanging on the wall. The upper part of the building is ruined, but the cellars are cut into rock and are still full of barrels. There are broken flagons and tankards everywhere.')}\n\nYou could easily sell the barrels for a good price. Unfortunately your men are also interested in the contents! The warband\'s leader must take a Leadership test. If he passes, the warband gains ${Dice.rollXD6(4, true, true)} gc worth of wines and ales which can be sold immediately.\n\nIf he fails, the men drink most of the alcohol despite their leader's threats and curses. You have ${Dice.rollD6(true)} gc worth of alcohol left when the warband reaches their encampment.\n\nUndead, Witch Hunter and Sisters of Sigmar warbands automatically pass this test, as they are not tempted by such worldly things as alcohol.`, matched: _triple(1) },
                2: { name: 'Smithy', description: `${TextDecoration.fluff('The furnace and toppled anvil make it obvious what work was done here. Most of the iron and the tools have been looted long ago. Coal and slag litter the floor but there may still be weapons to be found among the debris.')}\n\n${_smithyRoll()}`, matched: _triple(2) },
                3: { name: 'Prisoners', description: `${TextDecoration.fluff('A muffled sound comes from one of the buildings. Inside you find a group of finely dressed people who have been locked in a cellar. Perhaps they are prisoners taken by cultists, ready to be sacrificed during Geheimnisnacht.')}\n\nPossessed warbands can sacrifice the victims (undoubtedly finishing the job of the captors). They gain ${Dice.rollD3(true)} Experience which is distributed amongst the Heroes of the warband.\n\nUndead warbands can callously kill the prisoners and gain ${Dice.rollD3(true)} Zombies at no cost.\n\nSkaven can sell the prisoners into slavery for ${Dice.rollXD6(3, true, true)} gc.\n\nOther warbands can escort the prisoners out of the city. For their trouble, they are rewarded with ${Dice.roll2D6(true)} gc. In addition, one of the prisoners decides he wishes to join the warband. If you can afford to equip the new recruit with weapons and armour, you may add a new Henchman to any of your human Henchman groups (with the same stats as the rest of the group, even if they have already accumulated experience).`, matched: _triple(3) },
                4: { name: 'Fletcher', description: `${TextDecoration.fluff('This hovel was once the workshop of a fletcher - a maker of bows and arrows. There are bundles of yew staves and willow rods everywhere.')}\n\n${_fletcherRoll()}`, matched: _triple(4) },
                5: { name: 'Market Hall', description: `${TextDecoration.fluff('The market hall was raised up on pillars, with the timbered corn exchange above the open market place. The upper storey has been badly damaged, but the covered market still offers a good deal of shelter. The remains of the last market day are still lying around on the cobbles. Most of this is broken pottery and iron pots.')}\n\nYou find several items worth ${Dice.roll2D6(true)} in total`, matched: _triple(5) },
                6: { name: 'Returning a Favour', description: `${TextDecoration.fluff('As you are returning to your encampment, you meet one of your old acquaintances. He has come to repay an old favour or debt.\n\nYou gain the services of any one Hired Sword (choose from those available to your warband) for the duration of the next battle, free of charge. After the battle he will depart, or you may continue to pay for his upkeep as normal.')}`, matched: _triple(6) },
            },
            fourOfAKind: {
                1: { name: 'Gunsmith', description: `${TextDecoration.fluff('You find the workshop of a Dwarf gunsmith. Its doors have been broken down and the rooms raided, but some of the iron strongboxes have survived intact.')}\n\n${_gunsmithRoll()}`, matched: _fourOfAKind(1) },
                2: { name: 'Shrine', description: `${TextDecoration.fluff('Your warband stumbles across a ruined shrine, which is so badly damaged that it is difficult to tell which god was once worshipped within its walls. A few images remain on the painted plaster walls but they have been defaced by heretics. Fragments of smashed statues lie among the ruins. Some items appear to be covered in gold leaf, most of which has been torn off.')}\n\nYour warband may strip the shrine and gain ${Dice.rollXD6(3, true, true)} gc worth of loot.\n\nSisters of Sigmar or Witch Hunter warbands may save some of the shrine\'s holy relics. They will gain ${Dice.rollXD6(3, true, true)} gc from their patrons, and a blessing from the gods. One of their weapons (chosen by the player) will now be blessed and will always wound any Undead or Possessed model on a to wound roll of 2+.`, matched: _fourOfAKind(2) },
                3: { name: 'Townhouse', description: `${TextDecoration.fluff('This three-storey house was once part of a tenement block overlooking a narrow alleyway. The street is now in ruins, but this house remains largely intact. Exploring it you find that the garret leans over so far that you can step out of the window into the attic of the house opposite.')}\n\nYour warband finds ${Dice.rollXD6(3, true, true)} gc worth of loot.`, matched: _fourOfAKind(3) },
                4: { name: 'Armourer', description: `${TextDecoration.fluff('A breastplate hanging from a pole drew your attention to this place, obviously too high up to be easily looted. The workshop is ruined and the forge has been smashed. Rooting about in the soot, you find various half-finished items of armour.')}\n\n${_armourerRoll()}`, matched: _fourOfAKind(4) },
                5: { name: 'Graveyard', description: `${TextDecoration.fluff('You find an old graveyard, crammed with sepulchres that are overgrown with ivy. The monuments to the dead are grotesque and decorated with sculpted gargoyles. The ironwork has been ripped from some of the tombs, and stones have toppled off. It looks as if some of the crypts have already been broken into by tomb robbers.')}\n\nAny warband apart from Witch Hunters and Sisters of Sigmar may loot the crypts and graves and gains ${TextDecoration.rolled((Dice.rollD6() * 10).toString())} gc worth of loot.\n\nIf you loot the graveyard, the next time you play against Sisters of Sigmar or Witch Hunters, the entire enemy warband will hate all the models in your warband. Make a note of this on your warband roster sheet.\n\nWitch Hunters and Sisters of Sigmar may seal the graves. They will be rewarded for their piety by ${Dice.rollD6(true)} Experience points distributed amongst the Heroes of the warband.`, matched: _fourOfAKind(5) },
                6: { name: 'Catacombs', description: `${TextDecoration.fluff('You find an entrance to the catacombs and tunnels below Mordheim.')} You can use the new tunnels you found in the next battle you play. Position up to three fighters (not Rat Ogres or the Possessed) anywhere on the battlefield at ground level. They are set up at the end of the player\'s first turn and cannot be placed within 8" of any enemy models.\nThis represents the warriors making their way through the tunnels, infiltrating enemy lines and emerging suddenly from below ground.`, matched: _fourOfAKind(6) },
            },
            fiveOfAKind: {
                1: { name: 'Moneylender\'s House', description: `${TextDecoration.fluff('A grand mansion, that is strongly built from stone, has survived the cataclysm remarkably well. A carved coat of arms adorns the lintel above the doorway although it has been defaced by raiders and the symbols are now unrecognisable. The door itself, has been smashed open with axes and hangs open on its hinges.')}\n\nInside, hidden amongst the debris, you find ${TextDecoration.rolled((Dice.rollD6 * 10).toString())} gc to add to your treasury.`, matched: _fiveOfAKind(1) },
                2: { name: 'Alchemist\'s Laboratory', description: `${TextDecoration.fluff('A narrow stairway leads down into a crypt-like dwelling which was once an alchemist\'s workshop. The sign still hangs from one hinge above the entrance. It looks as if this was a very old building which has remained in use for centuries although it did not survive the comet\'s destruction too well. The stone floor has strange symbols on it and there are charts and astrological symbols painted onto the walls.')}\n\nIn the ruins you find loot worth ${Dice.rollXD6(3, true, true)} gc and a battered old notebook. One of your Heroes may study the Alchemist\'s notebook, and the extra wisdom he gains will enable him to choose from Academic skills whenever he gains a new skill in addition to those skills normally available to him.`, matched: _fiveOfAKind(2) },
                3: { name: 'Jewelsmith', description: `${TextDecoration.fluff('The houses in the jewellers\' quarter have all been well and truly looted long ago. Even the rubble has been picked over many times for fragments of gold and gems. But still, some small but valuable items may have been overlooked.')}\n\n${_jewelsmithRoll()}\n\nIf your warband does not sell the gems, one of your Heroes may keep them and displays them proudly. He will gain +1 to the rolls for locating rare items as merchants flock to such an obviously wealthy warrior.`, matched: _fiveOfAKind(3) },
                4: { name: 'Merchant\'s House', description: `${TextDecoration.fluff('The merchant\'s house stands by the waterfront. It has a vaulted stone undercroft which is still stacked with barrels and bales of cloth. The foodstuffs have been looted or eaten long ago and huge rats infest the rotting bales. Up the stairs are the dwelling quarters, solidly built of timber, although badly damaged you think you can still get up to them but you\'ll need to tread with care!')}\n\n${_merchantsHouseRoll()}`, matched: _fiveOfAKind(4) },
                5: { name: 'Shattered Building', description: `${TextDecoration.fluff('The comet destroyed this building almost completely, making it unsafe for all but the most daring to explore. But places such as this are the best for searching for wyrdstone shards.')}\n\nYou find ${Dice.rollD3(true)} shards of wyrdstone amongst the ruins. In addition take a Leadership test against the warband leader\'s Leadership value. If passed a wardog that was guarding the building joins the warband.`, matched: _fiveOfAKind(5) },
                6: { name: 'Entrance to the Catacombs', description: `${TextDecoration.fluff('You find a well-hidden entrance to the dark catacombs which extend for miles beneath the city of Mordheim. Although the entrance looks foreboding the tunnels will take hours off your searches of the city.')}\n\nYou can use these tunnels to explore Mordheim more efficiently. From now on, you may re-roll one dice when you roll on the Exploration chart. Make a note of this in your warband\'s roster sheet. Second and subsequent catacomb entrances you find do not grant you any additional re-rolls, although you may find further re-rolls from other sources.`, matched: _fiveOfAKind(6) },
            },
            sixOfAKind: {
                1: { name: 'The Pit', description: `${TextDecoration.fluff('You have come within sight of the Pit, the huge crater created by the comet. A black cloud still rises from it but you can see glowing wyrdstone everywhere. This is the domain of the Shadow Lord, the lord of the Possessed, and no-one is welcome here - even his own followers!')}\n\nIf you wish, you can send one of your Heroes to search for any wyrdstone hidden here. Roll a D6. On a roll of 1 the Hero is devoured by the guardians of the Pit and never seen again. On a roll of 2 or more he returns with D6+1 shards of wyrdstone.`, matched: _sixOfAKind(1) }, //TODO implement
                2: { name: 'Hidden Treasure', description: `${TextDecoration.fluff('In the depths of Mordheim, you come across a hidden chest, bearing the coat-of-arms of one of the noble families of the town.')}\n\n${_hiddenTreasureRoll()}`, matched: _sixOfAKind(2) },
                3: { name: 'Dwarf Smithy', description: `${TextDecoration.fluff('You find a solidly built stone workshop. A runic inscription indicates that this may have been a Dwarf smithy.')}\n\n${_dwarfSmithyRoll()}`, matched: _sixOfAKind(3) },
                4: { name: 'Slaughtered Warband', description: `${TextDecoration.fluff('You find the remains of an entire warband. Broken bodies lay scattered among the ruins, torn apart by some monstrous creature. You see a huge shape, which looks like an immense Possessed creature, shambling away.')}\n\n${_slaughteredWarbandsRoll()}`, matched: _sixOfAKind(4) },
                5: { name: 'Fighting Arena', description: `${TextDecoration.fluff('During better times, Mordheim was famous for its duellists and pit fighters. You have found one of the areas used to train these warriors. The place is filled with training equipment and practice weapons.')}\n\nYou find a training manual, which you can either sell for 100 gc or let one of your Heroes read. The extra knowledge your Hero gleans from reading the manual entitles him to choose from Combat skills whenever he gains a new skill, and his WS may now be increased by an extra point above his normal racial maximum (for example, a Human who has the book would now have a maximum Weapon Skill of 7).`, matched: _sixOfAKind(5) },
                6: { name: 'Noble\'s Villa', description: `${TextDecoration.fluff('You find a fine house which is partially ruined. It has been thoroughly ransacked and all the furniture has been stripped of its fine fabrics. Shards of broken pottery of the finest quality are scattered over the floor.')}\n\n${_noblesVillaRoll()}`, matched: _sixOfAKind(6) },
            }
            };
        }

        function _earn() {

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