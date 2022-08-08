function messages(client) {
    client.on('message', message => {
        if (!message.author.id == 170639211182030850) return;
        if (message.content == 'snews_icon_embed') {
            const time = new Date()
            const embedAA = {
                    "footer": {
                        "text": message.guild.name,
                        "icon_url":  message.guild.iconURL({ format: "png", dynamic: true })
                    },
                    "image": {
                        "url": "https://i.gyazo.com/da80ec6186f012051895b2398e43c5f0.png"
                    },
                    timestamp: new Date()
            }
            return message.channel.send({ embed: embedAA })
        }
        if (message.content == 'snews_cantbeserious_embed') {
            const time = new Date()
            const embedAA = {
                    "footer": {
                        "text": message.guild.name,
                        "icon_url":  message.guild.iconURL({ format: "png", dynamic: true })
                    },
                    "image": {
                        "url": "https://i.gyazo.com/1f466c27a619b3df66a10ea99b3f4edb.gif"
                    },
                    timestamp: new Date()
            }
            return message.channel.send({ embed: embedAA })
        }
    });
}

module.exports = messages;