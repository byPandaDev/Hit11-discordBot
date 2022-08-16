import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: "Config",
    description: "Sends a message",

    permissions: ["ADMINISTRATOR"],

    minArgs: 2,
    expectedArgs: "<channel> <text>",
    expectedArgsTypes: ["CHANNEL", "STRING"],

    slash: true,
    testOnly: true,
    guildOnly: true,

    callback: ({ interaction, args }) => {

        const channel = interaction.options.getChannel("channel") as TextChannel

        args.shift()
        const text = args.join(" ")

        channel.send(text)

        interaction.reply({
            content: "Message Send",
            ephemeral: true
        })

    }

} as ICommand