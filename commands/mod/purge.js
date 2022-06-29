const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');


module.exports = {
  name: 'purge',
  aliases: ['clear', 'clean'],
  description: 'Clears the type, amount of message',
  UserPerms: ["MANAGE_MESSAGES"],
  BotPerms: ["MANAGE_MESSAGES"],
  run: async (client, message, args, Discord) => {
    if (!args[0]) {
      return message.reply("Please provide a number or type infinity")
    } else if (args[0].toLowerCase() === "infinity") {
      const cloned = await message.channel.clone()
      cloned.setPosition(message.channel.position)
      message.channel.delete()
      cloned.send("Purged the whole channel")
      return
    } else {
      const msgss = await message.channel.messages.fetch({ limit: args[0] })
      const msgs = await msgss.filter(m => !m.pinned)
      
      await message.channel.bulkDelete(msgs)
      message.channel.send(`**Deleted \`${msgs.size}\` messages**`)
    }
  }
}