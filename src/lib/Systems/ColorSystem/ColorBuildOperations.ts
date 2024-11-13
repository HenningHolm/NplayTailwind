import type { Asteroid } from "../Asteroid";
import { HighlightScale } from "../SettingsSystem/LocalSettingsTypes";
import { getScaleTrueFalseArray } from "../TonalSystem/TonalBuildOperations";

/**
* @param colorDegForC Chosen start color for C 
* HighlightScale.Static will only work if transpose is passed in
*/



export function buildAndWrapColorOptions(AsteroidCollection: Array<Asteroid>, colorDegForC: number = 0, highlightScale: HighlightScale, transponse: number = 0) {
    {
        let colorSpaces = 360 / 12;
        let scaleArray = getScaleTrueFalseArray("major");
        for (let i = 0; i < AsteroidCollection.length; i++) {
            let aSti = AsteroidCollection[i].tSti;
            let rSti = AsteroidCollection[i].rSti;
            let deltaColorDeg = aSti * colorSpaces;
            let colorValue = (colorDegForC + deltaColorDeg) % 360;
            let scaleColor;
            //if(transponse... rsti)
            if(highlightScale == HighlightScale.Dynamic){
                scaleColor = scaleArray[rSti] == 1 ? "white" : "black";
            }
            else{
                scaleColor = scaleArray[(12+aSti-transponse)%12] == 1 ? "white" : "black";
            }
            AsteroidCollection[i].colors = {
                id: "pw",
                drawColor: scaleColor,
                restColor: scaleColor,
                scaleColor: scaleColor,
                soundColor: `hsl(${colorValue}, 100%, 50%)`,
                touchColor: "gray",
                hoverColor: "yellow",
            };
        }
        return AsteroidCollection;
    }
}

// 360 per fifth : division = 7
export function buildAndWrapColorOptionsPerDivisions(AsteroidCollection: Array<Asteroid>, 
    startColorDeg: number = 30, divisions: number = 7){
        let spectrumLength = 12;
        let colorSpaces = 360 / spectrumLength;
        for (let i = 0; i < AsteroidCollection.length; i++) {
            let colorValue = (startColorDeg + colorSpaces * ((i * divisions) % 12)) % 360;
            let soundColor= `hsl(${colorValue}, 100%, 50%)`;
            console.log("soundColor: ", soundColor) 
            AsteroidCollection[i].colors = {
                id: "pw",
                drawColor: soundColor,
                soundColor: soundColor,
                scaleColor: "black",
                restColor: soundColor,
                touchColor: "gray",
                hoverColor: "yellow"
            };
        }
        return AsteroidCollection;
}

// Consider making an outer interface with main: colorOption, second:colorOption, tracking and text color 
export interface colorOptions {
    id: string;
    drawColor: string; //output
    soundColor: string; // color by soundId
    scaleColor: string; // black or white
    restColor: string;
    touchColor: string;
    hoverColor: string;
}

export function getColorArray(stIndex: number, i: number){
    let colorInterval = 360 / 12;
    let spacesArray = [0, 0, 7, 0, 4];
    // let colorDegForC = 0; 
            let colorValue = ((stIndex+3)*colorInterval + colorInterval*spacesArray[i]) % 360;
            //multiply stIndex by i and get 
            return `hsl(${colorValue}, 100%, 50%)`;
}

// // export function createClassic12ColorArray(startColorDegree: number, scaleColor: string, touchColor: string, hoverColor: string) {
// //     let colorArray = new Array<colorOptions>();
// //     let colorIntervals = 360 / 12;
// //     for (let i = 0; i < 12; i++) {
// //         colorArray.push({
// //             id: `C12i${i}`,
// //             drawColor: scaleColor,
// //             soundColor: `(${startColorDegree}+${colorIntervals}*${i})%360);`,
// //             scaleColor: scaleColor,
// //             restColor: scaleColor,
// //             touchColor: touchColor,
// //             hoverColor: hoverColor
// //         })
// //     }
// //     return colorArray;
// // }

// // export function createPianoColorArray(startColorDegree: number) {
// //     let colorArray = new Array<colorOptions>();
// //     let pattern = [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1]
// //     let colorIntervals = 360 / 12;
// //     for (let i = 0; i < 12; i++) {
// //         colorArray.push({
// //             id: `C12i${i}`,
// //             drawColor: pattern[i] == 1 ? "white" : "black",
// //             soundColor: `(${startColorDegree}+${colorIntervals}*${i})%360);`,
// //             scaleColor: pattern[i] == 1 ? "white" : "black",
// //             restColor: pattern[i] == 1 ? "white" : "black",
// //             touchColor: "gray",
// //             hoverColor: "lightgray"
// //         })
// //     }
// //     return colorArray;
// // }
