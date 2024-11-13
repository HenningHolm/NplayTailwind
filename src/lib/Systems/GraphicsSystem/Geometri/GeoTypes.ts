export interface Coordinate2D
{
    x:number;
    y:number;
}
export interface Coordinate3D
{
    x:number;
    y:number;
    z:number;
}

export interface GridCoordinate2D
{
    x:number;
    y:number;
    indexX:number;
    indexY:number;
}

export class Grid2D
{ 
    constructor(){
        this.interval = {x:0, y:0}
    }
    sections:number 
    vertecies : GridCoordinate2D[];
    interval: {x:number, y:number}
}


export interface Spectrum{
    Length:number;
    Divisions:number;
}


// export enum EXTRACTION { // log/equal -0+
//     InVisuallyEquLogicLog = "In Visually Equal",
//     InVisuallyLogLogicEqu = "In Visually Log",
//     Static = "Static",
//     OutVisuallyEquLogicLog = "Out Visually Equal",
//     OutVisuallyExpoLogicEqu = "Out Visually Exp",
//   }