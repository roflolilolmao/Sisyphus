class Scene
{
    constructor()
    {
        this.ground = new Ground()
        this.character = new Character(60, this)
        this.rock = new Rock(120, this)
    }

    ground_height_at(x_position)
    {
        return this.ground.height_at(x_position)
    }

    drow()
    {
        this.rock.drow()
        this.character.drow()
        this.ground.drow()
    }
}
