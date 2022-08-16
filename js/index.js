"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const wokcommands_1 = __importDefault(require("wokcommands"));
dotenv_1.default.config({ path: __dirname + '/.env' });
const client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MEMBERS,
    ]
});
client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
        status: "online",
        activities: [
            {
                name: "Hit11",
                type: "WATCHING"
            },
        ]
    });
    new wokcommands_1.default(client, {
        commandDir: path_1.default.join(__dirname, "commands"),
        featureDir: path_1.default.join(__dirname, "features"),
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
    });
}));
client.login(process.env.TOKEN);
