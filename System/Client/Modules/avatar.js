module.exports = {
    name: 'avatar',
    description: 'Avatar.',
    aliases: ['av'],
    execute(message, args) {
        const user = message.mentions.users.first() || message.author;
		return message.channel.send (`\`\`${user.tag}\`\`'s avatar: ${user.displayAvatarURL({ format: "png", dynamic: true })}?size=1024`);
    }
}