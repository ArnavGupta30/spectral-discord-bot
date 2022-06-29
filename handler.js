const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);

module.exports = async (client) => {
  //Slash Command Hanlder
  const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
  );
  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);
    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    if (file.userPermissions) file.defaultPermission = false;
    arrayOfSlashCommands.push(file);
  });
  client.on("ready", async () => {
      client.guilds.cache.get(client.config.server).commands.set(arrayOfSlashCommands).catch((e) => {
        return;
      });
  });

  //Command Handler
  const commandfiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandfiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = {
        directory,
        ...file,
      };
      client.commands.set(file.name, properties);
    }
    if (file.aliases && Array.isArray(file.aliases)) {
      file.aliases.forEach((alias) => client.aliases.set(alias, file.name));
    }
  });

  //Event Handler
  const eventfiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventfiles.map((value) => require(value)); 

  //Button Handler
  const btnsf = await globPromise(`${process.cwd()}/buttons/*.js`);
  btnsf.map((value) => {
    const file = require(value)
    if (!file?.id) return;
    client.btns.set(file.id, file)
  }); 
  client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      client.btns.get(interaction.customId)?.run(client, interaction)
    }
  })
};
