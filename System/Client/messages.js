// DISABLED AS OF 7/21/2023 5:38 PM CST - SI
// phrases.js REPLACES messages.js
require("dotenv").config();

function messages(client) {
	client.on("messageCreate", (message) => {
		//if (message.guildid == 465248301504266241) return
		if (!message.author.id == 206090047462703104) return;
		if (message.content.toLowerCase().indexOf("vaktovia") != -1) {
			message.delete();
		}
		if (message.content.toLowerCase().indexOf("glory") != -1) {
			message.delete();
		}
		if (message.author.bot) return;
		if (message.content.toLowerCase() == "hi") {
			//message.channel.send('hello there <@' + message.author.id + '>')
		}
		if (message.content.toLowerCase() == "hello there") {
			//message.channel.send('General Kenobi.')
		}
		if (message.content.toLowerCase() == "general kenobi") {
			//message.channel.send('You are a bold one.')
		}
		if (message.content.toLowerCase() == "boing") {
			//message.channel.send('boing')
		}
		if (message.content.toLowerCase() == "frog") {
			//message.channel.send('boing ribbit boing')
		}
		if (message.content.toLowerCase().indexOf("birthday") != -1) {
			//message.channel.send('Happy Birthday!!!')
		}
		if (message.content.toLowerCase() == "cat") {
			//message.channel.send("https://cdn.discordapp.com/attachments/539548593321672734/880195504997294170/E9b2IiAXsAM004K.png")
		}
		if (message.content.toLowerCase().indexOf("sleepy") != -1) {
			//message.channel.send('https://cdn.discordapp.com/attachments/1075266433195450408/1083614846744002600/unknown.png')
		}

		if (message.content.toLowerCase().indexOf("plonky") != -1) {
			//message.channel.send('https://tenor.com/view/plonk-twitch-cat-gif-27494506')
		}
		if (message.content.toLowerCase().indexOf("senor") != -1) {
			//message.channel.send('<:senor:1128760591536885862>')
		}
		if (message.content.toLowerCase().indexOf("plinky") != -1) {
			//message.channel.send('https://tenor.com/view/plink-wide-cat-plink-cat-meow-gif-27396868')
		}
		if (message.content.toLowerCase().indexOf("salutations") != -1) {
			//message.channel.send('https://tenor.com/view/capybara-salutations-my-good-chum-gif-26610666')
		}
		if (
			message.content
				.toLowerCase()
				.indexOf("who up playing with they bug?") != -1
		) {
			//message.channel.send('https://media.discordapp.net/attachments/632070496594165790/1129917052094791702/they_bug.gif')
		}
		// conch

		if (message.content.toLowerCase() == "no.") {
			//message.channel.send({/*  */
			//    files: ['https://github.com/Scrippy/conch.rbx/raw/main/Audio/no.mp3']
			//})
		}
		if (message.content.toLowerCase() == "nothing.") {
			//message.channel.send({
			//    files: ['https://github.com/Scrippy/conch.rbx/raw/main/Audio/nothing.mp3']
			//})
		}
		if (message.content.toLowerCase() == "try asking again.") {
			//message.channel.send({
			//    files: ['https://github.com/Scrippy/conch.rbx/raw/main/Audio/tryaskingagain.mp3']
			//})
		}
		if (
			message.content.toLowerCase() == "i dont think so." ||
			message.content.toLowerCase() == "i don't think so."
		) {
			//message.channel.send({
			//    files: ['https://github.com/Scrippy/conch.rbx/raw/main/Audio/idontthinkso.mp3']
			//})
		}
		if (message.content.toLowerCase() == "maybe some day.") {
			//message.channel.send({
			//    files: ['https://github.com/Scrippy/conch.rbx/raw/main/Audio/maybesomeday.mp3']
			//})
		}
		if (message.content.toLowerCase() == "yes.") {
			//message.channel.send({
			//    files: ['https://github.com/Scrippy/conch.rbx/raw/main/Audio/yes.mp3']
			//})
		}
		if (message.content.toLowerCase() == "silly") {
			//message.channel.send({
			//    files: ['https://github.com/Scrippy/conch.rbx/raw/main/Audio/watermelon.mp4']
			//})
		}
	});
}

module.exports = messages;
