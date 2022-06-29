const client = require("../index.js");
const db = require('quick.db')

client.on('ready', (msg) => {
    require("../web")(client)
    console.log(`SMH ready as - ${client.user.tag}`)
    const t = db.get('stat')
    if (!t) return
    client.user.setPresence(JSON.parse(t))
})