const KEYS_SPECIFICS = {
    'j': {'y_offset': 0, 'color': 0x55ff55},
    'f': {'y_offset': 40, 'color': 0xff5555},
    'd': {'y_offset': 80, 'color': 0x5555ff},
    'k': {'y_offset': 120, 'color': 0xff55ff}
}

const AVAILABLE_KEYS = [
    'j', 'f', 'k', 'd'
]

let next_step = step_left

KEY_FALSE = -1
KEY_INCOMPLETE = 0
KEY_CORRECT = 1

const KEY_LENGTHSIDE = 50
const KEY_RADIUS = 5

const KEYS_SEPARATION = 2
let keys_spawned = 0

function random_keys()
{
    return [AVAILABLE_KEYS[Math.floor(Math.random() * AVAILABLE_KEYS.length)]]
}

function queue_keys()
{
    let keys = null
    if (scene.keys.keys[scene.keys.keys.length - 1].contains('f'))
        keys = ['j']
    else
        key = ['f']
    keys = random_keys()

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

        this.container.position.set(0, KEYS_SPECIFICS[this.key_to_print].y_offset)

        this.rect = new PIXI.Graphics();
        this.rect.beginFill(KEYS_SPECIFICS[this.key_to_print].color);
        this.rect.drawRoundedRect(
            0,
            10,
            KEY_LENGTHSIDE,
            KEY_LENGTHSIDE,
            KEY_RADIUS
        );
        this.rect.endFill()
        this.container.addChild(this.rect)

        this.text = new PIXI.Text(this.key_to_print, {fontSize: 36, color: 0xffffff})
        this.container.addChild(this.text)

        this.text.position.x = this.container.width / 2 - this.text.width / 2
        this.text.position.y = this.container.height / 2 - this.text.height / 2 + 5
    }

    update()
    {
    }
}
