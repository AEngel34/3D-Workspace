import Material from "./Materials";
import Experience from "../Experience";
import { AnimationMixer, DoubleSide, Mesh, PlaneGeometry} from "three";

export default class Room{
    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.loaders
        this.time = this.experience.time
        this.materials = new Material()
               
        this.resource = this.resources.items.fullModel

        this.setModel() 
        this.setAnimation()

        this.groupVentilo1 = [this.ventilo1]
        this.groupVentilo2 = [this.ventilo2, this.ventilo3]
    }    

    setModel(){       

        const overlayGeometry = new PlaneGeometry(2,2,1,1)
        const overlay = new Mesh(overlayGeometry,this.materials.materials[12])
        this.scene.add(overlay)

        this.model = this.resource.scene
        this.scene.add(this.model)

        this.model.traverse((child)=>{ 
            
            if(child.name.includes('Touche')){
                child.material = this.materials.materials[0]
            }
            
            switch(child.name){         
                case 'Piano'             :                
                case 'Interface'         :
                case 'Feuille'           : 
                case 'Souris'            :
                    child.material = this.materials.materials[0]
                    child.material.side = DoubleSide
                break

                case 'AlimRed' :
                case 'Bitcoin' :
                case 'Box'     :
                case 'ButtonTour'  :
                case 'Chaise'   :
                case 'Clavier'  :
                case 'Ecrans'   :
                case 'ETH'  :
                case 'Lampe'    :
                case 'OrangeButtonEcran'    :
                case 'Plante'   :
                case 'Pot001'    :
                    child.material = this.materials.materials[1]
                    child.material.side = DoubleSide
                break

                case 'MapMonde' : 
                case 'Etagere'   :        
                case 'Telephone' :
                case 'Bureau'    :
                case 'Enceinte1' :
                case 'Enceinte2' :
                case 'Tasse'     :
                case 'Telephone' :              
                case 'Pot'       :
                case 'Terre'     :
                case 'Tige'      :
                case 'Mur1'      :
                case 'Mur2'      :
                case 'Sol'       :
                case 'Tasse'     :
                case 'Plainte1'  :
                case 'Plainte2'  :   
                    child.material = this.materials.materials[2]
                break
                case 'Tour'      :
                    child.material = this.materials.materials[2]
                    child.material.side = DoubleSide
                break

                case  'Dog'     :
                case 'Langue'   :
                case 'Queue'    :               
                    child.material = this.materials.materials[3]
                    child.frustumCulled = false
                    child.material.side = DoubleSide              
                break

                case 'EcranTelephone':                  
                    child.material = this.materials.materials[6]
                break  
                
                case 'ImgEcran2':                      
                    child.material = this.materials.materials[4]
                break

                case 'ImgEcran1':
                    child.material = this.materials.materials[5]
                break

                case 'ComputerButton' :
                case 'RGB':    
                    child.material = this.materials.materials[10]
                    child.material.side = DoubleSide
                break
                   
                case 'Ventilo'              :
                    this.ventilo1 = child
                case 'Ventilo2'             :
                    this.ventilo2 = child
                case 'Ventilo3'             :
                    this.ventilo3 = child
                case 'alim'                 :
                case 'Armature'             :
                case 'BlackCgu'             :
                case 'Composantmotherboard' :
                case 'cpu'                  :
                case 'Ram'                  :
                case 'Tapis'                :                
                case 'WaterCooling'         :
                    child.material = this.materials.materials[7]
                break

                case 'GreyCgu'              :
                case 'motherboard'          :
                    child.material = this.materials.materials[8]
                break

                case 'vitre'    :
                    child.material = this.materials.materials[9]
                    child.material.side = DoubleSide
                break

                case 'SmokeCoffee' :
                    this.smokeCoffee = child                                      
                    child.material = this.materials.materials[11]
                    child.frustumCulled = false                    
                break
            }
        })
    }

    setAnimation(){
        this.animation = {}
        this.animation.mixer = new AnimationMixer(this.model)
        this.animation.action = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.action.play()
    }

    update(){
        this.animation.mixer.update(this.time.delta * 0.0010)
        this.smokeCoffee.material.uniforms.uTime.value = this.time.elapsed

        if(this.groupVentilo1[0]){
            this.groupVentilo1[0].rotation.x =  this.time.elapsed  
        }
        if(this.groupVentilo2[0]){
            this.groupVentilo2[0].rotation.y =  this.time.elapsed 
            this.groupVentilo2[1].rotation.y =  this.time.elapsed  
        }        
    }  
}