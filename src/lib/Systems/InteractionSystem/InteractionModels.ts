import { Note, Interval } from "tonal";

import type { Asteroid } from "../../Systems/Asteroid";



export interface SoundActionMessage{
    systemId: number;
    stIndex: number;
    rSti: number;
    soundType: string;
    midi: number;
    // sendOutput: boolean | undefined;
    // gkSti: number;
}  

export function createSoundMessage(
    systemId: number, 
    stIndex: number, 
    rSti: number, 
    soundType: string, 
    midi: number): SoundActionMessage {
    return {
        systemId: systemId,
        stIndex: stIndex,
        rSti: rSti,
        soundType: soundType,
        midi: midi,
    }
}

export function mapToSoundMessage(asteroid: Asteroid): SoundActionMessage {
    return {
        systemId: asteroid.systemId,
        stIndex: asteroid.tSti,
        rSti: asteroid.rSti,
        soundType: asteroid.SM.soundType,
        midi: asteroid.SM.midiNote,
    };
  }

  export function transposeSoundMessage(sam: SoundActionMessage, transposeSteps: number): SoundActionMessage {
    const transposedMidi = sam.midi + transposeSteps;
    return {
        systemId: sam.systemId,
        stIndex:transposedMidi%12,
        rSti: sam.rSti, 
        soundType: sam.soundType,
        midi: transposedMidi,
    };
}
  