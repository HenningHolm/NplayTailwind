import { GenerateId } from "../../../Utils/Utils";
import type { Coordinate2D } from "./GeoTypes";
import { BaseShape } from "./BaseShape";
import * as geo from "geometric";
//create basic shape infterface
export class Poly2D extends BaseShape {
    constructor(path, id = GenerateId(), description = "") {
      super(id, description);
      this.path = path;
    }
    path : Coordinate2D[];
    pivIndex: number = 0;
    displayPivot: boolean = false;
    polygon: geo.Point[];

    pathToPolygon(){
      this.path.forEach((p:Coordinate2D) => {
        this.polygon.push([p.x, p.y]);
      });
    }
    polygonToPath(){
      this.polygon.forEach((p:geo.Point) => {
        this.path.push({x: p[0], y: p[1]});
      });
    }
   
    draw(ctx: CanvasRenderingContext2D, color: string, main = false){
      ctx.beginPath();
      ctx.moveTo(this.path[0].x,this.path[0].y);
      for(let i = 1; i<this.path.length; i++){
          ctx.lineTo(this.path[i].x,this.path[i].y);
      }
      ctx.fillStyle = color
   
      ctx.fill(); 
      //ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.fillStyle = "black";
      ctx.stroke();
      
      if(this.displayPivot){
        ctx.beginPath();
        ctx.arc(this.path[0].x, this.path[0].y, 5, 0, Math.PI * 2, true);
        ctx.stroke();
      }
  }   
  scale(){
    this.pathToPolygon();
    geo.polygonScale(this.polygon, 1.1, this.polygon[this.pivIndex]);
    this.polygonToPath();
  }

}
