/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Client, REST, Routes} from "discord.js";
import * as dotenv from 'dotenv';
import { IntentOptions } from "./config/IntentOptions";
import { exit } from "process";

dotenv.config();


const client = new Client({intents:IntentOptions});

const token = process.env.BOT_TOKEN as string;
const guildId = process.env.GUILD_ID as string;
const rest = new REST().setToken(token);

client.once('ready',async () => {
    await rest.put(Routes.applicationCommands(client.application?.id!), {body:[]})
    await rest.put(Routes.applicationGuildCommands(client.application?.id!, guildId), {body:[]})
    
    client.destroy();
    exit(0);
})


client.login(token);

