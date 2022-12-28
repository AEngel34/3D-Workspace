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
           
        if(this.experience.sizes.width <=550){
            this.instance.position.set(8,3.5,8)
        }
        else if(this.experience.sizes.width <=1024){
            this.instance.position.set(7,3.5,6.5)
        }
        else{
            this.instance.position.set(5.9,3.5,4.45)
        }

        this.scene.add(this.instance)
    }

    setControls(){
        this.controls = new OrbitControls(this.instance , this.canvas)
        this.controls.enableDamping = true
        this.controls.target.set(0.2,1.8,-1.4)
        this.controls.enableZoom = false

        this.controls.maxAzimuthAngle = Math.PI * 0.4
        this.controls.minAzimuthAngle = Math.PI * 0.1

        this.controls.maxPolarAngle = Math.PI * 0.45
        this.controls.minPolarAngle = Math.PI * 0.3
    }

    resize(){
        if(this.experience.sizes.width <=550){
            this.instance.position.set(8,3.5,8)
        }
        else if(this.experience.sizes.width <=1024){
            this.instance.position.set(7,3.5,6.5)
        }
        else{
            this.instance.position.set(5.9,3.5,4.45)
        }
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update(){
        this.controls.update()
    }

}