class Scene
{
    constructor()
    {
        this.ground = new Ground(this)
        this.character = new Character(2, this)
        this.rock = new Rock(2.5, this)
        this.sky = new Sky()

        this.game_objects = [this.ground, this.character, this.rock, this.sky]
    }

    height_at(x_position)
    {
        return this.ground.height_at(x_position)
    }

    screen_position_at(x_position)
    {
        return this.ground.screen_position_at(x_position)
    }

    drow()
    {
        this.game_objects.forEach(go => go.drow())
    }

    update()
    {
        this.game_objects.forEach(go => go.update())
    }
}
