const {Client, Collection} = require("discord.js");
const Nuggies = require("nuggies");

const client = new Client({
	intents: [
		"GUILDS",
		"GUILD_MEMBERS",
		"GUILD_BANS",
		"GUILD_INTEGRATIONS",
		"GUILD_WEBHOOKS",
		"GUILD_INVITES",
		"GUILD_VOICE_STATES",
		"GUILD_PRESENCES",
		"GUILD_MESSAGES",
		"GUILD_MESSAGE_REACTIONS",
		"GUILD_MESSAGE_TYPING",
		"DIRECT_MESSAGES",
		"DIRECT_MESSAGE_REACTIONS",
		"DIRECT_MESSAGE_TYPING",
	], 
    partials: ["CHANNEL"]
});

process.on('unhandledRejection', error => {
	console.log(error)
});

Nuggies.handleInteractions(client)
client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.btns = new Collection();
client.config = require('./config.json')

require('./handler')(client);

module.exports = client

client.login("your bot token here")