var textures = {}

function add_texture(name, filename)
{
    textures[name] = PIXI.Texture.from(assets_path(`images/${filename}`))
}

add_texture('ground', 'MountainRepeat_top.png')
add_texture('sky', 'MoutainScrollerSkyRepeat.jpg')
add_texture('head', 'CharacterHead.png')
add_texture('body', 'CharacterBody.png')
add_texture ('left_leg', 'CharacterLeg01.png')
add_texture ('right_leg', 'CharacterLeg02.png')
