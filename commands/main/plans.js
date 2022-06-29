const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const owners = ["908554250945183744"];

module.exports = {
	name: "plans",
	run: (client, message, args) => {
		if (!owners.includes(message.author.id)) {
			return message.channel.send("Limited To The Bot Owner Only!")
		}
    const emb = new MessageEmbed()
      .setTitle('Explore Plans')
      .setColor('#6600ff')
      .setDescription('Click the button bellow to explore the plans')

    const btn = new MessageActionRow()
      .setComponents(
        new MessageButton()  
          .setLabel('Explore')
          .setCustomId('plans')
          .setStyle('SUCCESS')
      )
    message.channel.send({ embeds: [emb], components: [btn] })
		message.delete()
	}
}
