let FLOOR_SEGMENTS_COUNT = 10
let FLOOR_SEGMENTS_LENGTH = app.screen.width / FLOOR_SEGMENTS_COUNT

class Ground
{
    constructor()
    {
        this.nodes = Array(FLOOR_SEGMENTS_COUNT).fill(DEFAULT_FLOOR_HEIGHT)
    }

    height_at(x_position)
    {
        if (x_position < 0)
            x_position = 0

        if (x_position > this.nodes.length - 1)
            x_position = this.nodes.length - 1

        let floating_part = x_position - Math.floor(x_position)
        return (
            this.nodes[Math.floor(x_position)] * x_position +
            this.nodes[Math.ceil(x_position)] * (1 - x_position)
        )
    }

    drow()
    {
        let ground = new PIXI.Graphics();
        app.stage.addChild(ground);

        ground.position.set(0, 0);

        ground.lineStyle(1, 0x00ff00)
            .moveTo(0, app.screen.height / 3 * 2)
            .lineTo(app.screen.width, app.screen.height / 3 * 2)
    }
}
