class Scene
{
    constructor()
    {
        this.sky = new Sky()
        this.vegetation = new Vegetation(this)
        // this.lines = new Lines(this)
        this.ground = new Ground(this)
        this.character = new Character(2, this)
        this.rock = new Rock(2.5, this)
        this.key = new Key(this.character.x_position + 5, this)

        this.game_objects = [
            this.sky,
            this.ground,
            // this.lines,
            this.character,
            this.rock,
            this.vegetation,
            this.key
        ]
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
