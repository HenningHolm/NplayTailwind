import type { CanvasSystem } from "../WindowSystem/CanvasSystem";
import type { Coordinate2D } from "../GraphicsSystem/Geometri/GeoTypes";
import { ShowNumbers } from "../SettingsSystem/LocalSettingsTypes";
import { globalSettingsStore, ScaleSystem } from "../SettingsSystem/GlobalSettings";
import { get } from "svelte/store";
import type { SoundManager } from "../SoundSystem/SoundManager";

//Displaymanager?
// There need to be some reflection wetter notes should be displayed as chords by changing touch action

export class DisplayManager {

    public infoCenter: Coordinate2D;

    public showNotes= false;
    public showEmojis=false;
    public showNumbers = ShowNumbers.None; 

    private notesLocation: Coordinate2D;
    private emojiLocation: Coordinate2D;
    private freqLocation: Coordinate2D;
    public isHeart: boolean;
    
    public fontSize: number;
    public bold: boolean;
    public infoDistribution: InfoDistribution = InfoDistribution.AllCentered;
    
    setInfoCenter(infoCenter:Coordinate2D, vertical:boolean){
        this.infoCenter = infoCenter;
    }

    setFontSize(fontSize :number, bold:boolean = false){
        this.fontSize = fontSize
        console.log("fontSize", fontSize)
        this.bold = bold;
    }

    //consider pulling out logic to function
    showInfo(c:CanvasSystem,sm: SoundManager, noteTextColor:string, emoji: string, rSti: number, heart: boolean = false){
        this.setInfoLocation();   
        
        
        if(this.showNotes){
            let key = rSti == 0 ? "*" : "";
            // let lock = rSti == 9 ? "*" : "";
            c.ctx.font = this.bold ? "bold "+ this.fontSize+"px Helvetica" : this.fontSize+"px Helvetica";
            if(this.isHeart){
                c.ctx.fillStyle = "white";
            }
            else{
                c.ctx.fillStyle = noteTextColor;
            }
            c.ctx.textAlign = "center";
            c.ctx.fillText(key+sm.soundId, this.notesLocation.x, this.notesLocation.y);
        }
        if(this.showEmojis){
            c.ctx.save();
            c.ctx.font = 1.8*this.fontSize+ "px Helvetica";
            c.ctx.fillStyle = noteTextColor;
            c.ctx.textAlign = "center";
            c.ctx.strokeStyle = 'black';
            
            if(this.isHeart){

                //this should be done in a better way, maybe 
                let scaleSystem = get(globalSettingsStore.scaleSystem);
                let touchAction = get(globalSettingsStore.touchAction);
                let rotationMajor,translateMajor,rotationMinor,translateMinor;
                if(touchAction > 0 && touchAction < 4){
                    rotationMajor = scaleSystem == ScaleSystem.AllMinor ? Math.PI : 0; 
                    translateMajor = scaleSystem == ScaleSystem.AllMinor ? this.fontSize : 0;
                    rotationMinor = scaleSystem == ScaleSystem.AllMajor ? Math.PI: 0;   
                    translateMinor = scaleSystem == ScaleSystem.AllMajor ? this.fontSize : 0;
                }
                else{
                    rotationMajor = translateMajor = rotationMinor = translateMinor = 0;
                }
                let quality;
                c.ctx.fillStyle = "white";

            
                if(rSti == 2 || rSti == 4 || rSti == 9)
                {
                    c.ctx.save();
                    c.ctx.translate(this.emojiLocation.x, this.emojiLocation.y);
                    c.ctx.rotate(rotationMinor);
                    c.ctx.translate(-this.emojiLocation.x, -this.emojiLocation.y)
                    c.ctx.fillText(emoji, this.emojiLocation.x, this.emojiLocation.y+translateMinor);
                    c.ctx.restore();
                    quality = "m";
                }
                else if(rSti == 11)
                {
                    c.ctx.fillText(emoji, this.emojiLocation.x, this.emojiLocation.y); 
                    quality = "dim";
                }     
                else{
                    c.ctx.save();
                    c.ctx.translate(this.emojiLocation.x, this.emojiLocation.y);
                    c.ctx.rotate(rotationMajor);
                    c.ctx.translate(-this.emojiLocation.x, -this.emojiLocation.y)
                    c.ctx.fillText(emoji, this.emojiLocation.x, this.emojiLocation.y+translateMajor);
                    c.ctx.restore();
                }
            }
            else{
                c.ctx.fillText(emoji, this.emojiLocation.x, this.emojiLocation.y);
            }
        }

        if(this.showNumbers != ShowNumbers.None){
            let value: string;
            let valueFont = this.fontSize/1.32+ "px Helvetica";
            switch (this.showNumbers) {
                case ShowNumbers.Frequency:
                    value = sm.freqency ;
                    break;
                case ShowNumbers.RelativeFrequency:
                    value = sm.relativeFreqency;
                    break;
                case ShowNumbers.RomanNumeral:
                    value = sm.romanNumeral;
                    valueFont = this.fontSize+ "px Helvetica";
                    break;
                case ShowNumbers.MIDI:
                    value = sm.midiNote.toString();
                    valueFont = this.fontSize+ "px Helvetica";
                    break;
                case ShowNumbers.IndexUp:
                    value = rSti.toString();
                    valueFont = this.fontSize+ "px Helvetica";
                    break;
                case ShowNumbers.IndexDown:
                    value = (-(rSti-12)%12).toString();
                    valueFont = this.fontSize+ "px Helvetica";
                    break;
                case ShowNumbers.IndexDual:
                    value = rSti.toString() + "/" + (-(rSti-12)%12).toString();
                    valueFont = this.fontSize/1.2+ "px Helvetica";
                    break;
                default:
                    break;
            }
            c.ctx.font = valueFont;
            c.ctx.fillStyle = noteTextColor;
            c.ctx.textAlign = "center";
            c.ctx.fillText(value.toString(), this.freqLocation.x, this.freqLocation.y);
        }
    }
    
    setInfoLocation(){ 
            this.notesLocation = {...this.infoCenter};
            this.emojiLocation = {...this.infoCenter};
            this.freqLocation = {...this.infoCenter};

        let showingNum = this.showNumbers != ShowNumbers.None ? 1 : 0;
        // +- covert is very slow, if it is a problem, use if/ternary statements    
        if(this.infoDistribution == InfoDistribution.Horistontal){
            this.notesLocation.x = this.infoCenter.x+this.fontSize*0.8*(+this.showEmojis);
            this.emojiLocation.x = this.infoCenter.x-this.fontSize*(+this.showNotes);
        }
        else if(this.infoDistribution == InfoDistribution.Vertical){
            this.emojiLocation.y = this.infoCenter.y-20*(+this.showNotes)-22*(showingNum);
            this.freqLocation.y = this.infoCenter.y-20*(+this.showNotes) 
            }
        else if(this.infoDistribution == InfoDistribution.Circular){
            this.notesLocation = this.infoCenter;
            this.emojiLocation = this.infoCenter;
            this.freqLocation = this.infoCenter;
        }
    }
    //scale, rotate, 
}

 export enum InfoDistribution {
    AllCentered = 0,
    Horistontal = 1,
    Vertical = 2,
    Circular = 3,
  }
