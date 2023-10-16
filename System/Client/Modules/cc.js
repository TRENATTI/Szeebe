module.exports = {
	name: "cc",
	description: "Converts Celcius into Fahrenheit.",
	aliases: ["convertc"],
	execute(message, args) {
		if (!isNaN(args[0])) {
			return message.channel.send(
				Math.round(((9 / 5) * args[0] + 32) * 100) / 100 +
					" Fahrenheit."
			);
		}
	},
};
