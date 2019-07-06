const ROCK_RADIUS = 30

class Rock
{
    constructor(x_position, scene)
    {
        this.scene = scene
        this.x_position = x_position
    }

    drow()
    {
        this.graphics = new PIXI.Graphics()
        app.stage.addChild(this.graphics)
        this.graphics.beginFill(0xFFFFFFF)
        this.graphics.drawCircle(0, 0, ROCK_RADIUS)
        this.graphics.endFill()
    }

    update()
    {
        this.graphics.position.set(
            this.scene.screen_position_at(this.x_position),
            this.scene.height_at(this.x_position) - ROCK_RADIUS
        )
    }
}
