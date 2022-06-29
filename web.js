const Topgg = require("@top-gg/sdk");
const express = require("express")
const { 
  MessageEmbed, 
  MessageActionRow, 
  MessageButton 
} = require("discord.js");
const fs = require('fs')
const app = express()
const { request } = require('undici');

async function keepAlive(client) {
  const webhook = new Topgg.Webhook(client.config.vote.sec);
  const g = client.guilds.cache.get(client.config.server)
  app.get('/', async (req, res) => {
    try {
      const { body } = await request(req.query.url);
      res.send( await body.text() )
    } catch (e) {
      res.send(e)
    }
  })
  app.post(
    "/dblwebhook",
    webhook.listener((vote) => {
      const person = client.guilds.cache.get(g.id)
        .members.cache.get(vote.user);
      if (person) {
        person.send(`\`Thanks for voting ${g.name} on top.gg ❤\``).catch(() => {
          return;
        });
        setTimeout(() => {
          const btn = new MessageActionRow().setComponents(
        new MessageButton()
          .setLabel("Click to vote")
          .setStyle("LINK")
          .setURL(`https://top.gg/servers/${g.id}/vote`)
      );
          person.send({
            content: 'Please vote again. its been 12 hours',
            components: [btn]
          })
        }, 43200000)
      }
      const btn = new MessageActionRow().setComponents(
        new MessageButton()
          .setLabel("Click to vote")
          .setStyle("LINK")
          .setURL(`https://top.gg/servers/${g.id}/vote`)
      );
      const emb = new MessageEmbed()
        .setTitle("Thanks for voting :)")
        .setDescription(`<@!${vote.user}>`)
        .setColor("#00ffe5")
        .setURL(`https://top.gg/servers/${g.id}/vote`)
      client.channels.cache
        .get(client.config.vote.channel)
        .send({
          content: `<@!${vote.user}>`,
          embeds: [emb],
          components: [btn],
        })
        .then((m) => m.react("❤"));
    })
  );

	app.listen("8080", () => console.log(`App listening`));
}

module.exports = keepAlive