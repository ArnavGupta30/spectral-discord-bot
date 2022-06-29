const { MessageEmbed } = require("discord.js");

module.exports = {
  ephemeral: true,
  name: "announce",
  description: "Announce something",
  options: [
    {
      type: "STRING",
      name: "ping",
      description: "Embed's ping",
      required: true
    },
    {
      type: "STRING",
      name: "title",
      description: "Embed's title",
      required: true
    },
    {
      type: "STRING",
      name: "description",
      description: "Embed's description",
      required: true
    },
    {
      type: "STRING",
      name: "thumbnail",
      description: "Embed's thumbnail",
      required: false
    },
    {
      type: "STRING",
      name: "channel",
      description: "Embed's channelid (ID ONLY PLS)",
      required: false
    },
    {
      type: 3,
      name: "color",
      description: "Embed's color",
      choices: [
        {
          name: "WHITE",
          value: "WHITE",
        },
        {
          name: "BLACK",
          value: "BLACK",
        },
        {
          name: "RED",
          value: "RED",
        },
        {
          name: "GREEN",
          value: "GREEN",
        },
        {
          name: "AQUA",
          value: "AQUA",
        },
        {
          name: "BLUE",
          value: "BLUE",
        },
        {
          name: "BLURPLE",
          value: "BLURPLE",
        },
      ],
      required: false,
    }
  ],
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has("MANAGE_GUILD")) {
      return interaction.followUp(
        "You need `[MANAGE_GUILD]` permission to use this command"
      );
    }

    const title = interaction.options.getString("title");
    const ping = interaction.options.getString("ping");
    const color = interaction.options.get("color")
      ? interaction.options.get("color").value
      : "DEFAULT";
    const desc = interaction.options.getString("description");
    const thumb = interaction.options.getString("thumbnail");
    const ch = interaction.guild.channels.cache.get(interaction.options.getString("channel") || '951039435376574465')

    const emb = new MessageEmbed() 
      .setColor(color)
      .setTitle(title)
      .setDescription(desc)
      .setThumbnail(thumb)

    ch.send({content: ping, embeds: [emb]})
    interaction.followUp(`> **Done!** Check <#${ch.id}>`)
  },
};
