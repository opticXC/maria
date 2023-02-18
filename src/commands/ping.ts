import { Command } from "../interface/Command";


export const ping:Command = {
    name:'ping',
    description:'pings bot',

    run: async(interaction)=> {
        //await interaction.deferReply();
        await interaction.reply(`pong! ${interaction.client.ws.ping}`);
        return;
    },
}