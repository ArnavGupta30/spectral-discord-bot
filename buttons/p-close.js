const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const discordTranscripts = require("discord-html-transcripts");

module.exports = {
  id: "p:c",
  run: async (client, interaction) => {
    const m = interaction.message.components[0];
    m.components[0].disabled = true;
    await interaction.message.edit({ components: [m] });

    await interaction.deferReply();
    var c = interaction.channel;
    const au = c.name.split('-')[1];
    c.permissionOverwrites.create(au, { VIEW_CHANNEL: false });

    const att = await discordTranscripts.createTranscript(c);

    const btn = new MessageActionRow().setComponents(
      new MessageButton()
        .setLabel("Delete Order")
        .setCustomId("tkt:d")
        .setStyle("DANGER")
    );
    const emb = new MessageEmbed()
      .setTitle("The order was closed!")
      .setDescription(
        `By - <@!${interaction.user.id}>\nPurchase Owner - <@!${au}>`
      )
      .setColor("RED");

    var stuf = {
      content: "Ticket Closed!",
      embeds: [emb],
      components: [btn],
    };
    
    var sc = client.channels.cache.get(client.config.ticket.scripts);
    if (sc) {
      sc.send({
        content: `Ticket of <@!${au}>`,
        files: [att],
      }).then((msg) => {
        link = `https://support.spectral.host/?url=${
          msg.attachments.first().url
        }`;
        const emb = new MessageEmbed()
          .setTitle("Purchase Transcript")
          .setURL(link)
        msg.edit({ embeds: [emb] });
      });
    }

    c = c.setName(`closed-${au}`);

    interaction.followUp(stuf);

    stuf.components = [];
    client.users.cache
      .get(au)
      .send(stuf)
      .catch(() => {
        c.send("I was unable to DM the ticket owner");
      });
  },
};
