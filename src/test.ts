
import { enkaClient } from "./enka/enkaClient";


enkaClient.cachedAssetsManager.fetchAllContents({});

enkaClient.fetchUser(731847642).then((value)=>{
    for (const char of value.characters){
        console.log(char.characterData.name.get());
    }
})