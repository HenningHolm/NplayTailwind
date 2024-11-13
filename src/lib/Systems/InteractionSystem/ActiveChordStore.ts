import { writable } from "svelte/store";
import { TangentReleaseStore, TangentTriggerStore } from "./InteractionStore";
import { Chord, Note } from "tonal";

// One might think that here we should use derived store, but as both the trigger and release will be read when one
// action is published. It will result in release beeing registered without actually beeing released and vice versa.

export const ActiveChordStore = writable('');
const activeMidiSet = new Set();

TangentTriggerStore.subscribe(({ midi }) => {
  if (midi) {
    activeMidiSet.add(midi); 
    updateChord();
  }
});

TangentReleaseStore.subscribe(({ midi }) => {
  if (midi && activeMidiSet.has(midi)) {
    activeMidiSet.delete(midi); 
    updateChord();
  }
});

function updateChord() {
  let midiArray = Array.from(activeMidiSet) as number[];
  // midiArray = midiArray.sort((a, b) => a - b);
  const detectedChords = Chord.detect(midiArray.map(Note.fromMidi));
  // console.log("detectedChords", detectedChords, )
  const chosenChord = detectedChords.length ? detectedChords[0] : '';
  // console.log('chosenChord', chosenChord);
  ActiveChordStore.set(chosenChord);
}


//------------------------------------------------------------------//

// export const ActiveChordStoreHeader = writable('');
// const activeNotes2 = new Set();

// TangentTriggerStore.subscribe(({ note }) => {
//   if (note) {
//     activeNotes2.add(note); 
//     updateChordHeader();
//   }
// });

// TangentReleaseStore.subscribe(({ note }) => {
//   if (note && activeNotes2.has(Note.simplify(note))) {
//     activeNotes2.delete(note); 
//     updateChordHeader();
//   }
// });