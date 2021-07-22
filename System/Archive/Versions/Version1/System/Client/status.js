function status(client) {
    const prefix = process.env.PREFIX
    client.on('ready', () => {
        console.log("I'm in");
        console.log(client.user.username);
        //client.user.setActivity('\"' + prefix + '\"', {type: "LISTENING"}); 
        const activities = [
			`${client.guilds.cache.size} servers!`,
			`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`
		];

		let i = 0;
		setInterval(() => client.user.setActivity(process.env.PREFIX + `help | ${activities[i++ % activities.length]}`, { type: 'LISTENING' }), 15000);
    });
}

module.exports = status;