import { Client } from "discord.js"
import { IntentOptions } from "./config/IntentOptions";
import { onInteraction } from "./events/onInteraction";
import * as dotenv from "dotenv";
import { onReady } from "./events/onReady";
dotenv.config();



const client = new Client({ intents: IntentOptions });

client.once('ready', async (c) => await onReady(c));

client.on('interactionCreate', async (i) => await onInteraction(i))


client.login(process.env.BOT_TOKEN);