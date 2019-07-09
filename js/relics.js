COLOR_LEVELS = [
    0xaaaaaa,
    0x8888ff,
    0x88ff88,
    0xffff88,
    0xff8888,
    0xff0000
]

FEATHER_SPRITE_RATIO = 0.33

function random_relics()
{
    let a = []
    relics.forEach(function(r) {
        if (r.level != r.max_level())
            a.push(r)
    })
    for (let i = a.length - 1; i > 0; i--)
    {
        let j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a.splice(0, 5)
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
        if (this.level >= this.max_level())
            return this.level

        if (try_to_buy(this.base_price))
        {
            this.level++
            let lelelel = this
            scene.hud_relics.relics.forEach(function(r) {
                if (r.relic === lelelel)
                    r.level_up()
            })
            scene.shop_relics.relics.forEach(function(r) {
                if (r.relic === lelelel)
                    r.level_up()
            })
        }

        return this.level
    }

    max_level()
    {
        return 5
    }

    drow_class()
    {
        return DrowRelic
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

    drow_class()
    {
        return DrowLegendaryRelic
    }
}

class ShopRelics
{
    constructor()
    {
        this.container = new PIXI.Container()
        this.relics = random_relics().map(r => new (r.drow_class())(this.container, r, true))
    }

    drow()
    {
        graphics_container.addChild(this.container)

        this.container.position.set(scene.screen_position_at(0), scene.height_at(0) - 400)
        this.relics.forEach(function(relic, i) {
            relic.drow()
            relic.container.position.y = i * 70
        })
    }

    update()
    {
        this.relics.forEach(r => r.update())
    }
}

class HUDRelics
{
    constructor()
    {
        this.container = new PIXI.Container()
        this.relics = relics.map(r => new (r.drow_class())(this.container, r, false))
    }

    drow()
    {
        app.stage.addChild(this.container)

        this.container.position.set(app.screen.width / 3, 20)
        this.relics.forEach(function(relic, i) {
            relic.drow()
            relic.container.position.x = i * 70
        })
    }

    update()
    {
        this.relics.forEach(r => r.update())
    }
}
class DrowRelic
{
    constructor(parent_container, relic, clickable)
    {
        this.parent_container = parent_container
        this.level = relic.level
        this.base_price = relic.base_price
        this.icon = relic.icon
        this.effect = relic.effect
        this.color = relic.color
        this.relic = relic

        this.container = new PIXI.Container()

        if (!clickable)
            return

        this.container.hitArea = new PIXI.Polygon([
            new PIXI.Point(0, 0),
            new PIXI.Point(0, 60),
            new PIXI.Point(60, 60),
            new PIXI.Point(60, 0)
        ])
        this.container.interactive = true;
        this.container.on('click', (event) => {
            relic.level_up()
        })
    }

    level_up()
    {
        this.level = this.relic.level
        this.fill_border()
        this.fill_interior()
        this.scale_feather()
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
        this.border = new PIXI.Graphics()
        this.interior = new PIXI.Graphics()
        this.feather = new PIXI.Sprite.from(this.icon)

        this.parent_container.addChild(this.container)
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

class DrowLegendaryRelic extends DrowRelic
{
    constructor(container, relic, clickable)
    {
        super(container, relic, clickable)
    }

    fill_border()
    {
        this.border.beginFill(0xffd700)
        this.border.drawRoundedRect(0, 0, 60, 60, 5)
        this.border.endFill()
    }

    fill_interior()
    {
        this.interior.beginFill(COLOR_LEVELS[this.level * 5])
        this.interior.drawRect(5, 5, 50, 50)
        this.interior.endFill()
    }

    scale_feather()
    {
        let ratio = FEATHER_SPRITE_RATIO * (0.7 + 0.2 * 5)
        this.feather.scale.set(ratio, ratio)
    }
}

ENDURANCE_ID = 0

AVAILABLE_RELICS = [
    {'name': 'Feather of endurance', 'rarity': Relic, 'color': 0xff7777, 'base_price': 5},
    {'name': 'Feather of ease', 'rarity': LegendaryRelic, 'color': 0xff7777, 'base_price': 500}
]

let relics = AVAILABLE_RELICS.map(r => new r.rarity(r))
