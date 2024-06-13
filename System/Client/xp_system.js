require("dotenv").config();
let timeData = [];
let messageTimeData = [];
const insane = true;
function vc(client, noblox, currentUser, admin, token, applicationid, prefix) {
	console.log("Testing");
	client.on("messageCreate", (message) => {
		let db = admin.database();
		if (message.author.bot) return;
		let ref = db.ref("points/groups/SB/users");

		//var new_total_points = current_points + addPoints

		//db.ref(
		//    `points/groups/SB/users/${message.user.id}`
		//).set({
		//    xp: Number(new_total_points),
		//});
	});

	client.on("voiceStateUpdate", (oldState, newState) => {
		let db = admin.database();
		let ref = db.ref("points/groups/SB/users");

		console.log(`voiceStateUpdate: ${oldState} | ${newState}`);
		let oldStateGuild = oldState.guild.id;
		let newStateGuild = newState.guild.id;
		let newStateChannelId = newState.channelId;
		let oldStateChannelId = oldState.channelId;

		console.log(oldStateGuild, newStateGuild);
		console.log(oldStateChannelId, newStateChannelId);
		if (
			oldStateChannelId == null &&
			newStateGuild == "215221157937283075"
		) {
			timeData.push([oldState.member.user.id, Date.now()]);
		}
		if (
			newStateChannelId == null &&
			oldStateGuild == "215221157937283075"
		) {
			timeData.forEach(startCalc);

			function startCalc(item, index, arr) {
				if (arr[index][0] == oldState.member.user.id) {
					let seconds = Date.now() - arr[index][1];
					let minutes = seconds / 60000;
					let flooredMinutes = Math.floor(minutes);
					let toaddXP = flooredMinutes * 60;
					console.log(toaddXP, flooredMinutes, minutes, seconds);
					console.log(oldState.member.user.id);
					const theData = db.ref(
						`points/groups/SB/users/${oldState.member.user.id}`
					);
					theData.once("value", (snapshot) => {
						console.log(snapshot.val());
						if (snapshot.val()) {
							current_xp = Number(snapshot.val().xp);
							console.log(current_xp);
							flagit(
								false,
								current_xp,
								toaddXP,
								flooredMinutes,
								item,
								index,
								arr
							);
							start();
						} else {
							current_xp = 0;
							flag = true;
							flagit(
								true,
								current_xp,
								toaddXP,
								flooredMinutes,
								item,
								index,
								arr
							);
						}
					});
				}
			}
			function flagit(
				flag,
				current_points,
				toaddXP,
				flooredMinutes,
				item,
				index,
				arr
			) {
				var new_total_points = current_points + toaddXP;

				if (flag) {
					db.ref(
						`points/groups/SB/users/${oldState.member.user.id}`
					).set({
						xp: Number(new_total_points),
					});
					timeData.splice(index, 1);
					getInsane(new_total_points, toaddXP, flooredMinutes);
				} else {
					db.ref(
						`points/groups/SB/users/${oldState.member.user.id}`
					).set({
						xp: Number(new_total_points),
					});
					timeData.splice(index, 1);
					getInsane(new_total_points, toaddXP, flooredMinutes);
				}
			}
		}
		if (
			newStateChannelId == null &&
			oldStateGuild == "215221157937283075" &&
			insane == false
		) {
			console.log(false);
		}
		function getInsane(new_total_points, toaddXP, flooredMinutes) {
			let guild = oldState.guild;
			oldState.guild.channels
				.fetch("578402807971971102")
				.then((channel) => {
					const embedAA = {
						author: {
							name: oldState.member.user.username,
							icon_url: oldState.member.user.displayAvatarURL({
								format: "png",
								dynamic: true,
							}),
						},
						color: 15844367,
						footer: {
							text: guild.name,
							icon_url: guild.iconURL({
								format: "png",
								dynamic: true,
							}),
						},
						fields: [
							{
								name: "<:amoraCameHappyday:1242897505201422346> XP",
								value: `${new_total_points}`,
								inline: true,
							},
							{
								name: ":arrow_up: Rank",
								value: "#N/A",
								inline: true,
							},
							{
								name: ":fast_forward: Next Role",
								value: "N/A (%)",
							},
						],
						description: `**${oldState.member.user.username}** has left a voice channel!\n\n<:amoraSenkoHappy:1244481331367247882> User has received **${toaddXP}** for participating for **${flooredMinutes} minute/s**!`,
						timestamp: new Date(),
					};
					channel.send({ embeds: [embedAA] });
				});
		}
	});
}

module.exports = vc;
