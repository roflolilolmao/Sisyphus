let CHARACTER_HEIGHT = 40;

class Character
{
    constructor(x_position, scene)
    {
        this.height = scene.floor_height_at(x_position) + CHARACTER_HEIGHT / 2
        this.x_position = x_position
    }
}
