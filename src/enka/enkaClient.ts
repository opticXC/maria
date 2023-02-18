import { EnkaClient } from "enka-network-api";


export const enkaClient = new EnkaClient({defaultLanguage:"en",cacheDirectory: "./.cache", showFetchCacheLog:true});
enkaClient.cachedAssetsManager.activateAutoCacheUpdater({
    instant:true,
    timeout: 60 *60 *1000,
    onUpdateStart: async()=>{
        console.log("Fetching Enka Cache");
    },
    onUpdateEnd: async()=>{
        console.log("Enka Cache Updated");
    }
})


