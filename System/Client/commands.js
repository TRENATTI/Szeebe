const fs = require('fs')
const Discord = require('discord.js')

//

const moduleSystem = './System/Client/Modules'

//

const moduleFiles = fs.readdirSync(moduleSystem).filter(file => file.endsWith('.js'));

//

function commands(client) {
    client.commands = new Discord.Collection()
    for (const file of moduleFiles) {
	    const commandFile = require('./Modules/' + file);
	    client.commands.set(commandFile.name, commandFile)
    }
    client.on('message', message => {
        if (message.author.bot) return
        const args = message.content.slice(process.env.PREFIX.length).split(' ');
        const commandName = args.shift().toLowerCase()
        const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;
        if (command.guildOnly && message.channel.type === 'dm') {
    	    return message.reply('I can\'t execute that command inside DMs!');
        } // SEE LINE 55 (message.channel.type.dm)
    
    
        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;
    
            if (command.usage) {
    			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    		}
    
    		return message.channel.send(reply);
    	}
    
        try {
            command.execute(message, args, client);
        } catch {
            message.reply('Unavailable command!');
            console.log('Failed!');
        }
    });
}

module.exports = commands;