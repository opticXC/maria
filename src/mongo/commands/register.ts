import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../interface/Command";
import { enkaClient } from "../../enka/enkaClient";
import { UserCollection } from "../mongoClient";
import { mariaUser } from "../schema/user";



export const register:Command = {
    name:"register",
    description: "register to bot db",
    options:[{
        name:"uid",
        description: "Genshinuid",
        type:ApplicationCommandOptionType.Integer,
        required:true
    },
    ],

    run: async(interaction)=>{
        await interaction.deferReply();
        const genshinUID = interaction.options.get('uid')?.value || (await UserCollection.findOne({"_id": interaction.user.id}))?.genshinUID || 0;
        if (genshinUID.toString().length < 9) {await interaction.followUp("Invalid Uid format"); return;}

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const testUser = await enkaClient.fetchUser(genshinUID as string);
            
        }catch(err){
            await interaction.followUp("UID error\nUID might be invalid");
            return 
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const user:mariaUser = (await UserCollection.findOne({"_id": interaction.user.id})) || {_id:interaction.user.id, name:interaction.user.username,genshinUID:genshinUID as number }
        try{
            await UserCollection.insertOne(user);
        }catch (err){
            await UserCollection.updateOne({"_id": user._id}, user);
        }
        await interaction.followUp("Registered to bot db");
        
    }
}