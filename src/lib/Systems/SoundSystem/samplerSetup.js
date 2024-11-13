import * as Tone from 'tone'

//Todo: Lazy load this

export function createPianoSampler() {
	return new Tone.Sampler({
		urls: {
			"G2": new Tone.Buffer("./audio/piano/1.g3.mp3"),
			"A2": new Tone.Buffer("./audio/piano/3.a3.mp3"),
			"C3": new Tone.Buffer('./audio/piano/6.c4.mp3'),
			"D#3": new Tone.Buffer('./audio/piano/9.ds4.mp3'),
			"F#3": new Tone.Buffer('./audio/piano/12.fs4.mp3'),
			"A3": new Tone.Buffer('./audio/piano/15.a4.mp3'),
			"C4": new Tone.Buffer('./audio/piano/18.c5.mp3'),
			"D#4": new Tone.Buffer('./audio/piano/21.ds5.mp3'),
			"F#4": new Tone.Buffer('./audio/piano/24.fs5.mp3'),
			"A4": new Tone.Buffer('./audio/piano/27.a5.mp3'),
			"C5": new Tone.Buffer('./audio/piano/29.c6.mp3'),
			"D#5": new Tone.Buffer('./audio/piano/30.ds6.mp3'),
			"F#5": new Tone.Buffer('./audio/piano/31.fs6.mp3'),
			"A5": new Tone.Buffer('./audio/piano/32.a6.mp3'),
		},
		release: 2,
	})
}

export function createDreamyPianoSampler() {
	return new Tone.Sampler({
		urls: {
			"G2": new Tone.Buffer("./audio/dreamyPiano/1.g3.mp3"),
			"A2": new Tone.Buffer("./audio/dreamyPiano/3.a3.mp3"),
			"C3": new Tone.Buffer('./audio/dreamyPiano/6.c4.mp3'),
			"D#3": new Tone.Buffer('./audio/dreamyPiano/9.ds4.mp3'),
			"F#3": new Tone.Buffer('./audio/dreamyPiano/12.fs4.mp3'),
			"A3": new Tone.Buffer('./audio/dreamyPiano/15.a4.mp3'),
			"C4": new Tone.Buffer('./audio/dreamyPiano/18.c5.mp3'),
			"D#4": new Tone.Buffer('./audio/dreamyPiano/21.ds5.mp3'),
			"F#4": new Tone.Buffer('./audio/dreamyPiano/24.fs5.mp3'),
			"A4": new Tone.Buffer('./audio/dreamyPiano/27.a5.mp3'),
			"C5": new Tone.Buffer('./audio/dreamyPiano/29.c6.mp3'),
			"D#5": new Tone.Buffer('./audio/dreamyPiano/30.ds6.mp3'),
			"F#5": new Tone.Buffer('./audio/dreamyPiano/33.fs6.mp3'),
			"A5": new Tone.Buffer('./audio/dreamyPiano/36.a6.mp3'),
		},
		release: 2,
	})
}

export function createViolinSampler() {
	return new Tone.Sampler({
		urls: {
			"G2": new Tone.Buffer("./audio/violin/1.g3.mp3"),
			"A2": new Tone.Buffer("./audio/violin/3.a3.mp3"),
			"C3": new Tone.Buffer('./audio/violin/6.c4.mp3'),
			"D#3": new Tone.Buffer('./audio/violin/9.ds4.mp3'),
			"F#3": new Tone.Buffer('./audio/violin/12.fs4.mp3'),
			"A3": new Tone.Buffer('./audio/violin/15.a4.mp3'),
			"C4": new Tone.Buffer('./audio/violin/18.c5.mp3'),
			"D#4": new Tone.Buffer('./audio/violin/21.ds5.mp3'),
			"F#4": new Tone.Buffer('./audio/violin/24.fs5.mp3'),
			"A4": new Tone.Buffer('./audio/violin/27.a5.mp3'),
			"C5": new Tone.Buffer('./audio/violin/29.c6.mp3'),
			"D#5": new Tone.Buffer('./audio/violin/30.ds6.mp3'),
			"F#5": new Tone.Buffer('./audio/violin/33.fs6.mp3'),
			"A5": new Tone.Buffer('./audio/violin/36.a6.mp3'),
		},
		release: 3,
		attack:1.5,
	})
}

// const a6G= new Tone.Buffer('./audio/guitar/32.a6.mp3');

export function createGuitarSampler() {
	return new Tone.Sampler({
		urls: {
			"G2":  new Tone.Buffer("./audio/guitar/1.g3.mp3"),
			"A2": new Tone.Buffer("./audio/guitar/3.a3.mp3"),
			"C3": new Tone.Buffer('./audio/guitar/6.c4.mp3'),
			"D#3": new Tone.Buffer('./audio/guitar/9.ds4.mp3'),
			"F#3": new Tone.Buffer('./audio/guitar/12.fs4.mp3'),
			"A3": new Tone.Buffer('./audio/guitar/15.a4.mp3'),
			"C4": new Tone.Buffer('./audio/guitar/18.c5.mp3'),
			"D#4": new Tone.Buffer('./audio/guitar/21.ds5.mp3'),
			"F#4": new Tone.Buffer('./audio/guitar/24.fs5.mp3'),
			"A4": new Tone.Buffer('./audio/guitar/27.a5.mp3'),
			"C5": new Tone.Buffer('./audio/guitar/29.c6.mp3'),
			"D#5": new Tone.Buffer('./audio/guitar/30.ds6.mp3'),
			"F#5": new Tone.Buffer('./audio/guitar/31.fs6.mp3'),
			// "A5": a6G,
		},
		release: 8,
	});
}

export function createSpacePadSampler() {
	return new Tone.Sampler({
		urls: {
			"C3": new Tone.Buffer('./audio/SpacePad/sp0.c3.mp3'),
			"D#3": new Tone.Buffer('./audio/SpacePad/sp3.ds3.mp3'),
			"F#3": new Tone.Buffer('./audio/SpacePad/sp6.fs3.mp3'),
			"A3": new Tone.Buffer('./audio/SpacePad/sp9.a3.mp3'),
			"C4": new Tone.Buffer('./audio/SpacePad/sp12.c4.mp3'),
			"D#4": new Tone.Buffer('./audio/SpacePad/sp15.ds4.mp3'),
			"F#4": new Tone.Buffer('./audio/SpacePad/sp18.fs4.mp3'),
			"A4": new Tone.Buffer('./audio/SpacePad/sp21.a4.mp3'),
			"C5": new Tone.Buffer('./audio/SpacePad/sp24.c5.mp3'),
			"D#5": new Tone.Buffer('./audio/SpacePad/sp27.ds5.mp3'),
			"F#5": new Tone.Buffer('./audio/SpacePad/sp30.fs5.mp3'),
			"A5": new Tone.Buffer('./audio/SpacePad/sp33.a5.mp3'),
			"C6": new Tone.Buffer('./audio/SpacePad/sp36.c6.mp3'),
		},
		release: 3,
	});
}


export function createPanFluteSampler() {
	return new Tone.Sampler({
		urls: {
			"C3": new Tone.Buffer('./audio/pan-flute/C3.mp3'),
			"D#3": new Tone.Buffer('./audio/pan-flute/Ds3.mp3'),
			"F#3": new Tone.Buffer('./audio/pan-flute/Fs3.mp3'),
			"A3": new Tone.Buffer('./audio/pan-flute/A3.mp3'),
			"C4": new Tone.Buffer('./audio/pan-flute/C4.mp3'),
			"D#4": new Tone.Buffer('./audio/pan-flute/Ds4.mp3'),
			"F#4": new Tone.Buffer('./audio/pan-flute/Fs4.mp3'),
			"A4": new Tone.Buffer('./audio/pan-flute/A4.mp3'),
			"C5": new Tone.Buffer('./audio/pan-flute/C5.mp3'),
			"D#5": new Tone.Buffer('./audio/pan-flute/Ds5.mp3'),
			"F#5": new Tone.Buffer('./audio/pan-flute/Fs5.mp3'),
			"A5": new Tone.Buffer('./audio/pan-flute/A5.mp3'),
			"C6": new Tone.Buffer('./audio/pan-flute/C6.mp3'),
			"D#6": new Tone.Buffer('./audio/pan-flute/Ds6.mp3'),
			"F#6": new Tone.Buffer('./audio/pan-flute/Fs6.mp3'),
			"A6": new Tone.Buffer('./audio/pan-flute/A6.mp3'),
		},
		release: 3,
	});
}

export function createSinusSynth() {
	let synth = new Tone.PolySynth();
	// synth.set({ detune: -1200 });
	return synth;
	
}