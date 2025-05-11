import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands, InstallGuildCommands } from './utils.js';
import { t } from './utils/translation.js';
import { ModelType } from './constants.js';

// Get the game choices from game.js
function createCommandChoices(choices) {
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Simple test command
// const TEST_COMMAND = {
//   name: 'test',
//   description: 'Basic command',
//   type: 1,
//   integration_types: [0, 1],
//   contexts: [0, 1, 2],
// };

// const INJURY_ROLL_COMMAND = {
//   name: 'destino',
//   description: 'Rolls a random injury outcome using the d66 injury table.',
//   type: 1,
//   integration_types: [0, 1],
//   contexts: [0, 1, 2],
// };

const ADVANCE_ROLL_COMMAND = {
  name: 'avanzamento',
  description: 'Ottieni un avanzamento casuale.',
  options: [
    {
      type: 3, // STRING
      name: 'model_type',
      description: 'Who is it for?',
      required: true,
      choices: [
        { name: 'eroe', value: ModelType.hero },
        { name: 'soldato', value: ModelType.henchman },
        { name: 'avventuriero', value: ModelType.hiredSword}
      ],
    },
  ],
  type: 1, // CHAT_INPUT
  integration_types: [0, 1],
  contexts: [0, 2],
};


// const EXPLORATION_ROLL_COMMAND = {
//   name: 'esplora',
//   description: 'Rolls a random exploration result.',
//   type: 1,
//   integration_types: [0, 1],
//   contexts: [0, 1, 2],
// };


// // Command containing options
// const CHALLENGE_COMMAND = {
//   name: 'challenge',
//   description: 'Challenge to a match of rock paper scissors',
//   options: [
//     {
//       type: 3,
//       name: 'object',
//       description: 'Pick your object',
//       required: true,
//       choices: createCommandChoices(getRPSChoices()),
//     },
//   ],
//   type: 1,
//   integration_types: [0, 1],
//   contexts: [0, 2],
// };

// const FIND_ITEM_COMMAND = {
//   name: 'trova-oggetto',
//   description: 'Find rare items at the Trading Post.',
//   type: 1,
//   integration_types: [0, 1],
//   contexts: [0, 2],
// };

// const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND, INJURY_ROLL_COMMAND, ADVANCE_ROLL_COMMAND, EXPLORATION_ROLL_COMMAND, FIND_ITEM_COMMAND];
const ALL_COMMANDS = [ADVANCE_ROLL_COMMAND];
console.log('Registering commands...');
//InstallGuildCommands(process.env.APP_ID, process.env.GUILD_ID, ALL_COMMANDS); // TEST SERVER FOR DEBUGGING
InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS); // USE IN PRODUCTION
console.log('Commands registered!');

