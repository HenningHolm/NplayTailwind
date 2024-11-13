import type { Gender } from "./GlobalSettings";

export enum ShowColors {
    Off = "Off",
    On = "On",
    OnPlay = "On Play",
  }

  //Static might be called "C-Lock"
  export enum HighlightScale {
    Static = "C/Am",
    Off = "Off",
    Dynamic = "Dynamic",
  }

  export enum TransposeType {
    Input = "Input", 
    Output = "Output",
    Both = "Both",
  }

  export enum NoteReflection {
    AllGeneration = "All Generation",
    OctaveSpecific = "Octave Specific",
    None = "Off",
  }

  export enum ReduceFrom {
    FromHigher = "From Higher",
    FromLower = "From Lower",
  }

  export enum SoundBy {
    Click = "Click", 
    External = "External",
    Both = "Both",
  }

  export enum ShowNumbers {
    None = "None",
    MIDI = "MIDI",
    Frequency = "Frequency",
    RelativeFrequency = "Relative Frequency",
    IndexUp = "Index Up",
    IndexDown = "Index Down",
    IndexDual = "Index Dual",
    RomanNumeral = "Roman Numeral",
    WaveLength = "Wave Length",
  }

  export enum SoundType {
    Piano = "Piano",
    DreamyPiano = "Dreamy Piano",
    Guitar = "Guitar",
    Violin = "Violin",
    PanFlute = "Pan Flute",
    SpaceSynth = "Space Synth",
    Sinus = "Sinus", // rename to custome maybe?
  }

export interface SoundSettings {
    soundType: SoundType, 
    volume: number,
    startNote: number, //wrapDuoDesimal
    transpose: number, //duoDesumal
    transposeType: string,
    sustain: false, //guitar true
    soundBy: string,
}

/**
 * @param highlightScale - Black color for notes outside scale
 * @param highlightOctave - Same colors for all notes in one octave
 * @param defaultScale - Follow global rules for scale
 */
// /infosettings
export interface DisplaySettings {
    background: number,
    highlightScale: HighlightScale,
    showNotes: boolean,
    showEmojis: boolean,
    showNumbers: ShowNumbers, //enum?
    showColors: string, //enum?
    highlightOctave: boolean,
    defaultScale: boolean, 
  }
  
  /**
   * @param startNote - Start note for the collection
   * @param startLevel - Start level/octave for the collection
   * @param quantity - Length of asteriod collection
   * @param equalShape - Equal shape for all notes, make enum?
   * @param gender - Users gender
   */
  export interface BuildSettings {
    startNote: number, 
    startLevel: number,
    quantity: number, 
    equalShape: string, 
    gender: Gender | undefined
  }
  
  /**
   * @param logaritmic - Logaritmic presentation
   * @param shape - Shape of the asteroid
   * @param sizeBy - WaveLength/Freqenzy/Equal
   * @param direction - Clockwise or counter clockwise
   * @param drawTime - Order of drawing
   * @param outwards - Direction frequency value (vs waveLength)
   */
  
  export interface GeometrySettings{
    logaritmic: boolean,
    shape: string,
    sizeBy: number,
    direction: number
    drawTime: number;
    outwards: boolean;
  }
  
  export interface CircleSettings{
    showElements: 0,
    shapeRadius: number,
    systemRadius: number,
    radialSpacing: number,
    equalSize: boolean // geometrySettings?
  }

  interface TuningSettings{
    Tuning: string; //classic, equal, custom, (pythagoras.. global?)
    Capo: number;
  }
  
  export interface TDsettings {SphereGuiSettings: SphereGuiSettings}
  
  export interface SphereGuiSettings {
    positionX : number,
    positionY: number, 
    positionZ: number,
    transpose: number,
    octaves: number,
}