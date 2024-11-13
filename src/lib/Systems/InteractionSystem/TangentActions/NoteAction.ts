import { Note } from "tonal";
import {TangentReleaseStore, TangentTriggerStore } from "../InteractionStore";
import type { SoundActionMessage } from "../InteractionModels";
import type { SoundPlayer2 } from "../../SoundSystem/SoundPlayer2";

//Adding else, and call Soundplayer earlier instead of just calling once
//is to allow for the sound to be played before the note is beeing published
//Might be a good thing, as its more responsive, but is it less in sync with multiple windows?
//Didnt seem to be, but need some more performance testing. Challange is the time measurement it self affect time.



export function NoteTrigger(sam: SoundActionMessage, soundPlayer:SoundPlayer2,sendOutput : boolean = true){
    let note = Note.fromMidi(sam.midi);
    if(sendOutput){
        soundPlayer.triggerAttack(note);
        TangentTriggerStore.update((value) => {
            value.midi= sam.midi;
            value.stIndex = sam.stIndex;
            value.systemId = sam.systemId;
            return value;
        });
    }
    else{
        soundPlayer.triggerAttack(note);
    }
}

export function NoteRelease(sam: SoundActionMessage, soundPlayer:SoundPlayer2, sendOutput : boolean = true){
    let note = Note.fromMidi(sam.midi);
    if(sendOutput){
        TangentReleaseStore.update((value)=>{
            value.midi =  sam.midi;
            value.stIndex = sam.stIndex;
            value.systemId = sam.systemId;
            return value;
        })
    }
    soundPlayer.triggerRelease(note);
}

