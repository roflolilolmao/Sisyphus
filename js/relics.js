ENDURANCE_ID = 0

COLOR_LEVELS = [
    0xaaaaaa,
    0x8888ff,
    0x88ff88,
    0xffff88,
    0xff8888,
    0xff0000
]

FEATHER_SPRITE_RATIO = 0.33

class Relics
{
    constructor()
    {
        //this.relics = AVAILABLE_RELICS.map(r => new Relic(r))
        this.relics = []
        for (let i = 0; i < 6; i++)
        {
            let data = AVAILABLE_RELICS[1]
            let relic = new data.rarity(AVAILABLE_RELICS[0])
            this.relics.push(relic)
            relic.level = i
        }
    }

    drow()
    {
        this.relics.forEach(r => r.drow())
        for (let i = 0; i < 6; i++)
        {
            let relic = this.relics[i]
            relic.container.position.x = i * 70
        }
    }

    update()
    {
        this.relics.forEach(r => r.update())
    }
}

class Relic
{
    constructor(args)
    {
        this.level = 0
        this.base_price = args.base_price
        this.icon = textures.feather
        this.effect = args.effect
        this.color = args.color
    }

    level_up()
    {
        this.level++
        this.fill_border()
        this.fill_interior()
        this.scale_feather()
    }

    max_level()
    {
        return 5
    }

    fill_interior()
    {
        this.interior.beginFill(COLOR_LEVELS[this.level])
        this.interior.drawRect(5, 5, 50, 50)
        this.interior.endFill()
    }

    fill_border()
    {
        this.border.beginFill(0x550000 + 0x2222 * this.level)
        this.border.drawRoundedRect(0, 0, 60, 60, 5)
        this.border.endFill()
    }

    scale_feather()
    {
        let ratio = FEATHER_SPRITE_RATIO * (0.7 + 0.2 * this.level)
        this.feather.scale.set(ratio, ratio)
    }

    drow()
    {
        this.container = new PIXI.Container()
        this.border = new PIXI.Graphics()
        this.interior = new PIXI.Graphics()
        this.feather = new PIXI.Sprite.from(this.icon)

        graphics_container.addChild(this.container)
        this.container.addChild(this.border)
        this.container.addChild(this.interior)
        this.container.addChild(this.feather)

        this.fill_border()

        this.fill_interior()

        this.feather.anchor.set(0.5, 0.5)
        this.scale_feather()
        this.feather.position.set(30, 30)
    }

    update()
    {
    }
}

class LegendaryRelic extends Relic
{
    constructor(args)
    {
        super(args)
    }

    max_level()
    {
        return 1
    }

    fill_border()
    {
        this.border.beginFill(0xffd700)
        this.border.drawRoundedRect(0, 0, 60, 60, 5)
        this.border.endFill()
    }
}

AVAILABLE_RELICS = [
    {'name': 'Feather of endurance', 'rarity': Relic, 'color': 0xff7777, 'base_price': 5},
    {'name': 'Feather of ease', 'rarity': LegendaryRelic, 'color': 0xff7777, 'base_price': 500}
]
