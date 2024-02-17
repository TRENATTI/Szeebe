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
	UserSelectMenuBuilder,
	Collection,
	ComponentType
} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const { query } = require("express");
const { json } = require("stream/consumers");
const { application } = require("express");

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
			client.updatedocsv4_apitypes.set(folder);
		}

		const apitypes = client.updatedocsv4_apitypes
		if (apitypes.length == 0) return;

		var v4FolderData = []
		v4FolderData.push(
			"``" +
				apitypes 
					.map((folderName) => folderName)
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
		//interaction.reply(`Response Date.. ${y}`)

		for (const api of apitypes) {
			let apiName = api.slice(0, -1)
			let socketSystem = "./System/Client/V14_Noblox_Modules/updatedocsv4/" + apiName
			//socketSystem.slice(0, -1)
			const socketFolders = fs
				.readdirSync(socketSystem)
				.filter((file) => file.endsWith(".js"));

			for (const socket of socketFolders) {
				const socketFile = require(`./updatedocsv4/${apiName}/${socket}`);
				client.updatedocsv4_apisockets.set(socketFile.name, socketFile);
			}
		}

		const apisockets = client.updatedocsv4_apisockets

		//const socket =
		//	apisockets.get(commandName) ||
		//	apisockets.find(
		//		(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
		//	);

		const mainembed = new EmbedBuilder()
			.setColor(16747520)
			.setTitle(`AUD Update V4`)
			.setAuthor({
				name: interaction.client.user.username,
				iconURL:
					interaction.client.user.displayAvatarURL(
						{
							format: "png",
							dynamic: true,
						}
					),
			})
			.setDescription(
				`What would you like to update?`
			)
			.setTimestamp()
			.setFooter({
				text: interaction.guild.name,
				iconURL: interaction.guild.iconURL({
					format: "png",
					dynamic: true,
				}),
			});

		const select = new StringSelectMenuBuilder()
			.setCustomId('select_response')
			.setPlaceholder('Make a selection!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Groups')
					.setDescription('For handling Group API related sockets.')
					.setValue('groups'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Players')
					.setDescription('For handling Player API related sockets.')
					.setValue('players'),
				new StringSelectMenuOptionBuilder()
					.setLabel('All')
					.setDescription('For handling All API related sockets.')
					.setValue('all'),
			);

		const row = new ActionRowBuilder()
			.addComponents(select);

		const response = await interaction.reply({
			embeds: [mainembed],
			components: [row],
		});

		try {
			//const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });
			const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });

			collector.on('collect', async i => {
				const selection = i.values[0];
				//await i.reply(`${i.user} has selected ${selection}!`);
				if (selection == "groups") {
					const newinteractionembed = EmbedBuilder.from(
						mainembed
					)
						.setDescription(`Groups option selected via Select Menu, updating Groups API data!`);
					const newinteractionmenu = StringSelectMenuBuilder.from(select)
						.setPlaceholder(':3')
						.setDisabled(true);
				
					row.setComponents(newinteractionmenu)
					//await interaction.editReply({ embeds: [newinteractionembed], components: [newinterationrow] });
					//await interaction.editReply({ content: "Confirmed" });
					await interaction.editReply({ embeds: [newinteractionembed], components: [row]});
					for (const api of apitypes) {
						let apiName = api.slice(0, -1)
						let socketSystem = "./System/Client/V14_Noblox_Modules/updatedocsv4/" + apiName
						//socketSystem.slice(0, -1)
						const socketFolders = fs
							.readdirSync(socketSystem)
							.filter((file) => file.endsWith(".js"));
			
						for (const socket of socketFolders) {
							let executorName = socket.slice(0,-3)
							console.log(executorName)
							const executor = apisockets.get(executorName)
							if (!executor) return;
							//if (executor.args) return; // temporary
							console.log(executor.name)
							if (executor.socketType == "groups" && !executor.args){
							try {
								executor.execute(interaction, noblox, admin);
							} catch {
								console.log("Failed!")
							}}
						}
					}
				}
			});
		} catch (e) {
			console.log(e)
			const newinteractionembed = EmbedBuilder.from(
				mainembed
			)
			.setDescription(`Time ran out to select an option!!`);
			await interaction.editReply({ embeds: [newinteractionembed], components: []});
		}

    }
}