const { 
  MessageEmbed, 
  MessageSelectMenu, 
  MessageActionRow 
} = require("discord.js");

module.exports = {
  id: "plans",
  run: async (client, interaction) => {
    const emb = new MessageEmbed()
      .setTitle('Plans')
      .setDescription('Choose which plan do you want to know more about')
      .setColor('GREEN');
    
    const row = new MessageActionRow()
			.addComponents(
        new MessageSelectMenu()
          .setCustomId('[plans]')
          .setPlaceholder('Click to view plans')
          .addOptions([
						{
							label: 'Basic',
							description: 'RAM - 4GB | CPU - 2cores | DISK - 10GB',
              emoji: "⚪",
							value: 'b',
						},
						{
							label: 'Intermediate',
							description: 'RAM - 6GB | CPU - 3cores | DISK - 15GB',
              emoji: "🔵",
							value: 'm',
						},
            {
							label: 'Advanced',
							description: 'RAM - 8GB | CPU - 4cores | DISK - 20GB',
              emoji: "🟣",
							value: 'a',
						},
            {
							label: 'Ultimate',
							description: 'RAM - 10GB | CPU - 5cores | DISK - 25GB',
              emoji: "🟠",
							value: 'u',
						},
            {
							label: 'Extreme',
							description: 'RAM - 12GB | CPU - 6cores | DISK - 30GB',
              emoji: "🔴",
							value: 'e',
						},
            {
							label: 'CUSTOM',
							description: 'A custom config',
              emoji: "⚫",
							value: 'c',
						},
					]),
      );
    interaction.reply({ embeds:[emb], components:[row], ephemeral: true })
  }
}