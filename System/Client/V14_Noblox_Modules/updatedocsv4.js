require("dotenv").config();
const fs = require("fs");
const path = require('path');
const axios = require("axios");

const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	Collection
} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const { query } = require("express");
const { json } = require("stream/consumers");

const v4System = "./System/Client/V14_Noblox_Modules/updatedocsv4";
const v4Folders = fs
	.readdirSync(v4System)
	//.filter((file) => file.endsWith(".js"));

module.exports = {
	data: new SlashCommandBuilder()
		.setName("updatedocsv4")
		.setDescription(`Admin internal command. Updates docs.`),
	async execute(interaction, noblox, admin) {
		const client = interaction.client
		client.updatedocsv4_apitypes = new Collection();
		client.updatedocsv4_apisockets = new Collection();
		for (const folder of v4Folders) {
			const apiFolder = folder
			client.updatedocsv4_apitypes.set(apiFolder, apiFolder);
		}

		const apisockets = client.updatedocsv4_apitypes
		if (!apisockets) return;

		var v4FolderData = []
		v4FolderData.push(
			"``" +
				apisockets
					.map((command) => command)
					.sort()
					.join("``, ``") +
				"``"
		);
		var y = ``;
		var x;
		for (x of v4FolderData) {
				console.log(x)
				y = y + `\n` + x;
		}
		interaction.reply(`Response Date.. ${y}`)
    }
}