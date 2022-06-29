const { 
  MessageEmbed, 
  MessageButton, 
  MessageActionRow 
} = require("discord.js");

module.exports = {
  id: "tkt",
  run: async (client, interaction) => {
    const everyoneRole = interaction.guild.roles.cache.find(
        (r) => r.name == "@everyone"
      );
      const ce = interaction.guild.channels.cache.find(
        (ch) => ch.name == `ticket-${interaction.user.id}`
      );
      if (ce) {
        return interaction.reply({
          content: `Please close your existing ticket (<#${ce.id}>)`,
          ephemeral: true,
        });
      }
      interaction.guild.channels
        .create(`ticket-${interaction.user.id}`, {
          topic: `Ticket for <@!${interaction.user.id}>`,
          parent: client.config.ticket.categ,
        })
        .then((c) => {
          c.permissionOverwrites.create(interaction.user.id, {
            VIEW_CHANNEL: true,
          });
          c.permissionOverwrites.create(client.user.id, { VIEW_CHANNEL: true });
          c.permissionOverwrites.create(client.config.ticket.ping, {
            VIEW_CHANNEL: true,
          });
          c.permissionOverwrites.create(everyoneRole.id, {
            VIEW_CHANNEL: false,
          });

          const emb = new MessageEmbed()
            .setTitle(`Hey! ${interaction.user.tag}`)
            .setDescription(
              "Please do not ping the staff they have already been pinged"
            )
            .setColor("BLURPLE");

          const btn = new MessageActionRow().setComponents(
            new MessageButton()
              .setLabel("Close Ticket")
              .setCustomId("tkt:c")
              .setStyle("DANGER")
          );

          c.send({
            content: `<@&${client.config.ticket.ping}> | <@${interaction.user.id}>`,
            embeds: [emb],
            components: [btn],
          });
          interaction.reply({
            content: `> **Done!**, Check <#${c.id}>`,
            ephemeral: true,
          });
        });
  }
}