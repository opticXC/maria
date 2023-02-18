import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { Command } from "../../interface/Command";
import { UserCollection } from "../../mongo/mongoClient";
import { enkaClient } from "../enkaClient";


export const profile:Command = {
    name:"profile",
    description:"Genshin Profile",
    options: [{
        name:"uid",
        description:"genshin uid",
        type:ApplicationCommandOptionType.Integer,
        required:false
    }],

    run: async(interaction) => {
        await interaction.deferReply();
        const uid =  interaction.options.get("uid")?.value|| (await UserCollection.findOne({"_id": interaction.user.id}))?.genshinUID || 0;
        
        if ((uid as string).length < 9) {await interaction.followUp("invalid uid format"); return;}

        const user = (await  enkaClient.fetchUser(uid as string)) || undefined;

        if (!user){await interaction.followUp("User not found.\nuid might be invalid"); return;}
        const embed = new EmbedBuilder()
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .setAuthor({name:interaction.user.username, iconURL:interaction.user.avatarURL({size:512})!})
            .addFields([
                {name:"Name", value:`${user.nickname}`},
                {name:"Signature", value:user.signature||"No Signature"},
                {name:"AR", value:`${user.level}`},
                {name:"World Level", value:`${user.worldLevel || "unavailable"}`, inline:true},
                {name:"Abyss", value:`${user.abyssFloor||0}-${user.abyssChamber ||0}`, inline:true},
            ])
            .setThumbnail(`${user.profilePictureCharacter?.icon.url}`);

        await interaction.followUp({embeds:[embed]});
        return;
    }
}