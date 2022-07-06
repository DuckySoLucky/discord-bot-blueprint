const fs = require('fs')
const config = require('../../config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
class CommandHandler {
  constructor(discord) {
    this.discord = discord
    
    const commands = [];
    const _commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));
    
    for (const file of _commandFiles) {
      const command = require(`../commands/${file}`);
      commands.push(command.data.toJSON());
    }
    const rest = new REST({ version: '9' }).setToken(config.discord.token);
    
    rest.put(Routes.applicationGuildCommands(config.discord.clientID, config.discord.serverID), { body: commands }).catch(console.error);
  }
}

module.exports = CommandHandler