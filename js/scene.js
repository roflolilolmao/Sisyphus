let DEFAULT_FLOOR_HEIGHT = 20

class Scene
{
    constructor()
    {
        this.floor = Array(SCREEN_WIDTH).fill(DEFAULT_FLOOR_HEIGHT)
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
