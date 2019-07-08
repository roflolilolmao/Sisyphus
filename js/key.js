let next_step = step_left

KEY_FALSE = -1
KEY_INCOMPLETE = 0
KEY_CORRECT = 1

const KEY_LENGTHSIDE = 50
const KEY_RADIUS = 5

const KEYS_SEPARATION = 2
let keys_spawned = 0

function queue_keys()
{
    if (scene.keys.keys[scene.keys.keys.length - 1].contains('f'))
        keys = ['j']
    else
        keys = ['f']

    let stack = new KeyStack(
        keys_spawned * KEYS_SEPARATION + CHARACTER_SPAWN_POINT,
        keys
    )
    scene.keys.keys.push(stack)
    stack.drow()
}

class Keys
{
    constructor(scene)
    {
        this.scene = scene
        this.keys = []
        let expected_keys = [['f'], ['j'], ['f'], ['j'], ['f']]

        expected_keys.forEach((elem, counter) => {
            this.keys.push(new KeyStack(keys_spawned * KEYS_SEPARATION + CHARACTER_SPAWN_POINT, elem))
        })
    }

    try_key(letter)
    {
        let result = this.keys[0].try_key(letter)
        if (result == KEY_CORRECT)
        {
            this.keys[0].container.destroy({'children': true})
            this.keys.splice(0, 1)
        }
        return result
    }

    next_key_position()
    {
        return this.keys[0].x_position
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
    constructor(x_position, chars)
    {
        keys_spawned++
        this.x_position = x_position
        this.keys = chars.map(c => new Key(this, c))
        this.container = new PIXI.Container()
    }

    try_key(letter)
    {
        if (this.contains(letter))
        {
            for(let i = 0; i < this.keys.length; i++)
            {
                if (this.keys[i].key_to_print == letter)
                {
                    this.keys[i].container.destroy({'children': true})
                    this.keys.splice(i, 1)
                    break
                }
            }
            if (this.keys.length == 0)
                return KEY_CORRECT
            return KEY_INCOMPLETE
        }
        return KEY_FALSE
    }

    contains(letter)
    {
        return this.keys.some(k => k.key_to_print == letter)
    }

    drow()
    {
        graphics_container.addChild(this.container)
        this.container.position.set(
            scene.screen_position_at(this.x_position),
            scene.ground.height_at(this.x_position)
        )
        this.keys.forEach(k => k.drow())
    }

    update()
    {
        if (this.x_position < scene.character.x_position)
            graphics_container.removeChild(this.container);
    }
}

class Key
{
    constructor(stack, char)
    {
        this.stack = stack
        this.key_to_print = char
        this.container = new PIXI.Container()
    }

    drow()
    {
        this.stack.container.addChild(this.container)

        this.container.position.set(0, 0)

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
    }
}
