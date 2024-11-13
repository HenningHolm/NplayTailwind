import { GenerateId} from "../../../Utils/Utils";
import type { Coordinate2D } from "./GeoTypes";
import { BaseShape } from "./BaseShape";

//add touch transform 

export class Square extends BaseShape {
	freqenzy = 0;
	constructor(public width:number, public height:number,public x:number,public y:number, id = GenerateId(), description = "") {
		super(id, description)
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;	
	}
	copy(position:Coordinate2D){
		let copy : Square = {... this};
		copy.id =  GenerateId(); 
		copy.x = position.x;
		copy.y = position.y;
		return copy;
	}

	draw(ctx: CanvasRenderingContext2D, color: string, main: false) {
		ctx.beginPath()
		ctx.fillStyle = color;
		ctx.strokeStyle = "rgb(66,66,66)";
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.lineWidth = 2;

		if(main){

			if(color == "white"){
				var gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.height+this.y);
				gradient.addColorStop(0.7, color);
				gradient.addColorStop(1, "gray");	
			}
			else if(color == "black"){
				var gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.height+this.y);
				gradient.addColorStop(0.7, color);
				gradient.addColorStop(1, "gray");	
			}

			else{
				var gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.height+this.y);
				gradient.addColorStop(0.5, color);
				gradient.addColorStop(1, "white");	
			}
				
			// Fill the path
			ctx.fillStyle = gradient;
			ctx.fill();
		}

		ctx.fill();
		ctx.stroke();
    }

	drawShaddow(ctx: CanvasRenderingContext2D, color: string){
	}

	getInfoCenter() :Coordinate2D{
		if(this.width < this.height)
		return{x:this.x+this.width/2, y: this.y+this.height-10}
	else
	return{x:this.x+this.width/2, y: this.y+this.height/1.44}
	}
	
	getFont() : number{
		console.log("fontScale:", this.fontScale)
		if(this.width < this.height)
		return this.fontScale*14 + this.width/12;
		else
		// return this.fontScale*18 + this.height/12;
		return this.fontScale*16 + this.height/12;
	}

	//scale
	//rotate
	//translate
}

