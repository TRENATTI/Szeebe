const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const util = require("util");
const child_process = require("child_process");
const process = require("process");
require("dotenv").config();

const exec = util.promisify(child_process.exec);

async function execSh(command) {
	await exec(command, { windowsHide: true }, (e, stdout, stderr) => {
		console.log(`${stdout}\n`);
	});
}

function reset() {
	execSh("pm2 restart all")
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("reset")
		.setDescription("Admin internal command."),
	subdata: {
		cooldown: 15,
	},
	async execute(interaction) {
		if (
			interaction.user.id == "170639211182030850" ||
			interaction.user.id == "463516784578789376" ||
			interaction.user.id == "206090047462703104"
		) {
			interaction
				.reply({
					content: `Resetting...`,
				})
				.then(reset());
		} else {
			return interaction.reply({
				content: `Sorry ${message.author}, but only the owners can run that command!`,
			});
		}
	},
};
