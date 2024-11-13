import { writable, type Writable } from "svelte/store";
import * as Tone from 'tone'

export enum ScaleSystem {
    AllMajor = 0,
    AllMinor = 1,
    DiatoncScale = 2,
  }


export enum TouchAction {
    Notes = 0,
    Chord = 1,
    ChordFI = 2,
    ChordSI = 3,
    // ChordsPenatonic = 4,
    Overtones = 4,
    OvertonesPlus = 5,
    Undertones = 6,
    Arpeggio = 7
}

export enum Gender {
    StraightMan = "Straight Man",
    StraightWoman = "Straight Woman",
    GayMan = "Gay Man",
    GayWoman = "Gay Woman",
    Other = "Other",
}

export const emojiList = {
    "Straight Man":["🧝‍♂️","","👨‍🌾","","👩‍🌾","🤴","","👸","","👰","","👼"], 
    "Straight Woman":["🧝‍♀️","","👨‍🌾","","👩‍🌾","🤴","","👸","","🤵","","👼"], 
    "Gay Man":["🧝‍♂️","","👨‍🌾","","👩‍🌾","🤴","","👸","","🤵","","👼"],
    "Gay Woman":["🧝‍♀️","","👨‍🌾","","👩‍🌾","🤴","","👸","","👰","","👼"], 
    "Other":["🧝","","👨‍🌾","","👩‍🌾","🤴","","👸","","🦸","","👼"]
};

//Consider making a custom store for this. 
//Maybe TouchAction should also have a TouchGroup 
//--------------------------------------------------------------// 
//--------------------------------------------------------------// 
class StoreGlobalSettings{
    constructor( 
        public gkSti: Writable<number> = writable(0),
        public touchAction: Writable<TouchAction> = writable(TouchAction.Notes),
        public scaleSystem: Writable<ScaleSystem> = writable(ScaleSystem.DiatoncScale),
        public gender: Writable<Gender> = writable(Gender.StraightMan),
        public noteMemory: Writable<boolean> = writable(false),
        ) { 
    }
  }



export const globalSettingsStore = new StoreGlobalSettings();

export function subscribeGlobalKey(reRender:any){
    return globalSettingsStore.gkSti.subscribe((value) => {
        reRender(value);
    })
} 

export const CustomSettingsStore = writable({} as CustomSettings);

export interface CustomSettings {
    systemEvent: string,
    intrument: string
}


//--------------------------------------------------------------// 
//--------------------------------------------------------------// 

//Move to MusicSystem?
class RythmStore {
    constructor(
        public rythmType: Writable<{lengthMmSec : number, interval:number}> = writable({lengthMmSec:500, interval:-1}),
        public rythm: Writable<boolean> = writable(false),
    ) {}
}
export const rythmStore = new RythmStore();

export const BpmStore: Writable<number> = createBpmStore(105);

function createBpmStore(startingBpm: number) {
    const { subscribe, set, update } = writable(startingBpm);
    Tone.Transport.bpm.value = startingBpm;
    function safeSet(value) {
        Tone.Transport.bpm.value = value;
        set(value);
    }
    return {
        subscribe,
        set: safeSet,
        update
    };
}


//--------------------------------------------------------------// 
//--------------------------------------------------------------// 