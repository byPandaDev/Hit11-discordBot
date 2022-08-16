import { Client, GuildMember, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Role, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: "Config",
    description: "Adds a role the the dropdown",

    permissions: ["ADMINISTRATOR"],

    minArgs: 3,
    expectedArgs: "<channel> <messageId> <role>",
    expectedArgsTypes: ["CHANNEL", "STRING", "ROLE"],

    slash: true,
    testOnly: true,
    guildOnly: true,

    init: (client: Client) => {
        client.on("interactionCreate", Interaction => {
            if(!Interaction.isSelectMenu()) return
            
            const { customId, values, member } = Interaction

            if(customId === "auto_roles" && member instanceof GuildMember) {

                const component = Interaction.component as MessageSelectMenu
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value)
                })

                for(const id of removed) {
                    member.roles.remove(id.value)
                }

                for(const id of values) {                    
                    member.roles.add(id)
                }

                Interaction.reply({
                    content: "Roles Updated!",
                    ephemeral: true,
                })
            }
        })
    },

    callback: async ({ interaction, args, client }) => {

        const channel = interaction.options.getChannel("channel") as TextChannel
        const messageId  = args[1]
        const role = interaction.options.getRole("role") as Role

        const targetMessage = await channel.messages.fetch(messageId, {
            cache: true,
            force: true,
        })

        if(!targetMessage) return "Unknowm Message ID"
        if(targetMessage.author.id !== client.user?.id) return `Please provide a message ID that was send from <@${client.user?.id}>`

        let row = targetMessage.components[0] as MessageActionRow
        if(!row) row = new MessageActionRow()

        const option: MessageSelectOptionData[] = [{
            label: role.name,
            value: role.id
        }]

        let menu = row.components[0] as MessageSelectMenu
        if(menu) {
            for(const o of menu.options) {
                if(o.value === option[0].value) {
                    return {
                        custom: true,
                        content: `<@&${o.value}> is already part of this menu`,
                        allowedMentions: {roles: []},
                        ephermal: true,
                    }
                }
            }

            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)

        } else {
            row.addComponents(
                new MessageSelectMenu()
                .setCustomId("auto_roles")
                .setMinValues(0)
                .setMaxValues(1)
                .setPlaceholder("Select your roles")
                .addOptions(option)
            )
        }

        targetMessage.edit({
            components: [row]
        })

        return {
            custom: true,
            content: `Added <@&${role.id}> to the auto roles menu`,
            allowedMentions: {
                role: []
            },
            ephermal: true,
        }

    }

} as ICommand