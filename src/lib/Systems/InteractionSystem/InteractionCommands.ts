import { get } from "svelte/store";
import {
    globalSettingsStore,
    TouchAction,
} from "../SettingsSystem/GlobalSettings";
import { NoteRelease, NoteTrigger } from "./TangentActions/NoteAction";
import { ChordRelease, ChordTrigger } from "./TangentActions/ChordAction";
import { OvertoneRelease, OvertoneTrigger } from "./TangentActions/OvertonesAction";
import type { SoundActionMessage } from "./InteractionModels";
import { ArpeggioRelease, ArpeggioTrigger } from "./TangentActions/ArpeggioAction";
import type { SoundPlayer2 } from "../SoundSystem/SoundPlayer2";

/**
 * Trigger command sends out a trigger event to the global store,
 * and plays a sound. It does not update the graphics.
 * Graphics update is handled by the global store subscription.
 *
 * @param publishEvent - When a tangent/asteroid is triggered, it will publish
 * a tangent trigger event to global store, and play a sound.
 * When an intrument/system is triggered by an external system, MIDI, song button,
 * intrument, etc. but not by direct click, to play sound as well as graphics update,
 * we dont want this system to publish another duplicate trigger/realease event to its store,
 * we just want to trigger the sound. If there there is no event to be published,
 * we only want the note trigger to handle the command/sound execution.
 */

export function TriggerSoundCommand(
    soundMessage: SoundActionMessage,
    soundPlayer: SoundPlayer2,
    publishEvent: boolean = true
) {
    try {

        // console.log("soundMessage", soundMessage, "publishEvent", publishEvent)
        const touchAction = get(globalSettingsStore.touchAction);
        if (touchAction == TouchAction.Notes || !publishEvent) {
            NoteTrigger(soundMessage, soundPlayer, publishEvent);
        } else if (touchAction > 0 && touchAction < 4) {
            ChordTrigger(soundMessage, soundPlayer, touchAction);
        } else if (touchAction == 7) {
            ArpeggioTrigger(soundMessage);
        } else if (touchAction > 3) {
            OvertoneTrigger(soundMessage, soundPlayer, touchAction);
        }
    } catch (error) {
        console.log(error);
    }
}

export function ReleaseSoundCommand(
    soundMessage: SoundActionMessage,
    soundPlayer: SoundPlayer2,
    publishEvent: boolean = true
) {
    try {
        const touchAction = get(globalSettingsStore.touchAction);
        if (touchAction == TouchAction.Notes || !publishEvent) {
            NoteRelease(soundMessage, soundPlayer, publishEvent);
        } else if (touchAction > 0 && touchAction < 4) {
            ChordRelease(soundMessage, soundPlayer, touchAction);
        } else if (touchAction == 7) {
            ArpeggioRelease(soundMessage);
        } else if (touchAction > 3) {
            OvertoneRelease(soundMessage, soundPlayer, touchAction);
        }
    } catch (error) {
        console.log(error);
    }
}
