module.exports = {
	name: "server",
	description: "Server info.",
	aliases: ["serverinfo"],
	execute(message, args) {
		return message.channel.send(
			`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
		);
	},
};
