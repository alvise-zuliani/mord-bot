import 'dotenv/config';
import { Dice } from './components/dice.js';

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'MordBot (https://github.com/alvise-zuliani/mord-bot, 1.0.0)',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // Discord endpoint to overwrite global commands
  const endpoint = `https://discord.com/api/v9/applications/${appId}/commands`;

  try {
    console.log(`Registering commands at ${endpoint}`);

    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bot ${process.env.BOT_TOKEN}`, // Ensure you have a valid bot token
      },
      body: JSON.stringify(commands), // Send the commands as JSON
    });

    const data = await response.json();
    console.log('Commands registered successfully:', data);
  } catch (err) {
    console.error('Error registering global commands:', err);
  }
}


export async function InstallGuildCommands(guildId, appId, commands) {
  // API endpoint to overwrite guild-specific commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint for guild-specific commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
    console.log('Commands registered for guild:', guildId);
  } catch (err) {
    console.error('Error registering guild commands:', err);
  }
}


export function rarityRoll(rarity) {
  return Dice.roll2D6 > rarity ? true : false;
}

export function sum(array) {
  return array.reduce((sum, val) => sum + val, 0)
}

export function findMatches(rolls) {
  let counts = {};

  for (let roll of rolls) {
    counts[roll] = (counts[roll] || 0) + 1;
  }

  let matches = [];
  for (let [number, count] of Object.entries(counts)) {
    if (count > 1) {
      matches.push({ number: parseInt(number), count });
    }
  }

  return matches; // Return an array of match objects with number and count
}


// Simple method that returns a random emoji from list
export function getRandomEmoji() {
  const emojiList = ['😭','😄','😌','🤓','😎','😤','🤖','😶‍🌫️','🌏','📸','💿','👋','🌊','✨'];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
