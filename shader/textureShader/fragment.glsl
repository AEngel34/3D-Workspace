precision mediump float;

uniform sampler2D uTexture;

uniform sampler2D uBaked1;
uniform sampler2D uBaked2;
uniform sampler2D uBaked3;
uniform sampler2D uBaked4;
uniform sampler2D uBaked5;
uniform int uState;



varying vec2 vUv;

void main(){

    // if(uniform uState == 1){
    //    vec4 textureColor = texture2D(uBaked1, vUv); 
    // }
    // else{
    //     vec4 textureColor = texture2D(uBaked2, vUv); 
    // }
    
       vec4 textureColor = texture2D(uTexture, vUv); 


    

    
    gl_FragColor = textureColor;
}