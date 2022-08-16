import DiscordJS, { Intents } from "discord.js"
import dotenv from "dotenv"
import path from "path"
import WOKCommands from "wokcommands"

dotenv.config({ path: __dirname + '/.env' })

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ]
})

client.on("ready", async () => {

    client.user?.setPresence({
        status: "online",
        activities: [
            {
                name: "Hit11",
                type: "WATCHING"
            },

        ]
    })

    new WOKCommands(client, {
        commandDir: path.join(__dirname, "commands"),
        featureDir: path.join(__dirname, "features"),
        typeScript: false,
        testServers: ["1009065402611007498"], 
        /* mongoUri: process.env.MONGOOSE_URI,
        dbOptions: {
            keepAlive: true
        }, */
        botOwners: ["268787676600205314"],
        disabledDefaultCommands: [
            "command",
            "language",
            "requiredrole",
            "help",
            "channelonly",
            "prefix"
        ]
    })
})
client.login(process.env.TOKEN)