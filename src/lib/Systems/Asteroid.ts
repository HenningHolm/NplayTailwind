
import { getRandomColor } from "../Utils/Utils";
import type { colorOptions } from "./ColorSystem/ColorBuildOperations";

import { GraphicsManager } from "./GraphicsSystem/GraphicsManager";
import type { BaseShape } from "./GraphicsSystem/Geometri/BaseShape";
import { DisplayManager as DisplayManager } from "./DisplaySystem/DisplayManager";
import type { Coordinate3D } from "./GraphicsSystem/Geometri/GeoTypes";
import { SoundManager } from "./SoundSystem/SoundManager";
import type { CanvasSystem } from "../Components/FeatureWindow/CanvasSystem";

export function buildAsteroidArrayLength(length: number, systemId: number) {
  let collection = Array<Asteroid>();
      for(let i = 0; i<length; i++){
          collection.push(new Asteroid(systemId,i));
      }
    return collection
}

export class Asteroid{
  public id:number;
  public systemId: number;
  public selected: boolean; 
  public collectionIndex: number;
  public state = AsteroidState.Rest;
  //public chord = false;
  
  public tSti: number; //tangentIndex-/this-Sti
  public rSti: number; //relative(positiv) to key

  public trackingColor: string;
  public colors: colorOptions; //remove drawColor and move to GraphicsManager?
  public secondColors: colorOptions|undefined; // for guitar aka next o prev? color
  public noteTextColor = "";
  public emoji = ""
 
  public SM = new SoundManager();
  public GM = new GraphicsManager();
  public DM = new DisplayManager();

  public gVector : Coordinate3D;

  public customTouch = undefined;
  public customRelease = undefined;

  constructor(systemId:number, index: number = undefined){
    this.trackingColor = getRandomColor();
    this.collectionIndex = index;
    this.systemId = systemId;
  }

  draw(c: CanvasSystem)
  {
    // this.colors.drawColor = this.state == AsteroidState.Triggered ? this.colors.touchColor : this.colors.restColor;
    
    //colors in graphicsManager?
    // switch (this.state) {
    //   case AsteroidState.Triggered:
    //     this.colors.drawColor = this.colors.touchColor;
    //     break;
    //   case AsteroidState.Rest:
    //     this.colors.drawColor = this.colors.restColor;
    //     break;
    //   case AsteroidState.Deaktivated:
    //     this.colors.drawColor = "gray";
    // }
    this.GM.draw(c, this.colors.drawColor, this.trackingColor);
    this.DM.showInfo(c, this.SM, this.noteTextColor, this.emoji, this.rSti, )
  }

  setShape(shape:BaseShape, main = true, boldText = false){
    this.GM.setShape(shape, main)
    console.log(shape.getFont()+ "font")
    this.DM.setFontSize(shape.getFont(), boldText)
    this.DM.setInfoCenter(shape.getInfoCenter(), true);
    //temp
    if(main){
      this.gVector = this.GM.mainShape.gVector;
    }
  }
}


export enum AsteroidState {
  Rest,
  Triggered,
  Deaktivated
}


// Graphics
// CM:ColorManager; // make all managers static, alle har sine commandoer

//STEPS OF FREQUENCY
//  export function buildAsteroidArray(levels:number, systemId: number, spectrumLength:number) {
//     let collection = Array<Asteroid>();
//     for(let l = 0; l<levels; l++){
//         for(let i = 0; i<spectrumLength; i++){
//             collection.push(new Asteroid());
//         }
//     }
//     return collection
// }+