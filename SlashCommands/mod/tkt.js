const { MessageActionRow, MessageEmbed, MessageButton } = require("discord.js");

module.exports = {
  ephemeral: true,
  name: "ticket-panel",
  description: "MOD ONLY",
  run: async (client, interaction) => {

    if (!interaction.member.permissions.has('MANAGE_GUILD')){
      return interaction.followUp('You need `[MANAGE_GUILD]` permission to use this command')
    }

    interaction.followUp('Done check the channel where u exceuted this')
    ch = interaction.channel

    const emb = new MessageEmbed()
      .setTitle('New Ticket')
      .setDescription('Click on the button below to create a ticket')
      .addField('NOTE!', '**`Spam ticket = Warn (No mercy)`**')
      .setColor('BLURPLE')

    const btn = new MessageActionRow()
      .setComponents(
        new MessageButton() 
          .setLabel('CREATE TICKET')
          .setStyle('PRIMARY')
          .setEmoji('🎫')
          .setCustomId('tkt')
      )
    ch.send({embeds: [emb], components: [btn]})
  },
};
