import type { ChordModel, ChordStruct } from "./SoundModels";
import * as chords from "./Json/chords.json";

// Sharp11 
// s11.chord.identify('C', 'Eb', 'G', 'A'); // Cm6
// s11.chord.create('Am7b5'); // A C Eb G

export class ChordHandler{
}

let naturalNotesSharp= [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#","A", "A#", "B"]; //Dont hardcode
let ChordMatchArray : number[]|null = null;  

export function compareInputWithChordList(gtiOfTangentArray: Array<number | null>) {
    //@ts-ignore
    let chordStructs: ChordStruct = chords.chordStructs;
    let activeChord = "";
    let inputSet = createSortSetArray(gtiOfTangentArray);
    
    // let testChord = ["G", "B", "D"];
    // console.log("detected: ", detect(testChord))
    // let simplyfy = Chord.reduced("Cmaj7");
    // let chromaArray = ["C", "D", "E"].map(Note.chroma)
    // let noteObject = Note.get("C4");
    // console.log('Hardcoded Note.get("C4")', noteObject)
    // let level = noteObject.oct;
    // console.log("level", level)

    if (inputSet) {
      //all intervals starting at zero
      let allIntervals = generateAllIntervalArrays(inputSet);
      // console.log("allIntervals", allIntervals)
      let potentalMatches: ChordModel[];
      switch (inputSet.length) {
        case 2:
          // console.log("case 2")
          potentalMatches = chordStructs.dyads;
        break
          case 3:
          // console.log("case 3")
          potentalMatches = chordStructs.triads;
          break;
        case 4:
          potentalMatches = chordStructs.tetrads;
          // console.log("4", potentalMatches);
          break;
        default:
          return;
      }
      // console.log("after swith potencial mathses", potentalMatches)
      let match = 0;
        if (allIntervals) {
          // console.log("allIntervals should be on screen", allIntervals)
          // console.log("potential matches", potentalMatches)
          for (let i = 0; i < allIntervals.length; i++) {
            for (let p of potentalMatches) {
              let pArray = p.array;
              if (JSON.stringify(allIntervals[i]) == JSON.stringify(pArray)) {
                activeChord =
                  naturalNotesSharp[inputSet[i]] +
                  " " +
                  p.name;
                //  ChordMatchArray = pArray;
                match++;
              }
          }}
          if (match == 0) {
            activeChord = "";
            // ChordMatchArray = null;
          }
        }
    }else { activeChord = "";}
    return activeChord;
  }

  /** This is a description of the createSortSetArray function. */
  function createSortSetArray(gtiOfChordSlotArray: Array<number | null>, start = 0){
    let sections = 12;
    let set = new Set(gtiOfChordSlotArray)
    let clockCoor = Array<number>(); 
    let i = 0;
    set.forEach(numb => {
        if(numb!= null){
            clockCoor[i] = (start + numb);
            i++;
        }    
    });
    //tegner kun hvis det er 3, endre, btw Set er bedre enn array
    if(i>1){
        return clockCoor.sort(function(a, b){return b - a});
    }
    return null;
  }

  export function generateAllIntervalArrays(inputSet: number[]) {
    // console.log("This is the inpup set", inputSet)
      if (inputSet) {
        let allArrayOptions = new Array<Array<number>>();
        let leng = inputSet.length;
        for (let i = 0; i < leng; i++) {
          let increase = (12 - inputSet[i]) % 12;
          let array = new Array<number>();
          for (let j = 0; j < leng; j++) {
            array.push((inputSet[j] + increase) % 12);
          }
          array.sort(function (a, b) {
            return a - b;
          });
          allArrayOptions.push(array);
        }
        return allArrayOptions; 
      }
    }
