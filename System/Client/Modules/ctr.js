module.exports = {
    name: 'ctr',
    description: 'Converts time to epoch time.',
    aliases: ['converttimer'],
    execute(message, args){ 
        const thisdateedited = Date.parse(`${message.content.slice(6)}`) / 1000
        console.log(thisdateedited)
        return  message.channel.send(`<t:${thisdateedited}:R> / ` + "``<t:" +  `${thisdateedited}` + ":R>``" + `\n<t:${thisdateedited}:F> / ` + "``<t:" + `${thisdateedited}` + ":F>``" + `\n${thisdateedited}`)
    }
}