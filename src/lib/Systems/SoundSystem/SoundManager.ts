import type { SoundType } from "../SettingsSystem/LocalSettingsTypes";

export class SoundManager{
    public soundId: string; // Notename (Sharp) and level, ex: "C3"
    public soundIdF: string; // Notename (Flat) and level, ex: "C3"
    public soundQuality:string; // should be determined by the soundManager/Scale
    public soundType:SoundType; //instrument
    public soundBy: string; 
    public midiNote: number;
    public freqency:string;
    public relativeFreqency: string;
    public romanNumeral: string;
}