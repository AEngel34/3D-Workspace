import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Loaders from './Utils/Loaders.js'
import assets from './assets.js'
import { Scene } from 'three'

let instance = null

export default class Experience {
    constructor(canvas){

        if(instance){
            return instance
        }
        instance = this

        //Options
        this.canvas = canvas

        //Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new Scene()
        this.loaders = new Loaders(assets)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()        

        //Resize Event
        this.sizes.on('resize',()=>{
            this.resize()
        })

        //Time Tick Event
        this.time.on('tick',()=>{
            this.update()
        })
    }

    resize(){
        this.camera.resize()
        this.renderer.resize()        
    }

    update(){
         
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
}