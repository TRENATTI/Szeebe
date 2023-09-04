// By ScriptIntelligence

// Structure Setup

// node_modules
// modules
// settings
// events
// startup
// functions

// // //

require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits } = require("discord.js");
const noblox = require("noblox.js");
const admin = require("firebase-admin");


// // //

const clientSystem = './System/Client';

// // //

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

const rbxcookie = process.env.RBXCOOKIE

//

async function startApp(currentUser, client, admin) {
    const clientFiles = fs
        .readdirSync(clientSystem)
        .filter(file => file.endsWith('.js'));

    for (const file of clientFiles) {
        const clientFile = require(clientSystem + '/' + file);
        clientFile(client, noblox, currentUser, admin);
    }
}

//

async function startFirebase(currentUser, client) {
    const SA_PRIVATE_KEY = process.env.SA_PRIVATE_KEY.split("\\n").join("\n");

    var serviceAccount = {
      type: process.env.SA_TYPE,
      project_id: process.env.SA_PROJECT_ID,
      private_key_id: process.env.SA_PRIVATE_KEY_ID,
      private_key: SA_PRIVATE_KEY,
      client_email: process.env.SA_CLIENT_EMAIL,
      client_id: process.env.SA_CLIENT_ID,
      auth_uri: process.env.SA_AUTH_URI,
      token_uri: process.env.SA_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.SA_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.SA_CLIENT_X509_CERT_URL,
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.SA_DATABASEURL,
    });

    startApp(currentUser, client, admin)
}
//

async function startDiscord(currentUser) {

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
        ],
    });

    //

    client.login(token);

    startFirebase(currentUser, client)
}

//

async function startNoblox() {
    // You MUST call setCookie() before using any authenticated methods [marked by 🔐]
    // Replace the parameter in setCookie() with your .ROBLOSECURITY cookie.
    const currentUser = await noblox.setCookie(`${rbxcookie}`)
    console.log(
            new Date(),
            `| index.js |`,`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)

    // Do everything else, calling functions and the like.
    startDiscord(currentUser)
}

startNoblox()
