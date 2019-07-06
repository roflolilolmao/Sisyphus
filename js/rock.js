const ROCK_RADIUS = 30

class Rock
{
    constructor(x_position, scene)
    {
        this.height = scene.ground_height_at(x_position)
        this.x_position = x_position

        this.graphics = new PIXI.Graphics()
        app.stage.addChild(this.graphics)
    }

    drow()
    {
        this.graphics.position.set(0, 0)
        this.graphics.beginFill(0xFFFFFFF)
        console.log(this.height, app.screen.height / 3 * 2)
        this.graphics.drawCircle(
            this.x_position,
            this.height - ROCK_RADIUS,
            ROCK_RADIUS)
        this.graphics.endFill()
    }
}
