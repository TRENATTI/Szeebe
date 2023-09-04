require("dotenv").config();
const axios = require("axios");
const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
const { query } = require("express");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription(`View the point leaderboard.`)
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription(`Select a user to view on the point leaderboard.`)
        .setRequired(false)
    ),
  subdata: {
    cooldown: 3,
  },
  async execute(interaction, noblox, admin) {
    var db = admin.database();
    //const userdata = [] -- Old Table
    const thisObjectTable = [];
    thisObjectTable.push(`Leaderboard`);
    let ig = 0;
    var ref = db
      .ref("points")
      .child("groups")
      .child("Alpha Authority")
      .child("users");
    ref
      .orderByChild("xp")
      .limitToLast(10)
      .on("value", (querySnapshot) => {
        querySnapshot.forEach((thisObject) => {
          ig = ig + 1;
          console.log(thisObject.key, thisObject.val());
          thisObjectTable.push(`${thisObject.key} - ${thisObject.val().xp}`);
          if (ig == 10) {
            LogthisObjectTable(thisObjectTable);
          }
        });
      });
    async function LogthisObjectTable(userdata) {
      var x;
      var y = ``;
      for (x of userdata) {
        y = y + `\n` + x;
      }
      console.log(y);
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
          icon_url: interaction.guild.iconURL({ format: "png", dynamic: true }),
        },
        description: y,
        timestamp: new Date(),
      };
      return interaction.reply({ embeds: [embedAA] });
    }
  },
};
