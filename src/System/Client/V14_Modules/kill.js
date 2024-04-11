const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kill")
		.setDescription("Admin internal command."),
	subdata: {
		cooldown: 3,
	},
	async execute(interaction) {
        if (
			interaction.user.id == "170639211182030850" ||
			interaction.user.id == "463516784578789376" ||
			interaction.user.id == "206090047462703104" ||
            interaction.user.id == "1154775391597240391"
		) {
			interaction.reply({
				content: `Exiting!`,
			});
			await process.exit()
		
		}
	},
};
