/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Client, REST, Routes} from "discord.js";
import * as dotenv from 'dotenv';
import { IntentOptions } from "./config/IntentOptions";
import { exit } from "process";
import { CommandList } from "./config/CommandList";
import { Command } from "./interface/Command";

dotenv.config();


const client = new Client({intents:IntentOptions});

const token = process.env.BOT_TOKEN as string;
const guildId = process.env.GUILD_ID as string;
const rest = new REST().setToken(token);

const commandsBody: Command[] = []
for (const cmd of CommandList){
    commandsBody.push(cmd);
}

client.once('ready', async()=>{
    console.log(`registering ${commandsBody.length} commands`);
    await rest.put(Routes.applicationGuildCommands(client.application?.id!, guildId), {body:commandsBody})
    //await rest.put(Routes.applicationCommands(client.application?.id!), {body:commandsBody})
    client.destroy();
    exit(0);
})

client.login(token);