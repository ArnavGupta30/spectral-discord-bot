const client = require("../index.js");
const {
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  MessageEmbed,
} = require("discord.js");
const db = require("quick.db");
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const fetch = require("node-fetch");

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    const sid = interaction.customId.toString().split(":");
    const id = interaction.customId.toString();
    if (sid[0] == "se") {
      if (!interaction.member.permissions.has(["ADMINISTRATOR"])) {
        return interaction.reply({
          content: `Only mods can do this.`,
          ephemeral: true,
        });
      }
      interaction.deferUpdate();
      interaction.user.createDM().then((ch) => {
        ch.send("Please type out the reply");
      });
      const filter = (u) => u.author.id == interaction.user.id;
      var reply = "";
      interaction.user.createDM(true).then((u) => {
        u.awaitMessages({ filter, max: 1, time: 120000, errors: ["time"] })
          .then((collected) => {
            reply = collected.first().content;
            if (sid[1] == "acc") {
              const msg = interaction.message;
              var emb = new MessageEmbed(msg.embeds[0])
                .setColor("GREEN")
                .addField(`Reply from ${interaction.user.tag} -`, reply);
              msg.edit({ embeds: [emb], components: [] });
              msg.reactions.removeAll();
            } else if (sid[1] == "den") {
              const msg = interaction.message;
              var emb = new MessageEmbed(msg.embeds[0])
                .setColor("RED")
                .setFields({
                  name: `Reply from ${interaction.user.tag} -`,
                  value: reply,
                });
              msg.edit({ embeds: [emb], components: [] });
              msg.reactions.removeAll();
            }
          })
          .catch(() => {
            interaction.user.send("TIMEOUT");
          });
      });
    } else if (sid[0] == "hi") {
      var input = db.get(`hi:${sid[1]}:${interaction.user.id}`);
      if (input == true && !interaction.member.permissions.has("ADMINISTRATOR")) {
        const emb = new MessageEmbed()
          .setTitle("Ayo!")
          .setDescription(
            `Looks like you already have said hi to him! We blocked your hi because please dont spam ping him!!`
          )
          .setColor(`#FF0000`);
        interaction.reply({ embeds: [emb], ephemeral: true });
      } else {
        const hook = new Webhook(client.config.join.webhook);
        hook.setUsername(interaction.user.username);
        hook.setAvatar(interaction.user.avatarURL());
        const embed = new MessageBuilder()
          .setText(`<@!${sid[1]}>`)
          .setTitle(`Hello!`)
          .setImage(`https://i.imgur.com/VpJUjCi.gif`)
          .setColor(`#00ffff`);
        hook.send(embed);
        interaction.deferUpdate();
        db.set(`hi:${sid[1]}:${interaction.user.id}`, true);
      }
    } else if (sid[0] == "buy") {
      const plan = sid[1]
      const price = sid[2]
      const info = sid[3]
      const everyoneRole = interaction.guild.roles.cache.find(
        (r) => r.name == "@everyone"
      );
      const ce = interaction.guild.channels.cache.find(
        (ch) => ch.name == `buy-${interaction.user.id}`
      );
      if (ce) {
        return interaction.reply({
          content: `Please close your existing order (<#${ce.id}>)`,
          ephemeral: true,
        });
      }
      interaction.guild.channels
        .create(`buy-${interaction.user.id}`, {
          topic: `Purchase of <@!${interaction.user.id}>`,
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
              `**Intrested Plan -** ${plan}\n**Price -** ${price}\n**More Info -** ${info}`
            )
            .setColor("BLURPLE");

          const btn = new MessageActionRow().setComponents(
            new MessageButton()
              .setLabel("Close Purchase")
              .setCustomId("p:c")
              .setStyle("DANGER")
          );

          c.send({
            content: `<@!908554250945183744> | <@${interaction.user.id}>`,
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
  if (interaction.isSelectMenu()) {
    if (interaction.customId === '[plans]') {
      const rps = {
        "b": {
          name: "Basic",
          price: "5.00$"
        },
        "m": {
          name: "Intermediate",
          price: "9.00$"
        },
        "a": {
          name: "Advanced",
          price: "13.00$"
        },
        "u": {
          name: "Ultimate",
          price: "17.00$"
        },
        "e": {
          name: "Extreme",
          price: "20.00$"
        },
        "c": {
          name: "Custom",
          price: "Depends on order"
        }
      }
      const option = interaction.values[0]
      const plan = rps[option]
      var c = interaction.message.components
      c[0].components[0].options.forEach(e => e.default = false)
      c[0].components[0].options.find(o => o.value == option).default = true
      const desc = c[0].components[0].options.find(o => o.value == option).description

      c[1] = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel('Buy Plan')
          .setCustomId(`buy:${plan.name}:${plan.price}:${desc}`)
          .setStyle('PRIMARY')
      )

      const emb = new MessageEmbed()
        .setTitle(`Plan ${plan.name}`)
        .setDescription(`**Price** \`:\` __${plan.price}__\n\`\`\`${desc}\`\`\``)
        .addField(`Super Startup`, `Included feature which descreases your server startup times super low. (Lowest in the market)`)
        .setColor('AQUA')
      await interaction.update({
        embeds: [emb],
        components: c
      });
    }
  }
});
