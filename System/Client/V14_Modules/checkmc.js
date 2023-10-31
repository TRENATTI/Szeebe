const { MinecraftServerListPing } = require("minecraft-status");

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("checkmc")
		.setDescription("Check MC Server."),
	subdata: {
		usage: "<name>",
		cooldown: 3,
	},
	async execute(interaction) {
		MinecraftServerListPing.ping(4, "scriptoria.apexmc.co", 25681, 3000)
			.then((response) => {
				console.log(response);
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
					description: response.players.online + ` Players online!`,
					timestamp: new Date(),
				};
				console.log(response);
				return interaction.reply({ embeds: [embedAA] });
			})
			.catch((error) => {
				// Error
				console.log(error);
			});
	},
};
