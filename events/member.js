const Canvas = require("canvas");
const { registerFont, createCanvas } = require("canvas");
const fs = require("fs");
registerFont("./fonts/CAL.ttf", { family: "college" });
const { MessageAttachment } = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const client = require("../index");
const db = require("quick.db");

client.on("guildMemberAdd", async (member) => {
  var count = member.guild.members.cache;
  const canvas = Canvas.createCanvas(1772, 633);
  const ctx = canvas.getContext("2d");
  const background = await Canvas.loadImage(`./welcome.png`);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#f2f2f2";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  var textString3 = `${member.user.username}`;
  if (textString3.length >= 14) {
    ctx.font = "bold 100px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString3, 720, canvas.height / 2);
  } else {
    ctx.font = "bold 150px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString3, 720, canvas.height / 2);
  }
  var textString2 = `#${member.user.discriminator}`;
  ctx.font = "bold 40px Genta";
  ctx.fillStyle = "#f2f2f2";
  ctx.fillText(textString2, 730, canvas.height / 2 + 40);
  var textString4 = `Member #${
    count.filter((member) => !member.user.bot).size
  }`;
  ctx.font = "bold 60px Genta";
  ctx.fillStyle = "#f2f2f2";
  ctx.fillText(textString4, 750, canvas.height / 2 + 125);
  var textString4 = `${member.guild.name}`;
  ctx.font = "bold 60px Genta";
  ctx.fillStyle = "#f2f2f2";
  ctx.fillText(textString4, 700, canvas.height / 2 - 150);
  ctx.beginPath();
  ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);

  const attachment = new MessageAttachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );

  const welcome = new MessageEmbed()
    .setColor("#3cff00")
    .setTimestamp()
    .setTitle(`Welcome to ${member.guild.name}!`)
    .setDescription(`Hi <@${member.user.id}>!, ENJOY YOUR STAY HERE!!`)
    .setFooter({
      text: "Welcome!",
      iconURL: member.guild.iconURL({ dynamic: true }),
    })
    .setImage("attachment://welcome-image.png");

  const row = new MessageActionRow().setComponents([
    new MessageButton()
      .setLabel("Wave To Say Hi!")
      .setCustomId(`hi:${member.user.id}`)
      .setStyle("SECONDARY")
      .setEmoji("👋"),
  ]);

  client.channels.cache
    .get(client.config.join.channel)
    .send({ embeds: [welcome], files: [attachment], components: [row] });

  const ids = client.config.join.roles
  ids.forEach((id) => {
    member.roles.add(id);
  });
  member.guild.members.cache.forEach((m) => {
    db.set(`hi:${member.user.id}:${m.user.id}`, false);
  });

	const no = count.filter(member => !member.user.bot).size
  client.channels.cache.get(client.config.count.channel)
    .setName(client.config.count.format.replace(`:no:`,no))
});

client.on('guildMemberRemove', async member => {
	const emb = new MessageEmbed()
		.setTitle(`${member.user.username} Left 😢`)
		.setDescription(`Hope to see them soon`)
		.setColor(`YELLOW`)

	member.guild.channels.cache.get(client.config.leave.channel).send({embeds: [emb]})

	var count = member.guild.members.cache
	const no = count.filter(member => !member.user.bot).size
  client.channels.cache.get(client.config.count.channel)
    .setName(client.config.count.format.replace(`:no:`,no))
})