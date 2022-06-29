const types = [
    `PLAYING`,
    `STREAMING`,
    'LISTENING',
    'WATCHING',
    'COMPETING'
];

const icons = [
    'online',
    'idle',
    'offline',
    'dnd'
]

const db = require('quick.db')

module.exports = {
    ephemeral: true,
    name: "status",
    description: "OWNER ONLY!",
    options: [ 
        {
            type: 3,
            name: "type",
            description: "Status type",
            choices: types.map(type => {
                return {
                    name: type,
                    value: type
                }
            }),
            required: true
        },
        {
            type: 3,
            name: "name",
            description: "Status Text",
            type: "STRING",
            required: true
        },
        {
            type: 3,
            name: "icon",
            description: "Status Icon",
            choices: icons.map(ic => {
                return {
                    name: ic,
                    value: ic
                }
            }),
            required: false
        },
        {
            type: 3,
            name: "url",
            description: "Status url",
            type: "STRING",
            required: false
        },
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('MANAGE_GUILD')){
          return interaction.followUp('You need `[MANAGE_GUILD]` permission to use this command')
        }
        const type = interaction.options.get('type').value
        const name = interaction.options.getString("name")
        const icon = interaction.options.get('icon') ? interaction.options.get('icon').value : client.user.presence.status
        const url = interaction.options.getString("url")
        const dat = { activities: [{ name, type, url }], status: icon.toLowerCase() }
        await client.user.setPresence(dat)
        db.set('stat', JSON.stringify(dat))
        interaction.followUp(JSON.stringify({type, name, icon, url}))
    }
};
