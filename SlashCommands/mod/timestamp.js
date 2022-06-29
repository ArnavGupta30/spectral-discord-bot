const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ms = require('ms');

module.exports = {
  ephemeral: true,
  name: "timestamp",
  description: "make a timestamp",
  options: [
    {
            type: 3,
            name: "time",
            description: "time",
            type: "STRING",
            required: true
        }
  ],
  run: async (client, interaction) => {
    let timeAdded = interaction.options.getString("time")
    let time = Date.now() + ms(timeAdded)
    time = time.toString().slice(0, -3)
    interaction.followUp(`\`<t:${time}:R>\``)
  },
};
