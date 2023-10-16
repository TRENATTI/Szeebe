const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName("commands")
		.setDescription(`Command information.`),
	subdata: {
		cooldown: 3,
	},
	async execute(interaction) {
		const data = [];
		const commands = interaction.client.commands;
		data.push();
		data.push("Here's a list of all my commands:");
		data.push(
			"``" +
				commands
					.map((command) => command.data.name)
					.sort()
					.join("``, ``") +
				"``"
		);
		//data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

		//return message.channel.send(data, { split: true })
		var x;
		var y = ``;
		for (x of data) {
			y = y + `\n` + x;
		}
		const embedAA = {
			author: {
				name: interaction.client.user.username,
				icon_url: interaction.client.user.displayAvatarURL({
					format: "png",
					dynamic: true,
				}),
			},
			color: 0x0099ff,
			footer: {
				text: interaction.guild.name,
				icon_url: interaction.guild.iconURL({
					format: "png",
					dynamic: true,
				}),
			},
			description: y,
			timestamp: new Date(),
		};
		await interaction.reply({ embeds: [embedAA] });
	},
};
