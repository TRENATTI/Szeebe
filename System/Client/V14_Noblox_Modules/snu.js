const { EmbedBuilder, SlashCommandBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName("snu")
		.setDescription("Admin internal command  to update embeds")
        .addStringOption(option =>
			option
				.setName('messageid')
				.setDescription('Message ID>')
				.setRequired(true)
		)
		.addStringOption(option =>
			option
				.setName('channelid')
				.setDescription('Channel ID.')
				.setRequired(true)
		)
		.addStringOption(option =>
			option
				.setName('serverid')
				.setDescription('Server ID.')
				.setRequired(true)
		)
		.addStringOption(option =>
			option
				.setName('message')
				.setDescription('Message to add.')
				.setRequired(true)
		)
		.addStringOption(option =>
			option
				.setName('button')
				.setDescription('Button Message to add.')
				.setRequired(false)
		),
	subdata: {
		cooldown: 15,
	},
	async execute(interaction, noblox, admin) {
		var db = admin.database();
		async function updateMsg(interaction) {
			const targetMessage = interaction.options.getString('messageid');
			const targetChannel = interaction.options.getString('channelid');
			const targetServer = interaction.options.getString('serverid');
			const buttonValue = interaction.options.getString('button');
			const messageValue = eval('`' + interaction.options.getString(`message`) + '`')
			
			console.log(targetMessage, targetChannel, targetServer, messageValue, buttonValue)
			const guild = await interaction.client.guilds.fetch(targetServer);
			const channel = await guild.channels.fetch(targetChannel);
			const message = await channel.messages.fetch(targetMessage)

			const embedAA = {
				"author": {
					"name": message.author.username,
					"icon_url": message.author.displayAvatarURL({ format: "png", dynamic: true })
				},
				"footer": {
					"text": message.guild.name,
					"icon_url": message.guild.iconURL({ format: "png", dynamic: true })
				},
				"description": messageValue,
				timestamp: new Date()
        	}

			const snu_button = new ButtonBuilder()
				.setCustomId("button")
				.setLabel(buttonValue || "")
				.setStyle(ButtonStyle.Secondary);
			const snu_actionrowbuilder =
				new ActionRowBuilder().addComponents(
					snu_button
				);

			if (buttonValue == ''){
				message.edit({ embeds: [ embedAA ]} )
			} else {
				message.edit({ embeds: [ embedAA ], components: [ snu_actionrowbuilder ]} )
			}

		}
		if (
			interaction.user.id == "170639211182030850" ||
			interaction.user.id == "463516784578789376" ||
			interaction.user.id == "206090047462703104"
		) {
			interaction
				.reply({
					content: `Updating message...`,
				})
				.then(updateMsg(interaction));
		} else {
			return interaction.reply({
				content: `Sorry ${message.author}, but only the owners can run that command!`,
			});
		}
	},
};