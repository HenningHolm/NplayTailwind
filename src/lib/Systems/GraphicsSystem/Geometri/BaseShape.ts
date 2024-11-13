import type { Coordinate2D, Coordinate3D } from "./GeoTypes";

export abstract class BaseShape{
  gVector: Coordinate3D;
  id: number;
  fontScale: number;
  pivot: Coordinate2D;
  senter: Coordinate2D;
  drawTime: number;
  
  constructor(id :number, description: string){
      this.id = id;
      this.fontScale = 1;
      // this.trackingColor = getRandomColor();
      this.drawTime = -1;
      this.gVector = {x:0,y:0,z:0};
    }
    draw(ctx: CanvasRenderingContext2D, color: string, main = false) {
        throw new Error("Method not implemented.");
    }
    getInfoCenter() :Coordinate2D{
      throw new Error("Method not implemented.");
    }
    getFont() : number{
      throw new Error("Method not implemented.");
    }
  }
