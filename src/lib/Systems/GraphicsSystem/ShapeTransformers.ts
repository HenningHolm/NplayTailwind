import type { Coordinate2D } from "./Geometri/GeoTypes";
import { getRandomColorAlpha } from "../../Utils/Utils";

//----------------//
// NOT IN USE ATM //
//----------------//

//floor/ceil cos values
export class ShapeweD2{
    //take out, a shape dont need a ctx, or does it? Is a shape unic to its context? add to Asteroid or nor
    mainCtx!: CanvasRenderingContext2D; //to be removed after development
    hiddenCtx!: CanvasRenderingContext2D; // //to be removed after development
    path : Coordinate2D[] = [];
    incrRatio : number | undefined;
    idColor = "";
    pivot!: Coordinate2D;
    pivIndex: number = -1;
    radius : number | undefined;
    //use decorators to solve render on update here and in Asteroid
    updated!: false; 
    constructor(mainCtx: CanvasRenderingContext2D, secondCtx: CanvasRenderingContext2D){
        this.mainCtx = mainCtx
        this.hiddenCtx = secondCtx;
        this.idColor =  getRandomColorAlpha();
    } 
    createTriangle(){
        let len = 50;
        let sPos = {x: 200, y:200} 
        let lPos = {x:sPos.x - len, y:200} 
        let luPos= {x:sPos.x-Math.cos(Math.PI/3)*len, y:sPos.y - Math.sin(Math.PI/3)*len};
        let ldPos= {x:sPos.x-Math.cos(Math.PI/3)*len, y:sPos.y + Math.sin(Math.PI/3)*len};
        let rPos= {x:sPos.x + len, y:sPos.y}
        let ruPos= {x:sPos.x+Math.cos(Math.PI/3)*len, y:sPos.y - Math.sin(Math.PI/3)*len};
        let rdPos= {x:sPos.x+Math.cos(Math.PI/3)*len, y:sPos.y + Math.sin(Math.PI/3)*len};

        this.path[0] = sPos;
        this.path[1] = lPos;
        this.path[2] = luPos;
        this.pivIndex = 1;
        this.pivot = this.path[this.pivIndex];

    //   this.path[0]= {x: 0 , y: 100};  
    //   this.path[1]= {x: Math.cos(Math.PI/3)*100 , y: 0};    
    //   this.path[2]= {x: 200 , y: 100};  

        this.path[0]= {x: 57 , y: 280};  
        this.path[1]= {x: 0 , y: 105};    
        this.path[2]= {x: 113 , y: 0};
        this.path[3]= {x: 324 , y: 90};  
    }
    createCustomTriangle(){
        let len = 50;
        let sPos = {x: 200, y:200} 
        let lPos = {x:sPos.x - len, y:200} 
        let luPos= {x:sPos.x-Math.cos(Math.PI/3)*len, y:sPos.y - Math.sin(Math.PI/3)*len};
        let ldPos= {x:sPos.x-Math.cos(Math.PI/3)*len, y:sPos.y + Math.sin(Math.PI/3)*len};
        let rPos= {x:sPos.x + len, y:sPos.y}
        let ruPos= {x:sPos.x+Math.cos(Math.PI/3)*len, y:sPos.y - Math.sin(Math.PI/3)*len};
        let rdPos= {x:sPos.x+Math.cos(Math.PI/3)*len, y:sPos.y + Math.sin(Math.PI/3)*len};

        this.path[0] = sPos;
        this.path[1] = lPos;
        this.path[2] = luPos;
        this.pivIndex = 1;
        this.pivot = this.path[this.pivIndex];

    //   this.path[0]= {x: 0 , y: 100};  
    //   this.path[1]= {x: Math.cos(Math.PI/3)*100 , y: 0};    
    //   this.path[2]= {x: 200 , y: 100};  

        this.path[0]= {x: 57 , y: 280};  
        this.path[1]= {x: 0 , y: 105};    
        this.path[2]= {x: 113 , y: 0};
        this.path[3]= {x: 324 , y: 90};  
    }
    
    createSquare(width:number, height:number){
        this.path[0] = {x:0, y:0};
        this.path[1] = {x:width, y:0};
        this.path[2] = {x:width, y:height};;
        this.pivIndex = 1;
        this.pivot = this.path[this.pivIndex];
    }
    // createBezierCircle(radius: number, segments: number){
    //     (4/3)*Math.tan(Math.PI/(2*segments))
    // }

    createNGon(){

    }


    getRelations(firstIndex: number, secondIndex: number){
        let deltaX = this.path[secondIndex].x-this.path[firstIndex].x;
        let deltaY = this.path[secondIndex].y-this.path[firstIndex].y; 
        let anglePositivY =Math.atan2(-deltaY,deltaX);  
        let deg = (anglePositivY/(2*Math.PI))*360
        
    }

    addVertex =(coor: Coordinate2D) =>{
        this.path.push(coor);
    }

    translate(tx:number, ty:number){  
        this.path.forEach(vector => {
            vector.x += tx;
            vector.y -= ty;
        });
        this.pivot = this.path[this.pivIndex];
    };

    scale(sx:number, sy:number){
        this.path.forEach(vector =>{
            vector.x+=(vector.x-this.pivot.x)*sx;
            vector.y+=(vector.y-this.pivot.y)*sy;
        })
    };

    rotate(deg: number){
        let degRad = 2*Math.PI*(deg/360)
        this.path.forEach(vector =>{
            let tempX = vector.x - this.pivot.x;
            let tempY = vector.y - this.pivot.y;
            vector.x = this.pivot.x+ (tempX * Math.cos(degRad) - tempY * Math.sin(degRad));
            vector.y = this.pivot.y+ (tempX * Math.sin(degRad) + tempY * Math.cos(degRad));
        })
    };

    flipYOnPivot(dir: string){
            this.path.forEach(vector =>{
                vector.y = this.pivot.y +(this.pivot.y- vector.y); 
            })
    }
    flipXOnPivot(){
        this.path.forEach(vector =>{
            vector.x = this.pivot.x +(this.pivot.x- vector.x); 
        })
    }
    
    flipOnEdge(firstIndex: number, secondIndex: number){
        let deltaX = this.path[secondIndex].x-this.path[firstIndex].x;
        let deltaY = this.path[secondIndex].y-this.path[firstIndex].y; 
        console.log("deltaX:", deltaX, "deltaY:", deltaY)
        let anglePositivY =Math.atan2(-deltaY,deltaX);  
        let deg = (anglePositivY/(2*Math.PI))*360
        console.log("🚀 ~ file: Pyramides.ts ~ line 289 ~ Shape2D ~ flipOnEdge ~ deg", deg)
    
        this.rotate(deg)
        this.draw()
        this.path[0].y= this.path[1].y-(this.path[0].y-this.path[1].y); 
       // this.rotate(anglePositivY)
        this.rotate(-deg)
        console.log("degree between index ", firstIndex, "and",secondIndex, "is :",(anglePositivY/(2*Math.PI))*360)
    }

    setIndexAsPivot(index:number){
        this.pivot = this.path[index]
    }
    draw(){
        //to be removed 
        // this.mainCtx.clearRect(0,0,2000,2000);
        // this.hiddenCtx.clearRect(0,0,2000,2000);

        this.drawSingle(this.mainCtx);
        this.drawSingle(this.hiddenCtx, true);
    }
    drawCircle(radius: number, ctx: CanvasRenderingContext2D){
        ctx.beginPath();
    }

    private drawSingle(ctx:CanvasRenderingContext2D, hidden: boolean = false){
        ctx.beginPath();
        ctx.moveTo(this.path[0].x,this.path[0].y);
        for(let i = 1; i<this.path.length; i++){
            ctx.lineTo(this.path[i].x,this.path[i].y);
        }
        ctx.closePath();
        if(hidden){
            ctx.fillStyle = this.idColor
        }
        else{
            ctx.fillStyle = getRandomColorAlpha();
        }    
        //ctx.lineWidth = 2;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.stroke();
        
        //if(displayPivot){}
        ctx.beginPath();
        ctx.arc(this.pivot.x, this.pivot.y, 10, 0, Math.PI * 2, true);
        ctx.stroke();
    }


}
