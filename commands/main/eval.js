const { MessageEmbed } = require("discord.js");
const owners = ["908554250945183744"];

module.exports = {
	name: "eval",
	run: async (client, message, args) => {
		if (!owners.includes(message.author.id)) {
			return message.channel.send("Limited To The Bot Owner Only!")
		}
		try {
			const code = args.join(" ").slice(6).slice(0, -3);
			if (!code) {
				return message.channel.send("What do you want to evaluate?")
			}

			let evaled = eval(code);

			if (typeof evaled !== "string")
				evaled = require("util").inspect(evaled);

			let embed = new MessageEmbed()
				.setAuthor("Eval", message.author.avatarURL())
				.addField("Input", `\`\`\`js\n${code}\`\`\``)
				.addField("Output", `\`\`\`${evaled}\`\`\``)
				.setColor("GREEN")

			message.channel.send({ embeds: [embed] });
		} catch (err) {
			const code = args.join(" ").slice(6).slice(0, -3);
			let embed = new MessageEmbed()
				.setAuthor("Eval", message.author.avatarURL())
				.addField("Input", `\`\`\`js\n${code}\`\`\``)
				.addField("Error", `\`\`\`${err}\`\`\``)
				.setColor("RED")
			message.channel.send({ embeds: [embed] });
		}
	}
}
