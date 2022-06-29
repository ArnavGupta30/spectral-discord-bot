const { 
  MessageEmbed, 
  MessageButton, 
  MessageActionRow 
} = require("discord.js");

module.exports = {
  ephemeral: true,
  name: "suggest",
  description: "Suggest something.",
  options: [
    {
            type: 3,
            name: "text",
            description: "suggestion's content",
            type: "STRING",
            required: true
        }
  ],
  run: async (client, interaction) => {
    const msg = interaction.options.getString("text")
    const emb = new MessageEmbed()
      .setFooter({text: 'Vote using reactions'})
      .setColor('YELLOW')
      .setTimestamp()
      .setDescription(`\`\`\`${msg}\`\`\``)
      .setAuthor({ 
        name: interaction.user.tag, 
        iconURL: interaction.user.displayAvatarURL(), 
        url: client.config.replurl 
      })
    const btn = new MessageActionRow()
      .setComponents(
        new MessageButton()
          .setLabel('Accept')
          .setCustomId('se:acc')
          .setStyle('SUCCESS'),
        new MessageButton()
          .setLabel('Deny')
          .setCustomId('se:den')
          .setStyle('DANGER'),
      )
    interaction.guild.channels.cache.get(client.config.suggestions).send({
      embeds:[emb],
      components: [btn]
    }).then(msg => {
      msg.react('👍')
      msg.react('👎')
      msg.startThread({name: 'DISCUSS'}).then(t => {
        t.send(`**DISCUSS ABOUT THE SUGGESTION HERE**`)
      })
    })
    interaction.followUp(`> **Done!**, Check <#${client.config.suggestions}>.`)
  },
};
