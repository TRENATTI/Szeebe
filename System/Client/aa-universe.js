const { EmbedBuilder } = require("discord.js");
require("dotenv").config();
const { stringify } = require("querystring");
async function messages(client, noblox, currentUser, admin) {
	var db = admin.database();
	client.on("messageCreate", async (message) => {
		if (message.author.bot) return;
		if (process.env.DEVELOPER_MODE == "true") return;
		var iter = 0;
		var ref = db.ref("szeebe").child("aa-universe");
		ref.limitToLast(10).on("value", (querySnapshot) => {
			querySnapshot.forEach((querySnapshot2) => {
				console.log(new Date(), '| aa-universe.js | ', querySnapshot2.key, querySnapshot2.val());
				querySnapshot2.forEach((thisObject) => {
					if (message.guild.id == thisObject.val().serverId) {
						if (message.channel.id == thisObject.val().channelId) {
							sendData(querySnapshot, thisObject.val().serverId);
						}
					}
				});
			});
		});
		async function sendData(querySnapshot, theServerId) {
			querySnapshot.forEach((querySnapshot2) => {
				console.log(new Date(), '| aa-universe.js | ', querySnapshot2.key, querySnapshot2.val());
				querySnapshot2.forEach((data) => {
					console.log(new Date(), '| aa-universe.js | ', data.val().serverId);
					var guildId = data.val().serverId.toString();
					console.log(new Date(), '| aa-universe.js | ', guildId);
					sendFLIPPINGDATA(guildId, data, theServerId);
				});
			});
		}
		async function sendFLIPPINGDATA(guildId, data, theServerId) {
			const guild = await client.guilds.fetch(`${data.val().serverId}`);
			if (guild.id != message.guild.id) {
				const channel = await guild.channels.fetch(
					data.val().channelId
				);
				console.log(new Date(), '| aa-universe.js | ', channel.id, `acquired.`);
				const members = await message.guild.members.fetch();
				console.log(new Date(), '| aa-universe.js | ', `members acquired.`);
				const embed = new EmbedBuilder()
					.setColor(16747520)
					.setAuthor({
						name: message.author.username,
						iconURL: message.author.displayAvatarURL({
							format: "png",
							dynamic: true,
						}),
					})
					.setDescription(message.content)
					.setTimestamp()
					.setFooter({
						text:
							`AA Universe | ` +
							message.guild.name +
							` | ` +
							members.size +
							` Server Members`,
						iconURL: message.guild.iconURL({
							format: "png",
							dynamic: true,
						}),
					});
				channel.send({ embeds: [embed] });
				const messages = [];
				const game_ref = db.ref("szeebe").child("aa-universe-messages");
				game_ref
					.orderByKey()
					.limitToLast(10)
					.on("value", (querySnapshot) => {
						querySnapshot.forEach((querySnapshot2) => {
							console.log(new Date(), '| aa-universe.js | ',
								querySnapshot2.key,
								querySnapshot2.val()
							);
							querySnapshot2.forEach((thisObject) => {
								iter = iter + 1;
								console.log(new Date(), '| aa-universe.js | ', `iteration:`, iter);
								const thisObjectNew = [];
								thisObjectNew.push(thisObject.key);
								thisObjectNew.push(thisObject.val());
								console.log(new Date(), '| aa-universe.js | ', thisObjectNew);
								messages.push(thisObjectNew);
								console.log(new Date(), '| aa-universe.js | ', thisObject.key, thisObject.val());
								if (iter == 10) {
									//gamerefit(iter, messages, channel, guild, thisObject, game_ref)
								}
							});
						});
					});
			}
			async function gamerefit(
				iter,
				messages,
				channel,
				guild,
				thisObject,
				game_ref
			) {
				console.log(new Date.now(), '| aa-universe.js | ', `DID`);
				const isReady = db.ref("szeebe/aa-universe-messages-ready");

				// Attach an asynchronous callback to read the data at our posts reference
				isReady.once("value", (snapshot) => {
					console.log(snapshot.val());
					console.log(messages);
					if (snapshot.val()) {
						console.log(
							new Date(),
							iter,
							messages,
							channel,
							guild,
							thisObject,
							game_ref,
							new Date()
						);
						console.log(
							new Date(),
							messages[0][0],
							messages[0][1],
							new Date()
						);
					}
					var messagesVAL1 = `{${messages[0][0]}: ${messages[0][1]}}`;
					messagesVAL1 = stringify(messagesVAL1);

					const messagesJSON_V = JSON.parse(messagesVAL1);
					console.log(new Date(), true, messagesJSON_V, new Date());
					//const finalref = game_ref.ref(`${querySnapshot}/${querySnapshot2}`)
					//finalref.remove()
				});
			}
		}
	});
}

module.exports = messages;
