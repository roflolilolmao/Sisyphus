const KEYS =
    {
        "f": step_left,
        "j": step_right
    }

const KEY_LENGTHSIDE = 50
const KEY_RADIUS = 5

var expected_keys = [["f"],["j"],["f"],["j"],["f"]]

function queue_keys(keys)
{
    expected_keys.push(keys)
    keys.forEach((elem, counter) => {
       let new_key = new KeyStack(
            6 * (counter + 1) + scene.character.x_position,
            0,
            elem)
        new_key.drow()
        scene.keys.keys.push(new_key)
    })
}


class Keys
{
    constructor(scene)
    {
        this.scene = scene
        this.keys = []
        expected_keys.forEach((elem, counter) => {
            this.keys.push(new KeyStack(this.scene.character.x_position + 6 * counter * 0.2, 0, elem))
        })
    }

    drow()
    {
        this.keys.forEach(k => k.drow())
    }

    update()
    {
        this.keys.forEach(k => k.update())
    }
}

class KeyStack
{
    constructor(x_position, y, char)
    {
        this.x_position = x_position
        this.key_to_print = char
        this.y = y
        this.container = new PIXI.Container()
    }

    drow()
    {
        graphics_container.addChild(this.container)

        this.container.position.set(
            scene.screen_position_at(this.x_position),
            scene.ground.height_at(this.x_position) + this.y
        )

        this.rect = new PIXI.Graphics();
        this.rect.beginFill(0xFFFFFF);
        this.rect.drawRoundedRect(
            0,
            10,
            KEY_LENGTHSIDE,
            KEY_LENGTHSIDE,
            KEY_RADIUS
        );
        this.rect.endFill()
        this.container.addChild(this.rect)

        this.text = new PIXI.Text(this.key_to_print, {fontSize: 36})
        this.container.addChild(this.text)

        this.text.position.x = this.container.width / 2 - this.text.width / 2
        this.text.position.y = this.container.height / 2 - this.text.height / 2 + 5
    }

    update()
    {
        if (this.x_position < scene.character.x_position)
            graphics_container.removeChild(this.container);
    }
}
