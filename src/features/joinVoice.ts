import { Client } from "discord.js";

export default (client: Client) => {

    const channelId = "1009434322916352121"
    const categoryId = "1009427990079348877"

    client.on("voiceStateUpdate", async (oldState, newState) => {

        if(newState.channel?.name === "Join to create") {
            
            newState.guild.channels.create(`${newState.member!.user.username}#${newState.member!.user.discriminator}`, {
                type: 'GUILD_VOICE',
                parent: `${categoryId}`,
            }).then(vc => {
                newState.setChannel(vc);
            })
            }
            if (oldState.channel?.parentId === categoryId && oldState.channelId !== channelId && oldState.channel?.members.size! < 1) {
                oldState.channel?.delete()            
        }
        
    })
}