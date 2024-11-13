import * as Tone from 'tone'
import { SoundType } from '../SettingsSystem/LocalSettingsTypes';
import { createDreamyPianoSampler, createGuitarSampler, createSpacePadSampler, createPianoSampler, createSinusSynth, createViolinSampler, createPanFluteSampler } from './samplerSetup';

// Consider adding two more channels for sound effects and background music
// https://tonejs.github.io/examples/#multiChannelSynth 

export class SoundPlayer2 {
    samplePlayer: Tone.Sampler|Tone.PolySynth ;
    gain: Tone.Gain;
	// volume: Tone.Volume;
    selectedSoundType: SoundType;
    showSoundMessage = false;

    constructor(selectedInstrument: SoundType = SoundType.Piano){
        this.selectedSoundType = selectedInstrument;
		this.gain = new Tone.Gain(1).toDestination();
		// this.gain = new Tone.Volume(-10).toDestination();
		this.setSampler(this.selectedSoundType)
    }

    setSampler(soundType: SoundType){
        switch(soundType){
            case SoundType.Piano:
                this.samplePlayer = createPianoSampler().connect(this.gain);
                break;
            case SoundType.DreamyPiano:
                this.samplePlayer = createDreamyPianoSampler().connect(this.gain);
                break;
            case SoundType.Violin:
                this.samplePlayer = createViolinSampler().connect(this.gain);
                break;
            case SoundType.Guitar:
                this.samplePlayer = createGuitarSampler().connect(this.gain);
                break;
			case SoundType.SpaceSynth:
				this.samplePlayer = createSpacePadSampler().connect(this.gain);
				break;
			case SoundType.PanFlute:
				this.samplePlayer = createPanFluteSampler().connect(this.gain);
				break;
			case SoundType.Sinus:
				this.samplePlayer = createSinusSynth().connect(this.gain);
				break;
            default:
                this.samplePlayer = createPianoSampler().connect(this.gain);
                break;
        }
    }

	triggerAttack(note) { 
		// console.log("triggerAttack", note);
		if (!this.samplePlayer) return;
		try {
            this.samplePlayer.triggerAttack(note, Tone.context.currentTime);    
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);
		}
	}

	triggerRelease(note) {
		console.log("tekease", note, this.samplePlayer)
		if (!this.samplePlayer) return;
		try {
            this.samplePlayer.triggerRelease(note); 
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);
		}
	}

	triggerAttackRelease(note, sec, time?) {
		if (!this.samplePlayer) return;
		try {
			this.samplePlayer.triggerAttackRelease(note, sec, time);
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);
		}
	}
}