module.exports = {
	name: "sn",
	description: "Says news in Embed",
	aliases: ["sn"],
	execute(message, args) {
		stringargs = message.content.slice(process.env.PREFIX.length + 3);
		if (!message.author.id == 170639211182030850) return;
		const embedAA = {
			author: {
				name: message.author.username,
				icon_url: message.author.displayAvatarURL({
					format: "png",
					dynamic: true,
				}),
			},
			footer: {
				text: message.guild.name,
				icon_url: message.guild.iconURL({
					format: "png",
					dynamic: true,
				}),
			},
			description: stringargs,
			image: {
				url: "",
			},
			timestamp: new Date(),
		};
		return message.reply({ embeds: [embedAA] });
	},
};
