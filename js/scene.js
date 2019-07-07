class Scene
{
    constructor()
    {
        this.sky = new Sky()
        this.vegetation = new Vegetation(this)
        // this.lines = new Lines(this)
        this.ground = new Ground(this)
        this.character = new Character(2, this)
        this.rock = new Rock(3, this)
        this.fatigue = new Fatigue(this.character)

        this.game_objects = [
            this.sky,
            this.ground,
            // this.lines,
            this.character,
            this.rock,
            this.vegetation,
            this.fatigue
         ]
        expected_keys.forEach((elem, counter) => {
            this.game_objects.push(new Key(this.character.x_position + 6 * counter, 0, elem))
        })
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
        this.character.move(0)
    }

    update()
    {
        this.game_objects.forEach(go => go.update())
    }
}
