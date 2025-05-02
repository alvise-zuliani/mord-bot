import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands, InstallGuildCommands } from './utils.js';
import { TradingPost } from './components/tradingPost.js';

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
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const INJURY_ROLL_COMMAND = {
  name: 'injury',
  description: 'Rolls a random injury outcome using the d66 injury table.',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ADVANCE_ROLL_COMMAND = {
  name: 'advance',
  description: 'Rolls a random advancement using the 2D6 advancement table.',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const EXPLORATION_ROLL_COMMAND = {
  name: 'explore',
  description: 'Rolls a random exploration result.',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};


// Command containing options
const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(getRPSChoices()),
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};

const TRADING_POST_COMMAND = {
  name: 'trade',
  description: 'Find rare items at the Trading Post.',
  options: [
    {
      type: 3,
      name: 'Item',
      description: 'What are you looking for?',
      required: true,
      choices: createCommandChoices(TradingPost.getItemsChoices()),
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};

const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND, INJURY_ROLL_COMMAND, ADVANCE_ROLL_COMMAND, EXPLORATION_ROLL_COMMAND, TRADING_POST_COMMAND];

console.log('Registering commands...');
// InstallGuildCommands(process.env.APP_ID, process.env.GUILD_ID, ALL_COMMANDS); // TEST SERVER FOR DEBUGGING
InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS); // USE IN PRODUCTION
console.log('Commands registered!');

