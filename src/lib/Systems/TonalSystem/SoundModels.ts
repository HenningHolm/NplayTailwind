export interface SoundData{
    soundName: string;
    soundIndex: number;
    noteClass: string;
    noteLevel: number;
    noteDivision : number;
    frequency: number;
    shapeCollection: Array<number>;
}

export interface  ChordStruct {
    dyads: ChordModel[]
    triads: ChordModel[]
    tetrads:ChordModel[]
}
export interface ChordModel {
    name: string;
    short: string;
    signature: string;
    array: number[];
}


export interface NoteStruct {
    noteIndex: number;
    noteDivision: number;
    noteClass: string;
    noteLevel: number,
    frequency: number,
    shapeCollection: any
}