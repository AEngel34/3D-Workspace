import Experience from "../Experience";
import Room from "./Room.js";

export default class World{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.loaders
        
        //Wait For Resources

        this.resources.on('ready',()=>{
            //Setup
            this.room = new Room()
        })

    }



    update(){
        if(this.room){
            this.room.update()
        }
    }
}


