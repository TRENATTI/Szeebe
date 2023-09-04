require('dotenv').config();
const axios = require("axios");
const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription(`View a user's group profile.`)
        .addStringOption((option) =>
            option
                .setName("username")
                .setDescription(`View a user's group profile.`)
                .setRequired(true)
        ),
    subdata: {
        usage: "<username>",
        cooldown: 3,
    },
    async execute(interaction, noblox) {
        console.log(
            new Date(),
            `| profile.js | Running /profile. Run by ${interaction.user.tag} (${interaction.user.id}).`
        );
        const interactionStringArg = interaction.options.getString("username");
        console.log(
            new Date(),
            `| profile.js |`, interactionStringArg);
        function progressBar(percentAge) {
            var percentBar;

            if (percentAge === 0) {
                percentBar =
                    ":white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button:";
            } else if (0 <= percentAge && percentAge <= 10) {
                percentBar =
                    ":white_large_square: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button:";
            } else if (10 <= percentAge && percentAge <= 20) {
                percentBar =
                    ":white_large_square: :white_large_square: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button:";
            } else if (20 <= percentAge && percentAge <= 30) {
                percentBar =
                    ":white_large_square: :white_large_square: :white_large_square: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button:";
            } else if (30 <= percentAge && percentAge <= 40) {
                percentBar =
                    ":white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button:";
            } else if (40 <= percentAge && percentAge <= 50) {
                percentBar =
                    ":white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button:";
            } else if (50 <= percentAge && percentAge <= 60) {
                percentBar =
                    ":white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_square_button: :white_square_button: :white_square_button: :white_square_button:";
            } else if (60 <= percentAge && percentAge <= 70) {
                percentBar =
                    ":white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_square_button: :white_square_button: :white_square_button:";
            } else if (70 <= percentAge && percentAge <= 80) {
                percentBar =
                    ":white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_square_button: :white_square_button:";
            } else if (80 <= percentAge && percentAge <= 90) {
                percentBar =
                    ":white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_square_button:";
            } else {
                percentBar =
                    ":white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square:";
            }
            return percentBar;
        }
        if (!interactionStringArg) {
            axios
                .get("https://api.rowifi.link/v1/users/" + interaction.user.id)
                .then(function(response) {
                    if (response.data.success) {
                        getRobloxUsername(true, response.data.roblox_id);
                    } else {
                        getRobloxUsername(false);
                    }
                })
                .catch((error) => console.log(
            new Date(),
            `| profile.js |`, error));
        } else {
            var rblx_id = interactionStringArg;
            //var rblx_id;

            var usernameParam = {
                usernames: [rblx_id],
                excludeBannedUsers: true,
            };
            axios
                .post(`https://users.roblox.com/v1/usernames/users`, usernameParam)
                .then(function(response) {
                    console.log(
            new Date(),
            `| profile.js |`, response.data);
                    if (response.data.data.length == 0) {
                        const embed = new EmbedBuilder()
                            .setColor(16073282)
                            .setAuthor({
                                name: interaction.client.user.username,
                                iconURL: interaction.client.user.displayAvatarURL({
                                    format: "png",
                                    dynamic: true,
                                }),
                            })
                            .setDescription(`User **${interactionStringArg}** doesn't exist!`)
                            .setTimestamp()
                            .setFooter({
                                text: interaction.guild.name,
                                iconURL: interaction.guild.iconURL({
                                    format: "png",
                                    dynamic: true,
                                }),
                            });
                        //var infoEmbed = {
                        //    "description": `User **${interactionStringArg}** doesn't exist!`,
                        //    "color": 16073282,
                        //    "author": {
                        //      "name": interaction.client.user.username,
                        //      "icon_url": interaction.client.user.displayAvatarURL({ format: "png", dynamic: true })
                        //    },
                        //    "footer": {
                        //      "text": interaction.guild.name,
                        //      "icon_url": interaction.guild.iconURL({ format: "png", dynamic: true })
                        //    },
                        //    "timestamp": new Date(),
                        //}
                        //var badEmbed = new Discord.EmbedBuilder()
                        //.setColor(0xf54242)
                        //.setDescription(`User **${interactionStringArg}** doesn't exist!`)
                        console.log(
            new Date(),
            `| profile.js |`, embed);
                        return interaction.reply({ embeds: [embed] });
                    } else {
                        rblx_username = response.data.data[0].name;
                        rblx_id = response.data.data[0].id;
                        doRoblox(rblx_username, rblx_id);
                    }
                })
                .catch((error) => console.log(
            new Date(),
            `| profile.js |`, error));
        }
        function getRobloxUsername(value, roblox) {
            if (!value) {
                return interaction.reply(
                    `Sorry ${interaction.user.username}, but you do not seem to be verified in the rover database so that I can fetch your account. Please by saying \`\`/verify\`\``
                );
            } else {
                var usernameParam = {
                    userIds: [roblox],
                    excludeBannedUsers: false,
                };
                axios
                    .post(`https://users.roblox.com/v1/users`, usernameParam)
                    .then(function(response) {
                        console.log(
            new Date(),
            `| profile.js |`, response.data);
                        if (response.data.data.length == 0) {
                            const embed = new EmbedBuilder()
                                .setColor(16073282)
                                .setAuthor({
                                    name: interaction.client.user.username,
                                    iconURL: interaction.client.user.displayAvatarURL({
                                        format: "png",
                                        dynamic: true,
                                    }),
                                })
                                .setDescription(
                                    `User **${interactionStringArg}** doesn't exist!`
                                )
                                .setTimestamp()
                                .setFooter({
                                    text: interaction.guild.name,
                                    iconURL: interaction.guild.iconURL({
                                        format: "png",
                                        dynamic: true,
                                    }),
                                });
                            //var infoEmbed = {
                            //    "description": `User **${interactionStringArg}** doesn't exist!`,
                            //    "color": 16073282,
                            //    "author": {
                            //      "name": interaction.client.user.username,
                            //      "icon_url": interaction.client.user.displayAvatarURL({ format: "png", dynamic: true })
                            //    },
                            //    "footer": {
                            //      "text": interaction.guild.name,
                            //      "icon_url": interaction.guild.iconURL({ format: "png", dynamic: true })
                            //    },
                            //    "timestamp": new Date(),
                            //  }
                            //var badEmbed = new Discord.MessageEmbed()
                            //.setColor(0xf54242)
                            //.setDescription(`User **${roblox}** doesn't exist!`)

                            console.log(
            new Date(),
            `| profile.js |`, embed);
                            return interaction.reply({ embeds: [embed] });
                        } else {
                            rblx_username = response.data.data[0].name;
                            rblx_id = response.data.data[0].id;
                            doRoblox(rblx_username, rblx_id);
                        }
                    })
                    .catch((error) => console.log(
            new Date(),
            `| profile.js |`, error));
            }
        }
        function doRoblox(rblx_username, rblx_id) {
            // const sentMessage = await message.channe.send(`Fetching data...`)

            var current_xp = 0;
            var rank_name;
            var roleset_id;

            axios
                .get(
                    `${process.env.SA_DATABASEURL}points/groups/Alpha Authority/users/${rblx_id}.json`
                )
                .then(function(response) {
                    var current_xp;
                    console.log(
            new Date(),
            `| profile.js |`, response.data);
                    if (!response.data) {
                        xpit(false);
                    } else {
                        current_xp = response.data.xp;
                        xpit(true, current_xp);
                    }
                })
                .catch((error) => console.log(
            new Date(),
            `| profile.js |`, error));

            // new total points added together
            function xpit(value, current_xp) {
                if (value === false) {
                    return interaction.reply(`User has no profile!`);
                }
                axios
                    .get(
                        `https://thumbnails.roblox.com/v1/users/avatar?userIds=${rblx_id}&size=720x720&format=Png&isCircular=false`
                    )
                    .then(function(response) {
                        console.log(
            new Date(),
            `| profile.js |`, response.data);
                        if (response.data.data.length == 0) {
                            //const thumbnail = response.data.data[0].imageUrl
                            noblox
                                .getRankNameInGroup(790907, rblx_id)
                                //axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userid}&size=180x180&format=Png`)
                                .then(function(rankid) {
                                    const embed = new EmbedBuilder()
                                        .setColor(16747520)
                                        .setTitle(`${rblx_username}'s Profile`)
                                        .setURL(`https://www.roblox.com/users/${rblx_id}/profile`)
                                        .setAuthor({
                                            name: interaction.client.user.username,
                                            iconURL: interaction.client.user.displayAvatarURL({
                                                format: "png",
                                                dynamic: true,
                                            }),
                                        })
                                        .setDescription(
                                            `Username: ${rblx_username}\nXP: ${current_xp}\nRank: ${rankid}`
                                        )
                                        .setTimestamp()
                                        .setFooter({
                                            text: interaction.guild.name,
                                            iconURL: interaction.guild.iconURL({
                                                format: "png",
                                                dynamic: true,
                                            }),
                                        });
                                    //var infoEmbed = {
                                    //    "title": `${rblx_username}'s Profile`,
                                    //    "description": `Username: ${rblx_username}\nXP: ${current_xp}\nRank: ${rankid}`,
                                    //    "url": `https://www.roblox.com/users/${rblx_id}/profile`,
                                    //    "color": 16747520,
                                    //    "author": {
                                    //      "name": interaction.client.user.username,
                                    //      "icon_url": interaction.client.user.displayAvatarURL({ format: "png", dynamic: true })
                                    //    },
                                    //    "footer": {
                                    //      "text": interaction.guild.name,
                                    //      "icon_url": interaction.guild.iconURL({ format: "png", dynamic: true })
                                    //    },
                                    //    "timestamp": new Date(),
                                    //  }
                                    //var infoEmbed = new Discord.MessageEmbed()
                                    //    .setColor(0xff8c00)
                                    //    .setTitle(`${rblx_username}'s Profile`)
                                    //    .setURL(`https://www.roblox.com/users/${rblx_id}/profile`)
                                    //    .setDescription(`Username: ${rblx_username}\nXP: ${current_xp}\nRank: ${rankid}`)
                                    //.setThumbnail(response);

                                    // return embed
                                    return interaction.reply({ embeds: [embed] });
                                })
                                .catch((error) => console.log(
            new Date(),
            `| profile.js |`, error));
                        } else {
                            const thumbnail = response.data.data[0].imageUrl;
                            noblox
                                .getRankNameInGroup(790907, rblx_id)
                                //axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userid}&size=180x180&format=Png`)
                                .then(function(rankid) {
                                    const embed = new EmbedBuilder()
                                        .setColor(16747520)
                                        .setTitle(`${rblx_username}'s Profile`)
                                        .setURL(`https://www.roblox.com/users/${rblx_id}/profile`)
                                        .setAuthor({
                                            name: interaction.client.user.username,
                                            iconURL: interaction.client.user.displayAvatarURL({
                                                format: "png",
                                                dynamic: true,
                                            }),
                                        })
                                        .setDescription(
                                            `Username: ${rblx_username}\nXP: ${current_xp}\nRank: ${rankid}`
                                        )
                                        .setThumbnail(thumbnail)
                                        .setTimestamp()
                                        .setFooter({
                                            text: interaction.guild.name,
                                            iconURL: interaction.guild.iconURL({
                                                format: "png",
                                                dynamic: true,
                                            }),
                                        });
                                    //var infoEmbed = {
                                    //    "title": `${rblx_username}'s Profile`,
                                    //    "description": `Username: ${rblx_username}\nXP: ${current_xp}\nRank: ${rankid}`,
                                    //    "url": `https://www.roblox.com/users/${rblx_id}/profile`,
                                    //    "color": 16747520,
                                    //    "author": {
                                    //      "name": interaction.client.user.username,
                                    //      "icon_url": interaction.client.user.displayAvatarURL({ format: "png", dynamic: true })
                                    //    },
                                    //    "footer": {
                                    //      "text": interaction.guild.name,
                                    //      "icon_url": interaction.guild.iconURL({ format: "png", dynamic: true })
                                    //    },
                                    //    "timestamp": new Date(),
                                    //    "thumbnail": {
                                    //        "url": thumbnail
                                    //      }
                                    //  }
                                    //var infoEmbed = new Discord.MessageEmbed()
                                    //    .setColor(0xff8c00)
                                    //    .setTitle(`${rblx_username}'s Profile`)
                                    //    .setURL(`https://www.roblox.com/users/${rblx_id}/profile`)
                                    //    .setDescription(`Username: ${rblx_username}\nXP: ${current_xp}\nRank: ${rankid}`)
                                    //    .setThumbnail(thumbnail);

                                    // return embedinteraction.guild.iconURL({ format: "png", dynamic: true }
                                    return interaction.reply({ embeds: [embed] });
                                })
                                .catch((error) => console.log(
            new Date(),
            `| profile.js |`, error));
                        }
                    })
                    .catch((error) => console.log(
            new Date(),
            `| profile.js |`, error));
            }
        }
    },
};
