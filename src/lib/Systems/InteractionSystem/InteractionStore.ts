import { AsteroidState, type Asteroid } from "../Asteroid";
import { writable } from "svelte/store";
import { SoundBy } from "../SettingsSystem/LocalSettingsTypes";
import { MIDIData, MIDISlotData, MidiAction } from "../../Features/Tools/MidiMapper/MidiCollection/MidiSlot/MidiSlotData";
import { mapToSoundMessage } from "./InteractionModels";
import { ReleaseSoundCommand, TriggerSoundCommand } from "./InteractionCommands";
import type { SoundPlayer2 } from "../SoundSystem/SoundPlayer2";

//rename, splitt mouseInputStore and globalSettingsStore
//fix plural or singular
//Consider making Global settings class and input class
export const MidiSignalStore = writable(new MIDIData());
export const MidiSlotCollectionStore = writable(new Array<MIDISlotData>());
export const TangentArrayStore=  writable(["", "", "", ""]);
export const TangentTriggerStore = writable({midi:-1, systemId:null, stIndex:-1, intialChordNote:false, registerDisplay:true});
export const TangentReleaseStore = writable({midi:-1, systemId:null, stIndex:-1});
export const MidiActionTriggerStore = writable(MidiAction.None);
// export const MidiActionReleaseStore = writable(MidiAction.None);

//redraw should carry release

//should mayeb draw have an optional input, to pass relevant data to reDraw/render?
// Try to trigger sound more directly from midi and not by tangent trigger. Do a bit performance test
export function subscribeTangentTrigger(AsteroidCollection: Array<Asteroid>,soundPlayer: SoundPlayer2, reDraw:any, allNoteGenerations = false){

    // I dont want the subscription to trigger on initialization, so I set the value to empty string
    // The downside is that by updating the value, I will trigger the subscription
    // I cant see a way around this. An alternative is to pass some sort of flag from the calling scope
    // but I suspect that might be more expensive than this solution as it will be reqired in all calls
    
    TangentTriggerStore.update((value)=>{
        value.midi = -1; 
        return value
    });

    return TangentTriggerStore.subscribe((value) =>
    {   
        // console.log("TangentTriggerStore", value)
        // This is prevent clearing value to further trigger subscriptions
        if(value.midi == -1) return; 
        //All generations == C1,C2,C3 etc. Todo: check possible trigger duplicates
        if(allNoteGenerations){
            let clicked = AsteroidCollection.find(
            (a) => a.tSti == value.stIndex);
            if (clicked) {
                clicked.state = AsteroidState.Triggered;
                clicked.colors.drawColor = clicked.colors.touchColor;
                reDraw(); // might wanna add drawType : trigger or release
            }
        }
        else{
            let clicked = AsteroidCollection.find(
                (k) => k.SM.midiNote == value.midi);
            if (clicked) {
                clicked.state = AsteroidState.Triggered;
                clicked.colors.drawColor = clicked.colors.touchColor;
                reDraw();
                //If(sound by external input, also other windows)
                if(clicked.SM.soundBy == SoundBy.External && clicked.systemId != value.systemId){
                    TriggerSoundCommand(mapToSoundMessage(clicked), soundPlayer, false)
                }
            }
        }
    })
}  

//Check if I should move redraw, to prevent multiple redraws
export function subscribeTangentRelease(AsteroidCollection: Array<Asteroid>, soundPlayer: SoundPlayer2, reDraw:any, allNoteGenerations = false){
    // as used in subscribeTangentTrigger there will be asymetric behaviour if I don't reset the value
    // is statement in piano: "//sometimes last input release and trigger are different, improve?"" still an issue?
    TangentReleaseStore.update((value)=>{
        value.midi = -1; 
        return value
    });

    return TangentReleaseStore.subscribe((value) =>
    { 
        // console.log("TangentReleaseStore", value)
        if(value.midi == -1) return; 
        if(allNoteGenerations){
            let clicked = AsteroidCollection.find(
            (k) => k.tSti == value.stIndex);
            if (clicked) {
                clicked.state = AsteroidState.Rest;
                clicked.colors.drawColor = clicked.colors.restColor;
                reDraw();
            }
        }
        else{
        let clicked = AsteroidCollection.find(
            (k) =>  k.SM.midiNote == value.midi);  
        if (clicked) {
            clicked.state = AsteroidState.Rest;
            clicked.colors.drawColor = clicked.colors.restColor;
            reDraw();
            if(clicked.SM.soundBy == SoundBy.External && clicked.systemId != value.systemId){
                ReleaseSoundCommand(mapToSoundMessage(clicked), soundPlayer, false)
            }
        }
    }
    })
}  

