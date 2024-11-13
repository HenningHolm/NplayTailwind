import { ScaleSystem, TouchAction, globalSettingsStore } from "../../SettingsSystem/GlobalSettings";
import { SoundPlayer } from "../../SoundSystem/SoundPlayer";
import { get } from "svelte/store";
import { Chord, Note } from "tonal";
import { TangentReleaseStore, TangentTriggerStore } from "../InteractionStore";
import type { SoundActionMessage } from "../InteractionModels";
import type { SoundPlayer2 } from "src/Systems/SoundSystem/SoundPlayer2";
import { tick } from "svelte";


export function ChordTrigger(sam : SoundActionMessage, soundPlayer: SoundPlayer2,touchAction : TouchAction){
    const scaleSystem = get(globalSettingsStore.scaleSystem);
    const quality = getRelativChordQuality(sam.rSti, scaleSystem); 
    const chord = Chord.getChord(quality,Note.fromMidi(sam.midi));
    chord.notes = chord.notes.map((note) => Note.simplify(note));
    //TODO: Fix #/b
    if (touchAction == TouchAction.ChordFI){
        const M3 = chord.notes[1];
        const P5 = chord.notes[2];
        //First Inversion, get int in string M3 and increase by 1;
        chord.notes[1] = M3.slice(0,M3.length-1)+(parseInt(M3[M3.length-1])-1)
        chord.notes[2] = P5.slice(0,P5.length-1)+(parseInt(P5[P5.length-1])-1)
    }
    else if (touchAction == TouchAction.ChordSI){
        const P5 = chord.notes[2];
        //Second Inversion, get int in string M3 and increase by 1;
        chord.notes[2] = P5.slice(0,P5.length-1)+(parseInt(P5[P5.length-1])-1)
    } 
    // chord.notes.unshift(Note.transpose(chord.notes[0], "-8P")); Append

    chord.notes.forEach((notes,i) => {
        // console.log("foreach notes", notes, "i", i);
        // console.log("i == 0", i == 0)
        tick().then(() => {
        TangentTriggerStore.update(value=>{
            value.intialChordNote = i == 0 ? true : false;
            value.midi = Note.midi(notes);
            value.stIndex = value.midi%12;
            value.systemId = sam.systemId;
            // console.log("Triggerstore return value", value);
            return value;
        });
    })})
    soundPlayer.triggerAttack(chord.notes)
}

    // rewrite foreach using for loop

    // for(let i = 0; i < chord.notes.length; i++){
    //     console.log("forloop notes", chord.notes[i], "i", i);
    //     console.log("i == 0", i == 0)
    //     TangentTriggerStore.update(value=>{
    //         value.intialChordNote = i == 0 ? true : false;
    //         value.midi = Note.midi(chord.notes[i]);
    //         value.stIndex = value.midi%12;
    //         value.systemId = sam.systemId;
    //         console.log("Triggerstore return value", value);
    //         return value;
    //     });
    // }
    //     
    // }

export function ChordRelease(sam : SoundActionMessage, soundPlayer: SoundPlayer2,touchAction : TouchAction){
    const scaleSystem = get(globalSettingsStore.scaleSystem);
    const quality = getRelativChordQuality(sam.rSti, scaleSystem); 
    const chord = Chord.getChord(quality,Note.fromMidi(sam.midi));  
    chord.notes = chord.notes.map((note) => Note.simplify(note));
    if (touchAction == TouchAction.ChordFI){
        const M3 = chord.notes[1];
        const P5 = chord.notes[2];
        // get int in string M3 and increase by 1;
        chord.notes[1] = M3.slice(0,M3.length-1)+(parseInt(M3[M3.length-1])-1)
        chord.notes[2] = P5.slice(0,P5.length-1)+(parseInt(P5[P5.length-1])-1)
    }
    else if (touchAction == TouchAction.ChordSI){
        const P5 = chord.notes[2];
        // get int in string M3 and increase by 1;
        chord.notes[2] = P5.slice(0,P5.length-1)+(parseInt(P5[P5.length-1])-1)
    }
    // chord.notes.unshift(Note.transpose(chord.notes[0], "-8P"));
    chord.notes.forEach(notes => {
        tick().then(() => {
        TangentReleaseStore.update(value=>{
            //reset intialChordNote?
            value.midi= Note.midi(notes);
            value.systemId = sam.systemId;
            // value.stIndex = this.tSti; why not working?
            value.stIndex = value.midi%12;
            return value;
        })
    })})
        soundPlayer.triggerRelease(chord.notes)
}


// to be removed
// let scale = Scale.get(this.soundId + " major").notes;
// let octaveZero = Note.octave(this.soundId);


export function getRelativChordQuality(rSti, scaleSystem) {
    if (scaleSystem == ScaleSystem.AllMajor) {
        return "";
    } else if (scaleSystem == ScaleSystem.AllMinor) {
        return "m";
    } else if (scaleSystem == ScaleSystem.DiatoncScale) {
        if (rSti == 2 || rSti == 4 || rSti == 9) {
            return "m";
        }
        if (rSti == 11) {
            return "dim";
        }
        return "";
    }
}