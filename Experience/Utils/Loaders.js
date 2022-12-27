import { LoadingManager, TextureLoader } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from "./EventEmitter";

export default class Loaders extends EventEmitter{

    constructor(assets){
        super()

        //Options
        this.assets = assets

        //Setup
        this.items = {}
        this.toLoad = this.assets.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders(){
        const loadingBarElement = document.querySelector('.loading-bar')
        const loadingLogo = document.querySelector('.logoLoading')

        this.loaders ={}
        this.loaders.loadingManager = new LoadingManager(()=>{
            setTimeout(()=>{
                this.trigger('closeOverlay')
                loadingBarElement.classList.add('ended')
                loadingLogo.classList.add('ended')
                loadingBarElement.style.transform = ''             
            },2000)
        },
        (itemUrl, itemsLoaded, itemsTotal)=>{
            const progressRatio = itemsLoaded / itemsTotal
            loadingBarElement.style.transform = `scaleX(${progressRatio})`
        })
        this.loaders.dracoLoader = new DRACOLoader(this.loaders.loadingManager)
        this.loaders.dracoLoader.setDecoderPath('../../draco/')
        this.loaders.gltfLoader = new GLTFLoader(this.loaders.loadingManager)
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)        
        this.loaders.textureLoader = new TextureLoader(this.loaders.loadingManager)
    }


    startLoading(){

        for (const asset of this.assets) {
            
            if(asset.type === 'model'){
                this.loaders.gltfLoader.load(asset.path,(file)=>{
                    this.sourceLoaded(asset, file)
                })
            }

            else if(asset.type === 'texture'){
                this.loaders.textureLoader.load(asset.path,(file)=>{
                    this.sourceLoaded(asset, file)
                })
            }
            
        }
    }

    sourceLoaded(asset, file){
        this.items[asset.name] = file

        this.loaded++

        if(this.loaded === this.toLoad){
            this.trigger('ready')
        }
    }
}
