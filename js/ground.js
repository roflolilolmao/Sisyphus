const GROUND_SEGMENTS_COUNT = 10
const GROUND_SEGMENTS_LENGTH = app.screen.width / (GROUND_SEGMENTS_COUNT - 1)
const GROUND_NOISE = 10
const DEFAULT_GROUND_HEIGHT = app.screen.height / 3 * 2
const PRELOADED_SEGMENTS = 8

class Ground
{
    constructor(scene)
    {
        this.scene = scene
        this.nodes = []
        this.sky_mask = new PIXI.Container()

        for(let i = 0; i < PRELOADED_SEGMENTS; i++)
            this.add_segment(this.nodes)
    }

    add_segment()
    {
        let n = this.nodes.length
        let current_slope = (current_bpm - START_BPM) / 60 * GROUND_SEGMENTS_LENGTH / Math.log(current_bpm / 4)
        this.nodes.push(
            -(n - PRELOADED_SEGMENTS) * current_slope
            + Math.random() * 2 * GROUND_NOISE - GROUND_NOISE
        )

        let left = (n - 2) * GROUND_SEGMENTS_LENGTH
        let right = (n - 1) * GROUND_SEGMENTS_LENGTH
        let left_point = new PIXI.Point(left, this.height_at(n - 2))
        let right_point = new PIXI.Point(right, this.height_at(n - 1))

        let mask_piece = new PIXI.Graphics()
        this.sky_mask.addChild(mask_piece)
        new PIXI.Point(left, this.height_at(n - 2))
        mask_piece.beginFill(0xFF0000)
        mask_piece.drawPolygon([
            new PIXI.Point(left, 2000),
            new PIXI.Point(right, 2000),
            right_point,
            left_point
        ])

        this.scene.vegetation.add_plants(this)
        // this.scene.lines.add_line(left_point, right_point)
    }

    random_x_on_last_segment()
    {
        return this.nodes.length - 2 + Math.random()
    }

    random_point_on_last_segment()
    {
        let x = this.random_x_on_last_segment()
        let y = Math.random() * app.screen.height + this.height_at(x)
        return {
            'x': x,
            'y': y
        }
    }

    height_at(x_position)
    {
        if (x_position < 0)
            x_position = 0

        if (x_position > this.nodes.length - 1)
            x_position = this.nodes.length - 1

        let floating_part = x_position - Math.floor(x_position)
        return (
            this.nodes[Math.floor(x_position)] * (1 - floating_part)
            + this.nodes[Math.ceil(x_position)] * floating_part
        )
    }

    screen_position_at(x_position)
    {
        return x_position * GROUND_SEGMENTS_LENGTH
    }

    drow()
    {
        graphics_container.addChild(this.sky_mask)
        this.sprite = new PIXI.TilingSprite(
            textures.ground,
            app.screen.width,
            app.screen.height
        )
        this.sprite.mask = this.sky_mask
        app.stage.addChildAt(this.sprite, 1)
    }

    update()
    {
        if (this.scene.character.x_position < this.nodes.length - PRELOADED_SEGMENTS)
            return

        this.add_segment(this.nodes)
    }
}
