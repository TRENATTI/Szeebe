module.exports = {
    name: 'cf',
    description: 'Converts Fahrenheit into Celcius.',
    aliases: ['convertf'],
    execute(message, args) {
        if (!isNaN(args[0])) {
            return message.channel.send((Math.round(((5 / 9) * (args[0] - 32)) * 100) / 100) + ' Celcius.');
        }
    }
}