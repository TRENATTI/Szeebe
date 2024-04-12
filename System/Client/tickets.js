require("dotenv").config();
const { ComponentType } = require("discord.js")

async function tickets(client, noblox, currentUser, admin, token, applicationid, prefix) {

    
	client.once("ready", async () => {

        const guild = await client.guilds.fetch(`1182652224040620052`);
        const channel = await guild.channels.fetch('1182652602832408638');
        const response = await channel.messages.fetch('1182655235345371251')


		try {
			//const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });
			const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time: 3_600_000 });

			collector.on('collect', async i => {
                //response.deferReply()
				//const selection = i.values[0];
                console.log(i)
                //if (selection == "button") {
                    response.deferReply({ content: `Thanks for testing, this will be out shortly!`, ephemeral: true })
                    console.log("True!");
                //}
            });
        } catch (error) {
            console.log(error)
        }
	});
}

async function ex(){

}
module.exports = ex;
