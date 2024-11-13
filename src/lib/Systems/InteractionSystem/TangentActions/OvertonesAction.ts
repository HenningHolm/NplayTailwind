import { Note } from "tonal";
import { TangentReleaseStore, TangentTriggerStore } from "../InteractionStore";
import { SoundPlayer } from "../../SoundSystem/SoundPlayer";
import { TouchAction } from "../../SettingsSystem/GlobalSettings";
import type { SoundActionMessage } from "../InteractionModels";
import type { SoundPlayer2 } from "src/Systems/SoundSystem/SoundPlayer2";


//The shouldExecute, is used as I want there to be a little bit of timeout,
//so that the user can hear the different overtones, but I also want the user to be able 
//to stop the overtones by releasing the key. But as the sheduled timeouts are not
//cancelable, I have to use a boolean to check if the user has released the key. 
//and if the user clicks the key again, the boolean is set to true again, but the
//previous timeout will not be executed, as active is set to false.

let shouldExecute;

export function OvertoneTrigger(tsm: SoundActionMessage, soundPlayer: SoundPlayer2, touchAction: TouchAction){
    let active = true;
    shouldExecute = true;
    let midiArray
    switch(touchAction){
        case TouchAction.Overtones:
            midiArray = getOvertones(tsm.midi);
            break;
        case TouchAction.OvertonesPlus:
            midiArray = getOvertonesPluss(tsm.midi);
            break;
        case TouchAction.Undertones:
            midiArray = getUndertones(tsm.midi);
            break;
    }
    midiArray.forEach((midi,i) => {
        setTimeout(() => { 
            active = (shouldExecute && active);
            if(active){
                TangentTriggerStore.update(value=>{
                    value.intialChordNote = i == 0 ? true : false;
                    value.midi = midi;
                    value.stIndex = midi%12;
                    return value;
                });
                soundPlayer.triggerAttack(Note.fromMidi(midi));
            }}, 300*i);
        })
    }
    
export function OvertoneRelease(sam : SoundActionMessage, soundPlayer: SoundPlayer2, touchAction : TouchAction){ 

    let toneArray
    switch(touchAction){
        case TouchAction.Overtones:
            toneArray = getOvertones(sam.midi);
            break;
        case TouchAction.OvertonesPlus:
            toneArray = getOvertonesPluss(sam.midi);
            break;
        case TouchAction.Undertones:
            toneArray = getUndertones(sam.midi);
            break;
    }
    shouldExecute = false;
    toneArray.forEach((midi,i) => {
        TangentReleaseStore.update(value=>{
            value.midi = midi;
            value.stIndex = midi%12;
            return value;
        });
        soundPlayer.triggerRelease(Note.fromMidi(midi));
    })
}

function getOvertones(root:number){
    const firstOvertone =  root + 12;
    const secondOvertone = root + 19;
    const thirdOvertone = root + 24;
    const fourthOvertone = root + 28;
    const fifthOvertone = root + 31;
    const sixthOvertone = root + 36;
    return [root, firstOvertone, secondOvertone, thirdOvertone, fourthOvertone, fifthOvertone, sixthOvertone];
}

function getOvertonesPluss(root:number){
    const firstE = root + 4;
    const firstG = root + 7;
    const firstOvertone =  root + 12;
    const secondE = root + 16;
    const secondOvertone = root + 19;
    const thirdOvertone = root + 24;
    const fourthOvertone = root + 28;
    const fifthOvertone = root + 31;
    const sixthOvertone = root + 34;
    return [root, firstE, firstG, firstOvertone,secondE, secondOvertone, thirdOvertone, fourthOvertone, fifthOvertone, sixthOvertone];
}

function getUndertones(root) {
    const firstUndertone = root - 12;  
    const secondUndertone = root - 19; 
    const thirdUndertone = root - 24;  
    const fourthUndertone = root - 28;
    const fifthUndertone = root - 31; 
    const sixthUndertone = root - 36; 
    return [root, firstUndertone, secondUndertone, thirdUndertone, fourthUndertone, fifthUndertone, sixthUndertone];
}