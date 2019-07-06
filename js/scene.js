let DEFAULT_FLOOR_HEIGHT = 20
let NOISE = 10

class Scene
{
    constructor()
    {
        this.rock = new Rock()
        this.ground = new Ground()
        this.character = new Character(app.screen.width / 2, this)
    }

    ground_height_at(x_position)
    {
        this.ground.height_at(x_position)
    }

    drow()
    {
        this.rock.drow()
        this.character.drow()
        this.ground.drow()
    }
}
