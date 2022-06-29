const {
	Client,
	Message,
	MessageEmbed
} = require('discord.js');

module.exports = {
	name: 's2',
  UserPerms: ["MANAGE_GUILD"],
	run: async (client, message, args, Discord) => {
    if (args.length == 0){
      return message.reply(`__Format : __\`${client.config.prefix}s2 emoji new_name\``)
    }
		if (true){
      const emoji = args[0]
      const emojiId = emoji.match(/([0-9]+)/)[0];
    if (!emojiId) return message.reply('Emoji ID not found');

    message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emojiId}.png`, args[1])
      .then((newEmoji) => {
        message.react(newEmoji);
      })
      .catch((err) => {
        console.error(err);
        message.react('👎');
      })
    }
	}
}