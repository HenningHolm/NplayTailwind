import { get } from "svelte/store";
import type { SoundActionMessage } from "../InteractionModels";
import { TangentReleaseStore, TangentTriggerStore } from "../InteractionStore";
import { globalSettingsStore } from "../../SettingsSystem/GlobalSettings";
import { getRelativChordQuality } from "./ChordAction";
import { Chord, Note } from "tonal";
import { tick } from "svelte";

//Consider expanding SoundActionMessage reduce to much realtime functionCalls affecting performance

export function ArpeggioTrigger(sam : SoundActionMessage){
    const scaleSystem = get(globalSettingsStore.scaleSystem);
    const quality = getRelativChordQuality(sam.rSti, scaleSystem); 
    const chord = Chord.getChord(quality,Note.fromMidi(sam.midi)); 
    chord.notes = chord.notes.map((note) => Note.simplify(note));
    // chord.notes.unshift(Note.transpose(chord.notes[0], "-8P"));
    chord.notes.forEach((notes,i) => {
        tick().then(() => {
        TangentTriggerStore.update(value=>{
            value.intialChordNote = i == 0 ? true : false;
            value.midi = Note.midi(notes);
            value.stIndex = value.midi%12;
            value.systemId = sam.systemId;
            return value;
        });
    })});
}

export function ArpeggioRelease(sam: SoundActionMessage){
    const scaleSystem = get(globalSettingsStore.scaleSystem);
    const quality = getRelativChordQuality(sam.rSti, scaleSystem); 
    const chord = Chord.getChord(quality,Note.fromMidi(sam.midi)); 
    chord.notes = chord.notes.map((note) => Note.simplify(note));
    // chord.notes.unshift(Note.transpose(chord.notes[0], "-8P"));
    chord.notes.forEach((notes,i) => {
        tick().then(() => {
        TangentReleaseStore.update(value=>{
            value.midi = Note.midi(notes);
            value.stIndex = value.midi%12;
            value.systemId = sam.systemId;
            return value;
        });
    })});
}










// class Arpeggio{
//     arpeggioMajor : number[];
//     arpeggioMinor : number[];
//     arpeggioDim : number[];
//     getArray(quality:string|null){
//         switch (quality) {
//             case "m":
//                 return this.arpeggioMinor;
//             case "dim": 
//                 return this.arpeggioDim;
//             default:
//                 return this.arpeggioMajor;
//         }
//     }
// }

// const ArpeggioX = new Arpeggio();
// ArpeggioX.arpeggioMajor = [0, 9, 4, 7, 16, 12, 4, 7];
// ArpeggioX.arpeggioMinor = [0, 7, 10, 7, 5, 7, 12, 7];
// ArpeggioX.arpeggioDim = [0, 6, 12, 6, 15, 6, 12, 6];

// const ArpeggioY = new Arpeggio();
// ArpeggioY.arpeggioMajor = [0, 7, 12, 7, 16, 7, 12, 7];
// ArpeggioY.arpeggioMinor = [0, 7, 12, 7, 15, 7, 12, 7];
// ArpeggioY.arpeggioDim = [0, 6, 12, 6, 15, 6, 12, 6];

// const ArpeggioZ = new Arpeggio();
// ArpeggioZ.arpeggioMajor = [0, 7, 4, 7, 16, 7, 12, 7];
// ArpeggioZ.arpeggioMinor = [0, 7, 3, 7, 5, 7, 12, 7];
// ArpeggioZ.arpeggioDim = [0, 6, 12, 6, 15, 6, 12, 6];

