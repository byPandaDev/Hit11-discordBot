"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    category: "Info",
    description: "Sends Info about the Bot",
    slash: true,
    testOnly: true,
    guildOnly: true,
    callback: ({ client, interaction, args }) => {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
        const embed = new discord_js_1.MessageEmbed()
            .setColor("#cc7c8e")
            .setTitle("Bot Informations")
            .setThumbnail("https://cdn130.picsart.com/328622438054201.jpg")
            .addFields({ name: "Runtime:", value: `${uptime}` }, { name: "Bot Latency:", value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true }, { name: "API Latency:", value: `${Math.round(client.ws.ping)}ms`, inline: true })
            .setFooter({ text: "Akira Bot", iconURL: "https://cdn130.picsart.com/328622438054201.jpg" });
        interaction.reply({
            embeds: [embed]
        });
    }
};
