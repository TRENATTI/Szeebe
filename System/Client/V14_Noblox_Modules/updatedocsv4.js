require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const { query } = require("express");
const { json } = require("stream/consumers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("updatedocsv4")
		.setDescription(`Admin internal command. Updates docs.`),
	async execute(interaction, noblox, admin) {
    }
}