const db = require('quick.db')

module.exports = {
  id: "vote:no",
  run: (client, interaction) => {
    const vp = `${interaction.message.id}:${interaction.user.id}:vote`
    var n = null
    if (db.get(vp) == 'no'){
      n = interaction.message.components
      var nb = n[0].components
      const d = nb[1].label
      const x = parseInt(d) - 1
      n[0].components[1].label = x.toString() 
      db.set(vp, 'null')
    } else if (db.get(vp) == 'yes'){
      n = interaction.message.components
      var nb = n[0].components
      const d = nb[0].label
      const x = parseInt(d) - 1
      n[0].components[0].label = x.toString()
      const d2 = nb[1].label
      const x2 = parseInt(d2) + 1
      n[0].components[1].label = x2.toString()
      db.set(vp, 'no')
    } else {
      n = interaction.message.components
      var nb = n[0].components
      const d = nb[1].label
      const x = parseInt(d) + 1
      n[0].components[1].label = x.toString()
      db.set(vp, 'no')
    }
    interaction.update({components: n})
  }
}