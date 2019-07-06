let DEFAULT_FLOOR_HEIGHT = 20
let NOISE = 10
let FLOOR_SEGMENTS_COUNT = 10
let FLOOR_SEGMENTS_LENGTH = SCREEN_WIDTH / FLOOR_SEGMENTS_COUNT

class Scene
{
    constructor()
    {
        this.floor = Array(FLOOR_SEGMENTS_COUNT).fill(DEFAULT_FLOOR_HEIGHT)
        this.character = new Character(floor.length / 2, this)
    }

    floor_height_at(x_position)
    {
        if (x_position < 0)
            x_position = 0

        if (x_position > this.floor.length - 1)
            x_position = this.floor.length - 1

        let floating_part = x_position - Math.floor(x_position)
        return (
            this.floor[Math.floor(x_position)] * x_position +
            this.floor[Math.ceil(x_position)] * (1 - x_position)
        )
}
