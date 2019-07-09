var textures = {}

function add_texture(name, filename)
{
    textures[name] = PIXI.Texture.from(assets_path(`images/${filename}`))
}

function add_textures(name, filename, count)
{
    for (let i = 1; i < count + 1; i++)
        add_texture(name + i, filename + i + '.png')
}

add_texture('ground', 'MountainRepeatFinal.png')
add_texture('moon', 'Moon.png')
add_texture('sky', 'MoutainScrollerSkyRepeat.jpg')
add_texture('head', 'CharacterHead.png')
add_texture('body', 'CharacterBody.png')
add_texture ('left_leg', 'CharacterLeg01.png')
add_texture ('right_leg', 'CharacterLeg02.png')
add_textures('grass', 'Grass0', 9)
add_texture('grass10', 'Grass10.png', 9)
add_textures('long_grass', 'Herbe0', 2)
add_texture('bush', 'Bosquet.png')
add_texture('tree', 'Tree.png')
add_texture('line', 'Line.png')
add_texture('feather', 'Plume01.png')
