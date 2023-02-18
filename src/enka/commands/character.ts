
import { ApplicationCommandOptionType, Colors, CommandInteraction, EmbedBuilder } from "discord.js";
import { Command } from "../../interface/Command";
import { enkaClient } from "../enkaClient";
import { UserCollection } from "../../mongo/mongoClient";



export const  enkaCharacter:Command = {
    name:"character",
    description:"Fetch enka user",
    options: [{
        name:"uid",
        description: "Genshinuid",
        type:ApplicationCommandOptionType.Integer,
        required:false
    },
    {
        name:"index",
        description:"character index",
        type:ApplicationCommandOptionType.Integer,
        required:false,
    }
    ],

    run: async(interaction:CommandInteraction)=>{
        await interaction.deferReply();
        const uid =  interaction.options.get('uid')?.value || (await UserCollection.findOne({"_id": interaction.user.id}))?.genshinUID  || 0;
        if (uid.toString().length < 9) {await interaction.followUp("invalid uid format"); return;}

        const res = await enkaClient.fetchUser(uid as number)
        if (res.characters.length == 0){await interaction.followUp("user has no characters on display"); return;}
        const embedList: EmbedBuilder[] = [];
        if (!res.showCharacterDetails) {await interaction.followUp({content:"Character showcase is hidden", ephemeral:true}); return;}


        const index = interaction.options.get('index')?.value || 0;
        if (index as number > res.characters.length) {await interaction.followUp({content:"index out of range", ephemeral:true}); return;}
        const char = res.characters[index as number];
        let embedColor;
        
        switch (char.characterData.element?.name.get()) {
            case "Cryo": embedColor = Colors.White ; break;
            case "Pyro": embedColor = Colors.Red; break;
            case "Electro": embedColor = Colors.Blurple; break;
            case "Anemo": embedColor = Colors.Green ; break;
            case "Hydro": embedColor = Colors.Blue ;break;
            case "Geo":   embedColor = 15844367 ;break;
            case "Dendro": embedColor = 2067276 ;break;
        
            default:
                embedColor = Colors.White;
        } 


        embedList.push(
            new EmbedBuilder()
                .addFields(
                    {name:"Details", value:`${char.characterData.name.get()} | C${char.unlockedConstellations.length} | ${char.level}/${char.maxLevel}`, inline:true},
                    {name:'HP', value:`${Math.floor(char.status.maxHealth.value)} (${Math.floor(char.status.healthBase.value)} + ${Math.floor(char.status.healthFlat.value)} + ${Math.floor(char.status.healthPercent.value * 100)}%)`, inline: true},
                    {name:"ATK", value:`${Math.floor(char.status.attack.value)}`, inline:true},
                    {name:"Weapon", value:`${char.weapon.weaponData.name.get()} (R${char.weapon.refinement?.level || "?"}) (${char.weapon.level}/${char.weapon.maxLevel})`, inline:true},
                    {name:"CRIT", value:`${Math.floor(char.status.critRate.value * 1000)/10 }/${Math.floor(char.status.critDamage.value * 1000) /10}`, inline:true},
                    {name:"EM", value:`${Math.floor(char.status.elementMastery.value)}`, inline:true},
                    {name:"Artifacts", value:`${char.artifacts.map(artifact =>{ return artifact.artifactData.name.get()})}`, inline:true},
                )
                .setThumbnail(char.characterData.icon.url)
                .setColor(embedColor)

        );


        
        await interaction.followUp({embeds:embedList});
        return;
        
    }
}