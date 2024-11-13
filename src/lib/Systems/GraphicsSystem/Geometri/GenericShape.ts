import type { colorOptions } from "src/Systems/ColorSystem/ColorBuildOperations";
import type { CanvasSystem } from "src/Systems/WindowSystem/CanvasSystem";
import { GenerateId } from "src/Utils/Utils";
import type { Coordinate2D } from "./GeoTypes";

export class GenericShape {
    path: Coordinate2D[];
	constructor(public x:number,public y:number, public radius:number,private id = GenerateId()) {
		this.radius = radius;
		this.x = x;
		this.y = y;
	}

    draw(c: CanvasSystem,colorOptions: colorOptions, trackingColor){
        this.drawSingle(c.ctx, this.path, colorOptions, trackingColor, false)
        this.drawSingle(c.secondCtx, this.path,colorOptions, trackingColor, true)
    }   

    drawSingle(ctx:CanvasRenderingContext2D, path: Coordinate2D[],  colorOptions: colorOptions, trackingColor, hidden: boolean = false){
      
        ctx.beginPath();
        ctx.moveTo(path[0].x,path[0].y);
        for(let i = 1; i<path.length; i++){
            ctx.lineTo(path[i].x,path[i].y);
        }
        if(hidden){
            ctx.fillStyle = trackingColor
        }
        else{
            ctx.fillStyle = colorOptions.drawColor;
        }  
          ctx.fill(); 
        //ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.stroke();
        
        //if(displayPivot){}
        ctx.beginPath();
        ctx.arc(path[0].x, path[0].y, 5, 0, Math.PI * 2, true);
        ctx.stroke();
    }
}