
import type SpiralSettings from "../../Features/Synesthesia/Spiral/SpiralSettings.svelte";
import type { Asteroid } from "../Asteroid";
import { setColorsByDisplaySettings } from "../ColorSystem/ColorUpdateOperations";
import type { SoundPlayer2 } from "../SoundSystem/SoundPlayer2";
import type { DisplaySettings, SoundSettings } from "./LocalSettingsTypes";

//Commands for single asteroid update

// Display Commands
// You might wanna keep commands for onClickShow...
// Show notes and Show emojis must be a part for renderprossess 
export function showNotesCmd(AsteroidCollection: Array<Asteroid>, settings :SpiralSettings){
    AsteroidCollection.forEach(a => {
        a.DM.showNotes = settings.DisplaySettings.showNotes;           
        setColorsByDisplaySettings(a, settings.DisplaySettings, "white");
    })
}


// export function highlightScaleCmd(AsteroidCollection: Array<Asteroid>, settings: SpiralSettings){
//     ColorManager.instance.setColorsBySettings(AsteroidCollection, settings);
// }

// export function showColorsCmd(AsteroidCollection: Array<Asteroid>, settings: SpiralSettings){
//     ColorManager.instance.setColorsBySettings(AsteroidCollection, settings);
// }

export function showEmojisCmd(AsteroidCollection: Array<Asteroid>, settings: SpiralSettings){
    AsteroidCollection.forEach(s => {
                    s.DM.showEmojis = settings.DisplaySettings.showEmojis;
    })}

export function updateBackgroundCmd(htmlCanvas:HTMLCanvasElement, settings: DisplaySettings){
    const currentBackgroundColor = getComputedStyle(htmlCanvas).backgroundColor;
    const rgbValues = currentBackgroundColor.match(/\d+/g);
    const [red, green, blue] = rgbValues;
    htmlCanvas.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${settings.background})`;
    htmlCanvas.style.border = `1px solid rgba(72, 72, 72, ${settings.background})`;
}

export function updateSoundTypeCmd(soundPlayer: SoundPlayer2, settings: SoundSettings){
    console.log("update soundType", settings)
    soundPlayer.setSampler(settings.soundType);
}
export function updateVolumeCmd(soundPlayer: SoundPlayer2, settings: SoundSettings){
    soundPlayer.gain.gain.value = settings.volume;
}

//SoundCommands
//GeometryCommands
