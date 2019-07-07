var textures = {}

function add_texture(name, filename)
{
    textures[name] = PIXI.Texture.from(assets_path(`images/${filename}`))
}

add_texture('ground', 'MountainRepeat.png')
add_texture('sky', 'MoutainScrollerSkyRepeat.jpg')
