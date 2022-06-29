/* const fetch = require("node-fetch-commonjs")

module.exports = {
  ephemeral: true,
  name: "subdomain",
  description: "give a subdomain",
  options: [
    {
      type: 3,
      name: "port",
      description: "server port",
      type: "STRING",
      required: true
    },
    {
      type: 3,
      name: "subdomain",
      description: "subdomain on which u want",
      type: "STRING",
      required: true
    }
  ],
  run: async (client, interaction) => {
    const sub = interaction.options.getString("subdomain")
    const port = interaction.options.getString("port")

    const obj = {
      type: "SRV",
      data: {
        service: "_minecraft",
        proto: "_tcp",
        name: sub,
        priority: 0,
        weight: 5,
        port: port,
        target: `${sub}.spectral.host`,
      },
    }


    console.log(await fetch("https://api.cloudflare.com/client/v4/zones/4e2eb32835d500e5980126bc60bff3e7/dns_records", {
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 78574f67bf0278b4f0faccac8fd7716e0d67b"
      },
      method: "POST"
    }))

    const no = {
      type: "A",
      name: sub,
      content: "35.184.255.236",
      ttl: 3600,
      priority: 10,
      proxied: false,
    }

    console.log(await fetch("https://api.cloudflare.com/client/v4/zones/4e2eb32835d500e5980126bc60bff3e7/dns_records", {
      body: JSON.stringify(no),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 78574f67bf0278b4f0faccac8fd7716e0d67b"
      },
      method: "POST"
    }))

  },
}; */