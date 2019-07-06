const textures = {
    'ground': PIXI.Texture.from('assets/images/MountainRepeat.png'),
    'sky': PIXI.Texture.from('assets/images/MountainScrollerSkyRepeat.png'),
}

const brt = new PIXI.BaseRenderTexture(300, 300, PIXI.SCALE_MODES.LINEAR, 1)
const rt = new PIXI.RenderTexture(brt)

function loadImage(src){
    if(!src.type.match(/image.*/)){
        console.log("The dropped file is not an image: ", src.type)
        return
    }

    var reader = new FileReader()
    reader.onload = function(e) {
        sky = PIXI.Texture.from((e.target.result))
    }
    reader.readAsDataURL(src)
}
