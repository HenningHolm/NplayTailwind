import { Note, ScaleType } from "tonal";
import type { BuildSettings, SoundSettings } from "src/Systems/SettingsSystem/LocalSettingsTypes";
import type { Asteroid } from "../Asteroid";

/**
 * Not affected by GKsti(?)
 * @param soundSettings.startLevel Level of start note. Ex: gti :0, startLevel: 2 => C2
 * @param soundSettings.transpose Transpose output
 * @param tangents Collection of sound shapes
 * @param secondariesStartIndexAdjust Note adjustment, string instruments with multiple start notes use this
 */
export function buildAndWrapDuoDesimalSound(tangents: Array<Asteroid>, gkSti: number, soundSettings:SoundSettings, buildSettings:BuildSettings, secondariesStartIndexAdjust = 0) { 
    console.log("gkSti", gkSti)
    let noteSequens = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#','A', 'A#', 'B']
    let noteSequensF = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab','A', 'Bb', 'B']
    let romanSequens = ['I','','II','', 'III', 'IV','', 'V','','VI','','VII'];
    let startNoteIndex =  Number(soundSettings.transpose)+secondariesStartIndexAdjust;
    let noteLevel = buildSettings.startLevel + Math.floor((startNoteIndex)/12) ;
    if (startNoteIndex != -1) {
        for (let i = 0; i < tangents.length; i++) {
            let currentNoteIndex = startNoteIndex + i;
            let sti = currentNoteIndex%12;
            let note = noteSequens[sti];
            tangents[i].tSti = sti;
            tangents[i].rSti = (12+sti-gkSti) % 12; 
            tangents[i].SM.midiNote =  Note.midi(note + noteLevel);
            tangents[i].SM.freqency = Note.freq(note + noteLevel).toFixed(1);
            tangents[i].SM.relativeFreqency = (100*2**(i/12)).toFixed(1)
            tangents[i].SM.romanNumeral = romanSequens[tangents[i].rSti];
            tangents[i].SM.soundId = note + noteLevel;
            tangents[i].SM.soundIdF = noteSequensF[sti] + noteLevel; //Do better
            tangents[i].SM.soundType = soundSettings.soundType; //maybe make this Enum
            tangents[i].SM.soundBy = soundSettings.soundBy;
            if (note == 'B') {noteLevel++}
        }
    }
return tangents;
}
//-----------------------------------------------------------------------------//
//-----------------------------------------------------------------------------//
 // Range.chromatic(["C2", "C3"], { sharps: true });
 // console.log("ScaleType.names()", ScaleType.names())

export function getScaleTrueFalseArray(scaleType : string){
    return Array.from(ScaleType.get(scaleType).chroma).map(Number);
}
//how many white keys on piano, starting in c(?)
export function getNumberInScaleByLength(length: number){
    let inScaleLength = 0;
    for (let index = 0; index < length; index++) {
        let array = getScaleTrueFalseArray("major");
        if(array[index%12] == 1){
            inScaleLength++
        }
    }    
    return inScaleLength;
}
