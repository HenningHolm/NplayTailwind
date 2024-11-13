import { HighlightScale, ShowColors, type DisplaySettings } from "../SettingsSystem/LocalSettingsTypes";
import type { Asteroid } from "../Asteroid";

/**
 * Used by DisplayBuildOperations.ts
 * @param a Asteroid that will contain a default built color options
 * @param settings DisplaySettings that will affect colorOptions 
 */

export function setColorsByDisplaySettings(a: Asteroid, settings: DisplaySettings, singleColor: string) {
    // Default assignments
    a.colors.restColor = settings.showColors === ShowColors.Off ? singleColor : "white";
    a.colors.drawColor = a.colors.restColor;
    a.colors.touchColor = settings.showColors === ShowColors.Off ? "gray" : "white";
    a.noteTextColor = singleColor === "black" ? "white" : "black";

    if (settings.showColors === ShowColors.On) {
        a.colors.restColor = a.colors.soundColor;
        a.colors.touchColor = "white";
        a.noteTextColor = "black";
    } else if (settings.showColors === ShowColors.OnPlay) {
        a.colors.touchColor = a.colors.soundColor;
    }

    if (settings.highlightScale !== HighlightScale.Off) {
        a.colors.restColor = a.colors.scaleColor === "black" ? "black" : a.colors.restColor;
        a.noteTextColor = a.colors.scaleColor === "black" ? "white" : "black";
    }

    a.colors.drawColor = a.colors.restColor;

    if (settings.showNotes) {
        a.DM.showNotes = settings.showNotes;
    }

    return a;
}
    //TODO: add transparent option/show in click (not sure what I meant here)
    // if(true){
    //     a.colors.touchColor = "trasparent"
    //     console.log("red set1", a.colors)
    // }
    // console.log("red set2",a.colors);
// }


function findContrastColor(hexColor) {
    // Konverter hex til RGB
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);

    // Beregn luminans
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Returner enten svart eller hvit avhengig av luminansen
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}