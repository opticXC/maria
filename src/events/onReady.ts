import { Client } from "discord.js";


export const onReady = async(client:Client) =>{

    console.log(`${client.user?.username}#${client.user?.discriminator} logged in`);
    
}