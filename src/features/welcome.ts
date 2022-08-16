import { Client } from "discord.js";

export default (client: Client) => {
    client.on("guildMemberAdd", async member => {
        
        const { guild } = member

        console.log(`${member.displayName} joined the Server`);
        

        let studentRole = guild.roles.cache.find(role => role.name === "Schüler")

        member.roles.add(studentRole!)
        console.log(`Student role added to ${member.displayName}`);
        
    })
}