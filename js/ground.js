const GROUND_SEGMENTS_COUNT = 10
const GROUND_SEGMENTS_LENGTH = app.screen.width / GROUND_SEGMENTS_COUNT
const DEFAULT_GROUND_HEIGHT = app.screen.height / 3 * 2

class Ground
{
    constructor()
    {
        this.nodes = Array(GROUND_SEGMENTS_COUNT).fill(DEFAULT_GROUND_HEIGHT)
        this.graphics = new PIXI.Graphics()
        app.stage.addChild(this.graphics)
    }

    height_at(x_position)
    {
        let nodes_x =  x_position / GROUND_SEGMENTS_LENGTH
        if (nodes_x < 0)
            nodes_x = 0

        if (nodes_x > this.nodes.length - 1)
            nodes_x = this.nodes.length - 1

        let floating_part = nodes_x - Math.floor(nodes_x)
        return (
            this.nodes[Math.floor(nodes_x)] * floating_part +
            this.nodes[Math.ceil(nodes_x)] * (1 - floating_part)
        )
    }

    drow()
    {
        this.graphics.position.set(0, 0)

        this.graphics.lineStyle(1, 0x00ff00)
            .moveTo(0, this.height_at(0))
            .lineTo(app.screen.width, this.height_at(0))
    }
}
