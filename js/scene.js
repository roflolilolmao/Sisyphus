class Scene
{
    constructor()
    {
        this.ground = new Ground()
        this.character = new Character(2, this)
        this.rock = new Rock(2.5, this)
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
        this.rock.drow()
        this.character.drow()
        this.ground.drow()
    }
}
