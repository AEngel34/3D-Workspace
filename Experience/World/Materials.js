import gsap from 'gsap'
import Experience from '../Experience'
import vertexShader from '../../shader/textureShader/vertex.glsl'
import fragmentShader from '../../shader/textureShader/fragment.glsl'
import blackFragmentShader from '../../shader/black/fragment.glsl'
import greyFragmentShader from '../../shader/grey/fragment.glsl'
import rgbFragmentShader from '../../shader/RGB/fragment.glsl'
import vitreFragmentShader from '../../shader/vitre/fragment.glsl'
import coffeeFragmentShader from '../../shader/coffee/fragment.glsl'
import coffeeVertexShader from '../../shader/coffee/vertex.glsl'
import { Color, MeshBasicMaterial, RawShaderMaterial, ShaderMaterial, Vector2 } from 'three'


export default class Material{

    constructor(){

        this.experience = new Experience()
        this.resources = this.experience.loaders
        this.scene = this.experience.scene
        this.materials = []
        this.setMaterial()

        this.overlayMaterial = this.materials[12]      
        this.resources.on('closeOverlay',()=>{
            gsap.to(this.overlayMaterial.uniforms.uAlpha,{
                duration: 3,
                value: 0,
                delay: 1                
            })
        })
    }

    setMaterial(){

        let textures = [
            this.resources.items.baked1Texture,
            this.resources.items.baked2Texture,
            this.resources.items.baked3Texture,
            this.resources.items.leftScreenTexture,
            this.resources.items.rightScreenTexture,
            this.resources.items.phoneScreenTexture,
        ]

        textures.forEach(element=>{element.flipY = false})

        //Texture Materials

        const baked1Material = new RawShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms : {
                uTexture : { value : this.resources.items.baked1Texture}
            }
        })
        const baked2Material = new RawShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms : {
                uTexture : { value : this.resources.items.baked2Texture}
            }
        })
        const baked3Material = new RawShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms : {
                uTexture : { value : this.resources.items.baked3Texture}
            }
        })

        const dogMaterial = new MeshBasicMaterial({
            map : this.resources.items.baked3Texture
        })

        const screen1Material = new RawShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms : {
                uTexture : {value : this.resources.items.leftScreenTexture}
            }
        })
        const screen2Material = new RawShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms : {
                uTexture : {value : this.resources.items.rightScreenTexture}
            }
        })

        const screenPhoneMaterial = new RawShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms : {
                uTexture : { value : this.resources.items.phoneScreenTexture}
            }
        })

        //Color Shader Material

        const blackMaterial = new RawShaderMaterial({
                vertexShader,
                fragmentShader : blackFragmentShader,    
            })

        const greyMaterial = new RawShaderMaterial({
            vertexShader,
            fragmentShader : greyFragmentShader,
        })

        const vitreMaterial = new RawShaderMaterial({
            vertexShader,
            fragmentShader : vitreFragmentShader,
            transparent : true,               
        })

        const rgbMaterial = new RawShaderMaterial({    
            uniforms : {
                color : {value :new Color(0xff0000)} 
            },
            vertexShader,
            fragmentShader : rgbFragmentShader,   
        })

        //Color Variation RGB Material
        const colors = [
            new Color(0x00ff2a),
            new Color(0x00ff3c),
            new Color(0x00ff6e),
            new Color(0x00ff80),
            new Color(0x00ffae),
            new Color(0x00ffbf),
            new Color(0x00ffde),
            new Color(0x00ffbf), 
            new Color(0x00ffae),
            new Color(0x00ff80), 
            new Color(0x00ff6e),
            new Color(0x00ff3c),
        ]

        let colorEtat = 0
        setInterval(function(){
            colorEtat = (colorEtat + 1) % 12;    
            rgbMaterial.uniforms.color.value = colors[colorEtat]      
        }, 300);

        //Smoke Material
        const coffeeSmokeMaterial = new ShaderMaterial({    
            vertexShader : coffeeVertexShader,
            fragmentShader : coffeeFragmentShader,
            transparent : true,
            depthTest: false,
            uniforms : {
                uTime : { value : 0 },
                uUvFrequency : { value : new Vector2(3,2)},
                uTimeFrequency : {value : 0.0004},
                uColor : { value : new Color('#e8d9bf')}
            }
        })

        //Overlay Material 
        const overlayMaterial = new ShaderMaterial({
            transparent : true,
            uniforms : {
                uAlpha : { value : 1}
        },
         vertexShader: `
            void main()
            {
                gl_Position = vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uAlpha;
        
            void main()
            {
                gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
            }
        `
        })

        this.materials = [baked1Material,baked2Material,baked3Material,dogMaterial,screen1Material,screen2Material,screenPhoneMaterial,blackMaterial,greyMaterial,vitreMaterial,rgbMaterial,coffeeSmokeMaterial,overlayMaterial]      
    }
}


