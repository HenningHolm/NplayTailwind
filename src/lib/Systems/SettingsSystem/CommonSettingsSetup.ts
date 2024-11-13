import type { GUI } from "dat.gui";
import type { DispatchOptions } from "svelte/internal";
import { Gender, globalSettingsStore } from "./GlobalSettings";
import { HighlightScale, ShowColors, ShowNumbers, SoundBy, SoundType, TransposeType } from "./LocalSettingsTypes";
import { SoundPlayer } from "../SoundSystem/SoundPlayer";

function fullRebuild(dispatcher: <EventKey>(type: EventKey, detail?: any, options?: DispatchOptions) => boolean){
    dispatcher("updateFullRebuild")    
}
function updateBackground(dispatcher: <EventKey>(type: EventKey, detail?: any, options?: DispatchOptions) => boolean){
    dispatcher("updateCommand", {type:"background"})    
}
function updateSoundType(dispatcher: <EventKey>(type: EventKey, detail?: any, options?: DispatchOptions) => boolean){
    dispatcher("updateCommand", {type:"soundType"});    
}
function updateVolume(dispatcher: <EventKey>(type: EventKey, detail?: any, options?: DispatchOptions) => boolean){
    dispatcher("updateCommand", {type:"volume"});    
}

//NOTE: In Dat.gui, an object will always use type string
//TODO check all that if's are correct. Make better option pattern
// setupGui tar bruker DS og SS til å avgjøre hvilken type settings som skal konfigures   // addLimitObject
// add undefined on grouplevel as well
export async function setupCommonGui(commonGui : GUI, BuildSettings, DisplaySettings, SoundSettings, htmlDiv, dispatcher, open = [], noteQuantity = 72) {

    // Should commonGui be initalized here? I like it a bit better to be made in the system that uses it.
    // Could return it, but as this might be bound a subsciption (and used await), I feel I lose a bit of scope control.

    const buildFolder = commonGui.addFolder("Build Settings");   

    if(DisplaySettings.highlightScale !== undefined){ //miss-placed on purpose
        buildFolder.add(DisplaySettings, "highlightScale", [HighlightScale.Static, HighlightScale.Dynamic, HighlightScale.Off]).name("Highlight Scale").onChange(() => fullRebuild(dispatcher))
    }
    if(BuildSettings.startNote !== undefined){
        buildFolder.add(BuildSettings, "startNote", {"C": 0, "C#": 1,"D" : 2, "D#": 3, 
                                                     "E": 4, "F": 5, "F#": 6, "G" : 7,
                                                     "G#":8, "A": 9, "A#": 10,"B" : 11}).name("Start note (TODO)").onChange(() => fullRebuild( dispatcher));
    }
    if(BuildSettings.gender !== undefined){
        buildFolder.add(BuildSettings, "gender",  [Gender.StraightMan, Gender.GayMan, Gender.StraightWoman, Gender.GayWoman, Gender.Other]).name("Gender").onChange(() =>{globalSettingsStore.gender.set(BuildSettings.gender), fullRebuild(dispatcher)});
    }
    if(BuildSettings.equalShape !== undefined){
        buildFolder.add(BuildSettings, "equalShape", ["Classic","Equal"]).name("Shapes").onChange(() => fullRebuild(dispatcher));
    }
    if(BuildSettings.startLevel !== undefined){
        buildFolder.add(BuildSettings, "startLevel", 0, 4, 1).name("Start Octave").onChange(() => fullRebuild(dispatcher));
    }
    if(BuildSettings.quantity !== undefined){
        buildFolder.add(BuildSettings, "quantity", 1, noteQuantity, 1).name("Number of notes").onChange(() => fullRebuild(dispatcher));
    }
    if(open.includes("build")){
        buildFolder.open();
    }
    htmlDiv.appendChild(buildFolder.domElement);

   // displayGui = new dat.GUI({autoPlace: false});
    const displayFolder = commonGui.addFolder("Display Settings");
    if(DisplaySettings.showNotes !== undefined){
        displayFolder.add(DisplaySettings, "showNotes").name("Show Notes").onChange(() => fullRebuild(dispatcher))
    }
    if(DisplaySettings.showEmojis !== undefined){
        displayFolder.add(DisplaySettings, "showEmojis").name("Show Emojis").onChange(() => fullRebuild(dispatcher))
    }
    if(DisplaySettings.showColors !== undefined){
        displayFolder.add(DisplaySettings, "showColors", [ShowColors.Off, ShowColors.On, ShowColors.OnPlay]).name("Show Colors").onChange(() => fullRebuild(dispatcher))
    }
    if(DisplaySettings.showNumbers !== undefined){
        displayFolder.add(DisplaySettings, "showNumbers",[ShowNumbers.None, ShowNumbers.MIDI, ShowNumbers.RomanNumeral, ShowNumbers.RelativeFrequency, ShowNumbers.Frequency, ShowNumbers.IndexUp, ShowNumbers.IndexDown, ShowNumbers.IndexDual]).name("Show Numbers").onChange(() => fullRebuild(dispatcher));
    }
    if(DisplaySettings.background !== undefined){
        displayFolder.add(DisplaySettings, "background", 0, 1, 0.1).name("Background").onChange((value) => updateBackground(dispatcher))
    }
    if(open.includes("display")){
        displayFolder.open();
    }

    //displayFolder.add(DisplaySettings, "defaultScale", false).name("Show Default Scale").onChange(() => updateDS("defaultScale"));
    htmlDiv.appendChild(displayFolder.domElement);
    
   // soundGui = new dat.GUI({autoPlace: false});
    const soundFolder = commonGui.addFolder("Sound Settings");

    if(SoundSettings.soundType !== undefined){
        soundFolder.add(SoundSettings, "soundType",[SoundType.Piano, SoundType.DreamyPiano, SoundType.Guitar, SoundType.Violin, SoundType.PanFlute ,SoundType.SpaceSynth, SoundType.Sinus]).name("Sound type").onChange(() => updateSoundType(dispatcher));
    }
    if(SoundSettings.soundBy !== undefined){
        soundFolder.add(SoundSettings, "soundBy", [SoundBy.Click, SoundBy.External, SoundBy.Both]).name("Sound By").onChange(() => fullRebuild(dispatcher));
    }
    if(SoundSettings.transposeType !== undefined){
        soundFolder.add(SoundSettings, "transposeType", [TransposeType.Both, TransposeType.Input, TransposeType.Output]).name("Transpose Input/Output").onChange(() => fullRebuild(dispatcher));
    }
    // if(SoundSettings.startNote !== undefined){
    //     soundFolder.add(SoundSettings, "startNote", {"C": 0, "C#": 1, "D": 2,"D#": 3, "E": 4,"F": 5,"F#": 6,
    //                                              "G": 7,"G#": 8,"A": 9,"A#": 10,"B": 11}).name("Start note").onChange(() => updateSS("startNote", dispatcher));
    // }
    if(SoundSettings.startNote !== undefined){
        soundFolder.add(SoundSettings, "transpose", 0, 11, 1).name("Transpose").onChange(() => fullRebuild(dispatcher));
    }
    if(SoundSettings.volume !== undefined){
        soundFolder.add(SoundSettings, "volume", 0, 10, 0.1).name("Gain (< Device Volume)").onChange(() => updateVolume(dispatcher));
    }
    if(open.includes("sound")){
        soundFolder.open();
    }
    // soundFolder.add(SoundSettings, "sustain", false).name("Sustain").onChange(() => updateDS("sustain"));
    htmlDiv.appendChild(soundFolder.domElement);


    return commonGui;
}
