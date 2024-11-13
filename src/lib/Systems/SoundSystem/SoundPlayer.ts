import { createDreamyPianoSampler, createGuitarSampler, createSpacePadSampler, createPianoSampler, createSinusSynth, createViolinSampler, createPanFluteSampler } from "./samplerSetup";
import * as Tone from 'tone'
import { rythmStore } from "../SettingsSystem/GlobalSettings";
import { SoundType, type SoundSettings } from "../SettingsSystem/LocalSettingsTypes";
import { note } from "tonal";

//SoundPlayer Store
//Todo: Refactor code duplication, Maybe load only one instrument at a time
//One soundplayer per "app"
export class SoundPlayer {
	static instance: SoundPlayer;

	private sinusSynth: Tone.Synth;
	private sinusGain: Tone.Gain;

	private pianoSampler: Tone.Sampler; 
	private pianoGain: Tone.Gain;

	public dreamyPianoSampler: Tone.Sampler;
	private dreamyPianoGain: Tone.Gain;

	private violinSampler: Tone.Sampler;
	private violinGain: Tone.Gain;

	private panFluteSampler: Tone.Sampler;
	private panFluteGain: Tone.Gain;

	private spaceSynthSampler: Tone.Sampler;
	private spaceSynthGain: Tone.Gain;
	
	private guitarSampler: Tone.Sampler;
	private guitarGain: Tone.Gain;

	showSoundMessage = false;
    rythm = false;

	constructor() {
		SoundPlayer.instance = this;
		this.sinusSynth = createSinusSynth().toDestination();
		this.sinusGain = new Tone.Gain(1).toDestination();	

		// let compressor = new Tone.Compressor(-30, 1.2).toDestination();
		// this.pianoGain = new Tone.Gain(1.2).connect(compressor);
		this.pianoGain = new Tone.Gain(1).toDestination();
		this.pianoSampler = createPianoSampler().connect(this.pianoGain);

		this.dreamyPianoGain = new Tone.Gain(0.8).toDestination();
		this.dreamyPianoSampler = createDreamyPianoSampler().connect(this.dreamyPianoGain);
		
		this.violinGain = new Tone.Gain(0.8).toDestination();
		this.violinSampler = createViolinSampler().connect(this.violinGain);

		this.guitarGain = new Tone.Gain(2.4).toDestination();
		this.guitarSampler = createGuitarSampler().connect(this.guitarGain);
		
		this.spaceSynthGain = new Tone.Gain(4).toDestination();
		this.spaceSynthSampler = createSpacePadSampler().connect(this.spaceSynthGain);

		this.panFluteGain = new Tone.Gain(1).toDestination();
		this.panFluteSampler = createPanFluteSampler().connect(this.panFluteGain);
		
        rythmStore.rythm.subscribe((value) => {
            this.rythm = value;
        })
		Tone.start();
    }  

	attackNotes( intrument: string, note: string | string[], time?) {

		switch (intrument) {
			case SoundType.Guitar:
				this.attackGuitarNote(note)
				break;
			case SoundType.Piano:
				this.attackPianoNote(note, time)
				break;
			case SoundType.DreamyPiano:
				this.attackDreamyPianoNote(note, time)
				break;
			case SoundType.SpaceSynth:
				this.attackSpaceSynthNote(note)
				break;
			case SoundType.Violin:
				this.attackViolinNote(note)
				break;
			case SoundType.PanFlute:
				this.attackPanFluteNote(note)
				break;
			case SoundType.Sinus:
				this.attackSinusNote(note)
				break;
			default:
				break;
		    }
        
	}

	releaseNotes( intrument: string, note: string| string[], time?) {
		switch (intrument) {
			case SoundType.Guitar:
				this.realeaseGuitarNote(note)
				break;
			case SoundType.Piano:
				this.releasePianoNote(note, time)
				break;
			case SoundType.DreamyPiano:
				this.releaseDreamyPianoNote(note, time)
				break;
			case SoundType.SpaceSynth:
				this.releaseSpaceSynthNote(note)
				break;
			case SoundType.Violin:
				this.releaseViolinNote(note)
				break;
			case SoundType.PanFlute:
				this.releasePanFluteNote(note)
				break;
			case SoundType.Sinus:
				this.releaseSinusNote(note)
				break;
			default:
				break;
		}
	}


	attackAndReleaseNotes( intrument: string, note: string | string[], sec, time?) {
		switch (intrument) {
			case SoundType.Guitar:
				this.attackAndReleaseGuitarNote (note, sec)
				break;
			case SoundType.Piano:
				this.attackAndReleasePianoNote (note, sec, time)
				break;
			case SoundType.DreamyPiano:
				this.attackAndReleaseDreamyPianoNote (note, sec, time)
				break;
			case SoundType.SpaceSynth:
				this.attackAndReleaseSpaceSynthNote (note, sec)
				break;
			case SoundType.Violin:
				this.attackAndReleaseViolinNote (note, sec, time)
				break;
			case SoundType.PanFlute:
				this.attackAndReleasePanFluteNote (note, sec)
				break;
			case SoundType.Sinus:
				this.attackAndReleaseSinusNote (note, sec)
				break;
			default:
				break;
		}
	}

	//------------------Piano------------------//
	private attackPianoNote(note, time?) {
		if (!this.pianoSampler) return;
		try {
			this.pianoSampler.triggerAttack(note, time);
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);
		}
	}
	private releasePianoNote(note, time) {
		if (!this.pianoSampler) return;
		this.pianoSampler.triggerRelease(note, time);
	}
	attackAndReleasePianoNote (note, sec, time?) {
		if (!this.pianoSampler) return;
		try {
			this.pianoSampler.triggerAttackRelease(note, sec, time);
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false; 
			}, 2500);
		}
	}

	//------------------Space Synth------------------//
	private attackSpaceSynthNote(note) {
		if (!this.spaceSynthSampler) return;
		try {
            this.spaceSynthSampler.triggerAttack(note);
            
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);
		}
	}
	private releaseSpaceSynthNote(note) {
		if (!this.spaceSynthSampler) return;
		this.spaceSynthSampler.triggerRelease(note);
	}
	attackAndReleaseSpaceSynthNote(note, sec, time?) {
		if (!this.spaceSynthSampler) return;
		try {
			this.spaceSynthSampler.triggerAttackRelease(note, sec, time);
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false; 
			}, 2500);
		}
	}

	//------------------Dreamy piano------------------//
	private attackDreamyPianoNote(note, time?) {
		if (!this.dreamyPianoSampler) return;
		try {
            this.dreamyPianoSampler.triggerAttack(note, time);
            
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);
		}
	}
	private releaseDreamyPianoNote(note, time?) {
		if (!this.dreamyPianoSampler) return;
		this.dreamyPianoSampler.triggerRelease(note, time);
	}

	attackAndReleaseDreamyPianoNote(note, sec, time?, velocity?) {
		if (!this.dreamyPianoSampler) return;
		try {
			this.dreamyPianoSampler.triggerAttackRelease(note, sec, time, velocity);
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);
		}
	}

	
	//------------------Violin------------------//
	private attackViolinNote(note) {
		if (!this.violinSampler) return;
		try {
            this.violinSampler.triggerAttack(note, Tone.context.currentTime);
            
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);
		}
	}
	private releaseViolinNote(note) {
		if (!this.violinSampler) return;
		this.violinSampler.triggerRelease(note);
	}

	attackAndReleaseViolinNote(note, sec, time?) {
		if (!this.violinSampler) return;
		try {
			this.violinSampler.triggerAttackRelease(note, sec, time)
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);
		}
	}

	//------------------Pan Flute------------------//
	private attackPanFluteNote(note) {
		if (!this.panFluteSampler) return;
		try {
			this.panFluteSampler.triggerAttack(note, Tone.context.currentTime);
			
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);
		}
	}
	private releasePanFluteNote(note) {
		if (!this.panFluteSampler) return;
		this.panFluteSampler.triggerRelease(note);
	}

	attackAndReleasePanFluteNote(note, sec, time?) {
		if (!this.panFluteSampler) return;
		try {
			this.panFluteSampler.triggerAttackRelease(note, sec, time);
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);

		}
	}
	//------------------Guitar------------------//
	private attackGuitarNote(note) {
		if (!this.guitarSampler) return;
		try {
			console.log("check perform guitar bfore", performance.now()  )
			this.guitarSampler.triggerAttack(note, Tone.context.currentTime);
			console.log("check perform guitar", performance.now()  )
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);
		}
	}
	private realeaseGuitarNote(note) {
		if (!this.guitarSampler) return;
		this.guitarSampler.triggerRelease(note);
	}


	attackAndReleaseGuitarNote(note, sec, time?) {
		console.log("attack and release")
		if (!this.guitarSampler) return;
		try {
			this.guitarSampler.triggerAttackRelease(note, sec, time);
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);
		}
	}



   //------------------Test for rythms/arpeggios------------------//
	private attackNoteRythm(note, delay) {
		if (!this.pianoSampler) return;
		try {
                this.pianoSampler.triggerAttack(note, Tone.context.currentTime)
                setTimeout(() => {
                    this.pianoSampler.triggerAttack(note);
                }, delay);            
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);
		}
	}
 //-----------------------------Sinus---------------------------//
	private attackSinusNote(note) {
		if (!this.sinusSynth) return;
		try {
			this.sinusSynth.triggerAttack(note, Tone.context.currentTime);
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false;
			}, 2500);
		}
	}
	private releaseSinusNote(note) {
		if (!this.sinusSynth) return;
		this.sinusSynth.triggerRelease();
	}

	private attackAndReleaseSinusNote(note, sec, time?) {
		if (!this.sinusSynth) return;
		try {
			this.sinusSynth.triggerAttackRelease(note, sec, time);
		} catch (error) {
			console.error(error);
			this.showSoundMessage = true;
			setTimeout(() => {
				this.showSoundMessage = false; 
			}, 2500);
		}
	}


	public adjustGain(soundSettings: SoundSettings) {
		switch (soundSettings.soundType) {
			case SoundType.Piano:
				this.pianoGain.gain.value = soundSettings.volume;
				break;
			case SoundType.SpaceSynth:
				this.spaceSynthGain.gain.value = soundSettings.volume;
				break;
			case SoundType.DreamyPiano:
				this.dreamyPianoGain.gain.value = soundSettings.volume;
				break;
			case SoundType.Violin:
				this.violinGain.gain.value = soundSettings.volume;
				break;
			case SoundType.Guitar:
				this.guitarGain.gain.value = soundSettings.volume;
				break;
			case SoundType.Sinus:
				this.sinusGain.gain.value = soundSettings.volume;
				break;
		}
	}

	public adjustGain2(volume: number) {
		this.dreamyPianoGain.gain.value = volume
	}
}


