function messages(client) {
    client.on('message', message => {
        //if (message.guildid == 465248301504266241) return
        if (message.author.bot) return
        if (message.content.toLowerCase() == 'hi') {
           //message.channel.send('hello there <@' + message.author.id + '>')
        }
        if (message.content.toLowerCase() == 'hello there') {
           message.channel.send('General Kenobi.')
        }
        if (message.content.toLowerCase() == 'general kenobi') {
           message.channel.send('You are a bold one.')
        }
        if (message.content.toLowerCase() == 'boing') {
           message.channel.send('boing')
        }
        if (message.content.toLowerCase() == 'frog') {
           message.channel.send('boing ribbit boing')
        }
        if (message.content.toLowerCase().indexOf('birthday') != -1) {
           message.channel.send('Happy Birthday!!!')
        }
        if (message.content.toLowerCase() == 'cat') {
           message.channel.send("https://cdn.discordapp.com/attachments/539548593321672734/880195504997294170/E9b2IiAXsAM004K.png")
        }
        
        // conch

        if (message.content.toLowerCase() == 'no.') {
        message.channel.send({
            files: ['https://github.com/Scrippy/conch.rbx/raw/main/Audio/no.mp3']
            })
        }
        if (message.content.toLowerCase() == 'nothing.') {
        message.channel.send({
            files: ['https://github.com/Scrippy/conch.rbx/raw/main/Audio/nothing.mp3']
            })
        }
        if (message.content.toLowerCase() == 'try asking again.') {
        message.channel.send({
            files: ['https://github.com/Scrippy/conch.rbx/raw/main/Audio/tryaskingagain.mp3']
            })
        }
        if (message.content.toLowerCase() == 'i dont think so.'|| message.content.toLowerCase() == 'i don\'t think so.') {
        message.channel.send({
            files: ['https://github.com/Scrippy/conch.rbx/raw/main/Audio/idontthinkso.mp3']
            })
        }
        if (message.content.toLowerCase() == 'maybe some day.') {
        message.channel.send({
            files: ['https://github.com/Scrippy/conch.rbx/raw/main/Audio/maybesomeday.mp3']
            })
        }
        if (message.content.toLowerCase() == 'yes.') {
        message.channel.send({
            files: ['https://github.com/Scrippy/conch.rbx/raw/main/Audio/yes.mp3']
            })
        }
    });
}

module.exports = messages;