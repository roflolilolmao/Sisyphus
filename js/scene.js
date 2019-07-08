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
        this.keys = new Keys(this)
        this.hud = new Hud()

        this.game_objects = [
            this.sky,
            this.ground,
            // this.lines,
            this.character,
            this.rock,
            this.vegetation,
            this.fatigue,
            this.keys,
            this.hud
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
        this.character.move(0)
    }

    update()
    {
        this.game_objects.forEach(go => go.update())
    }
}
