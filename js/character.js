const CHARACTER_WIDTH = 20
const CHARACTER_HEIGHT = 80

class Character
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
        this.graphics.beginFill(0xFF00000)
        this.graphics.drawRect(0, 0, CHARACTER_WIDTH, CHARACTER_HEIGHT)
        this.graphics.endFill()
        this.graphics.position.set(
            this.x_position,
            this.height - this.graphics.height)
    }
}
