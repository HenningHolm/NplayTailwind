import { GenerateId } from "../../../Utils/Utils";
import { BaseShape } from "./BaseShape";
import type { Coordinate2D } from "./GeoTypes";

//extends BaseShape

export class Circle extends BaseShape {
  constructor(public x:number,public y:number, public radius:number,public id = GenerateId(), description = "") {
    super(id, description)
    this.radius = radius;
		this.x = x;
		this.y = y;
    this.gVector.x = x;
    this.gVector.z = y;
    this.gVector.y = 2*Math.sqrt((x**2)+(y**2))-100;
	}
  
  draw(ctx: CanvasRenderingContext2D, color: string){
    ctx.beginPath();
    ctx.arc(this.x,  this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fill();
  }

	getInfoCenter() :Coordinate2D{
		return{x:this.x, y: this.y+this.radius/3.6 }
	}
	
	getFont() : number{
		return this.radius/1.62;
	}


}
