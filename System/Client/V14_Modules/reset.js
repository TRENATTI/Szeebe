const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription(
      "Admin internal command."
    ),
  subdata: {
    cooldown: 3,
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
            .then(msg => interaction.client.destroy())
            .then(() => interaction.client.login(process.env.TOKEN));
    } else {
        return interaction
            .reply({
                content: `Sorry ${message.author}, but only the owners can run that command!`,
            })
       
    }

  },
};
