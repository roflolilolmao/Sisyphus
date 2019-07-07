const GRASS_LIST = [
    'grass1',
    'grass2',
    'grass3',
    'grass4',
    'grass5',
    'grass6',
    'grass7',
    'grass8',
    'grass9',
    'grass10',
    'long_grass1',
    'long_grass2',
    'bush'
]

class Vegetation
{
    constructor()
    {
        this.trees = new PIXI.Container()
        this.grasses = new PIXI.Container()
    }

    add_plant(ground, texture, proba, position, container)
    {
        if (Math.random() > proba)
            return

        let graphics = new PIXI.Sprite.from(texture)
        container.addChild(graphics)

        let scale = Math.random() * 0.2 + 0.9
        graphics.scale.set(scale, scale)
        graphics.position.set(
            ground.screen_position_at(position.x),
            position.y - graphics.height * 0.9
        )
    }

    add_grass(ground)
    {
        this.add_plant(
            ground,
            textures[GRASS_LIST[Math.floor(Math.random() * GRASS_LIST.length)]],
            0.8,
            ground.random_point_on_last_segment(),
            this.grasses)
    }

    add_tree(ground)
    {
        let x = ground.random_x_on_last_segment()
        this.add_plant(
            ground,
            textures['tree'],
            0.6 / current_bpm * START_BPM,
            {'x': x, 'y': ground.height_at(x)},
            this.trees)
    }

    add_plants(ground)
    {
        for (let i = 0; i < 3; i++)
            this.add_grass(ground)
        this.add_tree(ground)
    }

    drow()
    {
        graphics_container.addChild(this.grasses)
        app.stage.addChildAt(this.trees, 1)
    }

    update()
    {
    }
}
