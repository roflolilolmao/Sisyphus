const GROUND_SEGMENTS_COUNT = 10
const GROUND_SEGMENTS_LENGTH = app.screen.width / (GROUND_SEGMENTS_COUNT - 1)
const GROUND_NOISE = 10
const DEFAULT_GROUND_HEIGHT = app.screen.height / 3 * 2

class Ground
{
    constructor()
    {
        this.nodes = Array(GROUND_SEGMENTS_COUNT)
            .fill(DEFAULT_GROUND_HEIGHT)
            .map(n => n + Math.random() * 2 * GROUND_NOISE - GROUND_NOISE)
        this.graphics = new PIXI.Graphics()
        app.stage.addChild(this.graphics)
    }

    height_at(x_position)
    {
        if (x_position < 0)
            x_position = 0

        if (x_position > this.nodes.length - 1)
            x_position = this.nodes.length - 1

        let floating_part = x_position - Math.floor(x_position)
        return (
            this.nodes[Math.floor(x_position)] * floating_part +
            this.nodes[Math.ceil(x_position)] * (1 - floating_part)
        )
    }

    screen_position_at(x_position)
    {
        return x_position * GROUND_SEGMENTS_LENGTH
    }

    drow()
    {
        this.graphics.position.set(0, 0)

        this.graphics.lineStyle(1, 0x00ff00)
            .moveTo(0, this.height_at(0))
        let aled = this
        this.nodes.forEach(
            function(n, i)
            {
                aled.graphics.lineTo(
                    i * GROUND_SEGMENTS_LENGTH,
                    aled.height_at(i))
            }
        )
    }
}
