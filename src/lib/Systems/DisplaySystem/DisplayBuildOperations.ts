import type { DisplaySettings } from "../SettingsSystem/LocalSettingsTypes";
import type { Asteroid } from "../Asteroid";
import { setColorsByDisplaySettings } from "../ColorSystem/ColorUpdateOperations";
import { InfoDistribution } from "./DisplayManager";
import { emojiList, globalSettingsStore } from "../SettingsSystem/GlobalSettings";
import { get } from "svelte/store";

export function buildAndWrapDisplayOption(AsteroidCollection: Array<Asteroid>, displaySettings: DisplaySettings, infoDistribution = InfoDistribution.AllCentered, singleRestColor ="white", isHeart = false) { 
    console.log("singleRestcolor", singleRestColor)
    let gender = get(globalSettingsStore.gender);
    for (let i = 0; i < AsteroidCollection.length; i++) {
            let rSti = AsteroidCollection[i].rSti;
            AsteroidCollection[i].DM.infoDistribution = infoDistribution;
            AsteroidCollection[i].DM.isHeart = isHeart;
            AsteroidCollection[i].emoji = emojiList[gender][(rSti)];
            if(displaySettings.showEmojis){
                AsteroidCollection[i].DM.showEmojis = displaySettings.showEmojis;
            }
            AsteroidCollection[i].DM.showNotes = displaySettings.showNotes; 
            AsteroidCollection[i].DM.showNumbers = displaySettings.showNumbers; 
            AsteroidCollection[i] = setColorsByDisplaySettings(AsteroidCollection[i],displaySettings, singleRestColor);
        }
    return AsteroidCollection;
}
