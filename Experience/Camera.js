import Experience from "./Experience";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { PerspectiveCamera } from 'three';

export default class Camera{
    constructor(){
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setControls()
    }


    setInstance(){
        this.instance = new PerspectiveCamera(75, this.sizes.width / this.sizes.height , 0.1 , 2000)
             
        this.instance.position.set(6,4,5.5)
        
        this.instance.rotation.x = -0.4 
        this.instance.rotation.y = 0.7 
        this.instance.rotation.z = 0.3        
        
        this.scene.add(this.instance)
    }

    setControls(){
        this.controls = new OrbitControls(this.instance , this.canvas)
        this.controls.enableDamping = true
    }

    resize(){
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update(){
        this.controls.update()
    }

}