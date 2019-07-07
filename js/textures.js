var textures = {}

function add_texture(name, filename)
{
    textures[name] = PIXI.Texture.from(
        `https://roflolilolmao.github.io/Sisyphus/assets/images/${filename}`)
}

add_texture('ground', 'MountainRepeat.png')
add_texture('sky', 'MoutainScrollerSkyRepeat.jpg')
