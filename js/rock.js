const ROCK_RADIUS = 30

class Rock
{
    constructor(x_position, scene)
    {
        this.scene = scene
        this.x_position = x_position

        this.graphics = new PIXI.Graphics()
        app.stage.addChild(this.graphics)
    }

    drow()
    {
        this.graphics.position.set(0, 0)
        this.graphics.beginFill(0xFFFFFFF)
        this.graphics.drawCircle(
            this.scene.screen_position_at(this.x_position),
            this.scene.height_at(this.x_position) - ROCK_RADIUS,
            ROCK_RADIUS)
        this.graphics.endFill()
    }
}
