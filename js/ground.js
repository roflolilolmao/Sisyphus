const GROUND_SEGMENTS_COUNT = 10
const GROUND_SEGMENTS_LENGTH = app.screen.width / (GROUND_SEGMENTS_COUNT - 1)
const GROUND_NOISE = 10
const DEFAULT_GROUND_HEIGHT = app.screen.height / 3 * 2
const PRELOADED_SEGMENTS = 15

function _add_segment(nodes)
{
    let n = nodes.length
    let current_slope = (current_bpm - 80) / 60 * GROUND_SEGMENTS_LENGTH
    console.log(current_bpm, current_slope)
    nodes.push(-current_slope + Math.random() * 2 * GROUND_NOISE - GROUND_NOISE)
}

class Ground
{
    constructor(scene)
    {
        this.scene = scene
        this.nodes = []
        for(let i = 0; i < PRELOADED_SEGMENTS; i++)
            _add_segment(this.nodes)
    }

    height_at(x_position)
    {
        if (x_position < 0)
            x_position = 0

        if (x_position > this.nodes.length - 1)
            x_position = this.nodes.length - 1

        let floating_part = x_position - Math.floor(x_position)
        return (
            this.nodes[Math.floor(x_position)] * (1 - floating_part) +
            this.nodes[Math.ceil(x_position)] * floating_part
        )
    }

    screen_position_at(x_position)
    {
        return x_position * GROUND_SEGMENTS_LENGTH
    }

    drow()
    {
        this.graphics = new PIXI.Graphics()
        graphics_container.addChild(this.graphics)
        this.graphics.position.set(0, 0)

        this.graphics.lineStyle(5, 0x00ff00)
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

    update()
    {
        if (this.scene.character.x_position < this.nodes.length - PRELOADED_SEGMENTS)
            return

        _add_segment(this.nodes)
        let n = this.nodes.length - 1
        this.graphics
            .moveTo((n - 1) * GROUND_SEGMENTS_LENGTH, this.height_at(n - 1))
            .lineTo(n * GROUND_SEGMENTS_LENGTH, this.height_at(n))
    }
}
