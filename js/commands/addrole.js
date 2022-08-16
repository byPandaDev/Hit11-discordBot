"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    category: "Config",
    description: "Adds a role the the dropdown",
    permissions: ["ADMINISTRATOR"],
    minArgs: 3,
    expectedArgs: "<channel> <messageId> <role>",
    expectedArgsTypes: ["CHANNEL", "STRING", "ROLE"],
    slash: true,
    testOnly: true,
    guildOnly: true,
    init: (client) => {
        client.on("interactionCreate", Interaction => {
            if (!Interaction.isSelectMenu())
                return;
            const { customId, values, member } = Interaction;
            if (customId === "auto_roles" && member instanceof discord_js_1.GuildMember) {
                const component = Interaction.component;
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value);
                });
                for (const id of removed) {
                    member.roles.remove(id.value);
                }
                for (const id of values) {
                    member.roles.add(id);
                }
                Interaction.reply({
                    content: "Roles Updated!",
                    ephemeral: true,
                });
            }
        });
    },
    callback: ({ interaction, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const channel = interaction.options.getChannel("channel");
        const messageId = args[1];
        const role = interaction.options.getRole("role");
        const targetMessage = yield channel.messages.fetch(messageId, {
            cache: true,
            force: true,
        });
        if (!targetMessage)
            return "Unknowm Message ID";
        if (targetMessage.author.id !== ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id))
            return `Please provide a message ID that was send from <@${(_b = client.user) === null || _b === void 0 ? void 0 : _b.id}>`;
        let row = targetMessage.components[0];
        if (!row)
            row = new discord_js_1.MessageActionRow();
        const option = [{
                label: role.name,
                value: role.id
            }];
        let menu = row.components[0];
        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    return {
                        custom: true,
                        content: `<@&${o.value}> is already part of this menu`,
                        allowedMentions: { roles: [] },
                        ephermal: true,
                    };
                }
            }
            menu.addOptions(option);
            menu.setMaxValues(menu.options.length);
        }
        else {
            row.addComponents(new discord_js_1.MessageSelectMenu()
                .setCustomId("auto_roles")
                .setMinValues(0)
                .setMaxValues(1)
                .setPlaceholder("Select your roles")
                .addOptions(option));
        }
        targetMessage.edit({
            components: [row]
        });
        return {
            custom: true,
            content: `Added <@&${role.id}> to the auto roles menu`,
            allowedMentions: {
                role: []
            },
            ephermal: true,
        };
    })
};
