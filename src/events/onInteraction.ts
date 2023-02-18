import { BaseInteraction } from "discord.js";
import { CommandList } from "../config/CommandList";


export const onInteraction = async (i: BaseInteraction) => {
    if (!i.isCommand()) return;

    const command = CommandList.find(c=> c.name === i.commandName);

    if (!command){
         await i.reply("Unknown Command Error ");
         return;
        }

    try{
        await command.run(i);
    }catch (err){
        if (i.replied) await i.editReply({content:"Error executing command"});
        if (i.deferred) await i.followUp({content:"Error executing command", ephemeral:true});
        else await i.reply({content:"Error executing command", ephemeral:true})
        console.log(err);
    }
}