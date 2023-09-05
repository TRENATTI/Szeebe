require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const http = require("https");
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
		.setName("updatedocs")
		.setDescription(`Admin internal command. Updates docs.`),
	async execute(interaction, noblox, admin) {
		if (
			interaction.user.id == "170639211182030850" ||
			interaction.user.id == "463516784578789376" ||
			interaction.user.id == "206090047462703104"
		) {
			interaction.reply({
				content: `Starting...`,
			});
			isAuthorized();
		} else {
			return interaction
				.reply({
					content: `Sorry ${message.author}, but only the owners can run that command!`,
				})
				.then((message) =>
					message.delete({ timeout: 5000, reason: "delete" })
				);
		}

		async function isAuthorized() {
			var db = admin.database();
			const userdata = [];
			var ref = db
				.ref("szeebe")
				.child("alapha-universe-docs")
				.child("groups");
			ref.once("value", (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					var childKey = childSnapshot.key;
					var childData = childSnapshot.val();
					console.log(childKey, childData);
					userdata.push({ childKey, childData });
				});
				checkRanks(userdata);
			});
		}
		async function checkRanks(userData) {
			console.log(userData);
			for (let i = 0; i < userData.length; i++) {
				setTimeout(async function timer() {
					try {
						const groupInfo = await noblox.getGroup(
							Number(userData[i].childData.groupId)
						);
						console.log(groupInfo);
						//getGroupGithub(groupInfo);
					} catch {
						console.log(
							`Error getting group info for ${userData[i].childKey} [${userData[i].childData.groupId}.`
						);
					}
					async function getGroupGithub(groupInfo) {
						//const file = fs.createWriteStream(
						//	`Docs/Groups/${userData[i].childKey}.json`
						//);
						//-const request = http.get(
						//`https://raw.githubusercontent.com/Alpha-Authority/alapha-universe-docs/main/Docs/Groups/${userData[i].childKey}.txt`,
						//async function (response) {
						const res = await axios.get(
							`https://raw.githubusercontent.com/Alpha-Authority/alapha-universe-docs/main/Docs/Groups/${userData[i].childKey}.md`,
							{ responseEncoding: "latin1" }
						);
						console.log(res);
						var newdatastring = JSON.stringify(res.data);
						console.log(newdatastring);
						var newdatajson = JSON.parse(newdatastring);
						console.log(newdatajson);
						var newdatajsonstring = JSON.stringify(newdatajson);
						//newdatajsonstring.pipe(file);
						const file = fs.writeFileSync(
							`Docs/Groups/${userData[i].childKey}.json`,
							newdatajsonstring,
							"utf8"
						);

						console.log("Pipe", true);
						console.log("Info", true);
						fs.readFile(
							`Docs/Groups/${userData[i].childKey}.json`,
							(error1, data1) => {
								if (error1) {
									return;
								}
								console.log(`${JSON.stringify(data1)}`);
								console.log(`${JSON.stringify(groupInfo)}`);
								console.log(
									`${JSON.stringify(data1)}` ==
										`${JSON.stringify(groupInfo)}`
								);
								const datafile2 = require(`../../../Docs/Groups/${userData[i].childKey}.json`);
								var str = JSON.stringify(datafile2);
								console.log(str);
								var strjso = JSON.parse(str);
								console.log(strjso);
								var strgD = JSON.stringify(groupInfo);
								var stjsogD = JSON.parse(strgD);
								console.log(stjsogD);
								console.log(strjso == strgD);
								axios
									.get(
										`https://raw.githubusercontent.com/Alpha-Authority/alapha-universe-docs/main/Docs/Groups/${userData[i].childKey}.json`,
										{ responseType: "arraybuffer" }
									)
									.then(({ dataz }) => {
										console.log(
											dataz.data.toString("latin1")
										);
										console.log(
											JSON.parse(dataz.toString("latin1"))
										);
									})
									.catch((err) => console.error(err));
							}
						);
					}
				}, i * 7500);
			}
		}
	},
};
