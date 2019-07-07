let ROCK_RADIUS = 30

class Rock
{
    constructor(x_position, scene)
    {
        this.scene = scene
        this.x_position = x_position
    }

    drow()
    {
        this.graphics = new PIXI.Sprite.from(textures.moon)
        graphics_container.addChild(this.graphics)
        this.graphics.anchor.set(0.5, 0.5)
        this.graphics.scale.set(0.8, 0.8)
        ROCK_RADIUS = this.graphics.height / 2
    }

    update()
    {
        this.graphics.position.set(
            this.scene.screen_position_at(this.x_position),
            this.scene.height_at(this.x_position) - ROCK_RADIUS
        )
    }
}
