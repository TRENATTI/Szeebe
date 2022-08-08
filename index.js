// By ScriptIntelligence

// Structure Setup

// node_modules
// modules
// settings
// events
// startup
// functions

// // //

const fs = require('fs');
const discord = require('discord.js');

// // //

const clientSystem = './System/Client';

// // //

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

//

<<<<<<< Updated upstream
const client = new discord.Client();
=======
const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
>>>>>>> Stashed changes

//

client.login(token);

//

const clientFiles = fs
<<<<<<< Updated upstream
	.readdirSync(clientSystem)
	.filter(file => file.endsWith('.js'));

for (const file of clientFiles) {
	const clientFile = require(clientSystem + '/' + file);
	clientFile(client);
=======
    .readdirSync(clientSystem)
    .filter(file => file.endsWith('.js'));

for (const file of clientFiles) {
    const clientFile = require(clientSystem + '/' + file);
    clientFile(client);
>>>>>>> Stashed changes
}
