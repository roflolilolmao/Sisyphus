COLOR_LEVELS = [
    0xaaaaaa,
    0x8888ff,
    0x88ff88,
    0xffff88,
    0xff8888,
    0xff0000
]

let bought_items_count = 0

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
    return a.splice(0, 4)
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
        this.name = args.name
        this.text = args.text
    }

    price()
    {
        return Math.floor(this.base_price * (1 + this.level) * Math.pow(1.01, bought_items_count))
    }

    level_up()
    {
        if (this.level >= this.max_level())
            return this.level

        if (try_to_buy(this.price()))
        {
            this.level++
            bought_items_count++
            let lelelel = this
            scene.hud_relics.relics.forEach(function(r) {
                if (r.relic === lelelel)
                    r.level_up()
                r.update_shit()
            })
            scene.shop_relics.relics.forEach(function(r) {
                if (r.relic === lelelel)
                    r.level_up()
                r.update_shit()
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
    constructor(parent_container, relic, shop)
    {
        this.parent_container = parent_container
        this.level = relic.level
        this.icon = relic.icon
        this.effect = relic.effect
        this.color = relic.color
        this.relic = relic
        this.shop = shop

        this.container = new PIXI.Container()

        if (!shop)
            return

        this.container.hitArea = new PIXI.Polygon([
            new PIXI.Point(0, 0),
            new PIXI.Point(0, 60),
            new PIXI.Point(60, 60),
            new PIXI.Point(60, 0)
        ])
        this.container.interactive = true
        this.container.on('click', (event) => {
            relic.level_up()
        })
    }

    level_up()
    {
        this.level = this.relic.level
    }

    update_shit()
    {
        this.fill_border()
        this.fill_interior()
        this.scale_feather()
        this.gold.text = this.gold_text()
        this.tooltip.text = this.tooltip_text()
        this.container.visible = this.shop || this.level > 0
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

    gold_text()
    {
        return '' + this.relic.price()
    }

    tooltip_text()
    {
        return this.relic.text
    }

    drow()
    {
        this.border = new PIXI.Graphics()
        this.interior = new PIXI.Graphics()
        this.feather = new PIXI.Sprite.from(this.icon)

        this.gold = new PIXI.Text(this.gold_text(), {fontSize: 16, fill: 0xffd700, fontWeight: 60})
        this.gold.position.set(10, 35)
        this.tooltip = new PIXI.Text(this.tooltip_text(), {fontSize: 20, fill: 0x220011, fontWeight: 120})
        this.tooltip.position.set(70, 20)

        this.container.visible = this.shop || this.level > 0

        this.parent_container.addChild(this.container)
        this.container.addChild(this.border)
        this.container.addChild(this.interior)
        this.container.addChild(this.feather)

        if (this.shop)
        {
            this.container.addChild(this.gold)
            this.container.addChild(this.tooltip)
        }

        this.fill_border()
        this.fill_interior()

        this.feather.anchor.set(0.5, 0.5)
        this.scale_feather()
        this.feather.position.set(30, 30)
        this.feather.tint = this.color
    }

    update()
    {
    }
}

class DrowLegendaryRelic extends DrowRelic
{
    constructor(container, relic, shop)
    {
        super(container, relic, shop)
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
TOUGHNESS_ID = 1
MIDAS_ID = 2
TARDNESS_ID = 3
MASTERY_ID = 4
GREAT_LUCK_ID = 5
EASE_ID = 6
TURTLE_ID = 7

AVAILABLE_RELICS = [
    {'name': 'Feather of endurance', 'rarity': Relic, 'color': 0xff7b7e, 'base_price': 5, 'text': 'Fatigue regenerates over time'},
    {'name': 'Feather of toughness', 'rarity': Relic, 'color': 0xc7642d, 'base_price': 1, 'text': 'Receive more gold'},
    {'name': 'Feather of Midas', 'rarity': Relic, 'color': 0x08fb9a, 'base_price': 10, 'text': 'Receive less fatigue'},
    {'name': 'Feather of tardness', 'rarity': Relic, 'color': 0x7e3dc9, 'base_price': 10, 'text': 'Difficulty ramps up more slowly'},
    {'name': 'Feather of mastery', 'rarity': Relic, 'color': 0xf5e098, 'base_price': 15, 'text': 'Notes are easier to hit'},
    {'name': 'Feather of great luck', 'rarity': Relic, 'color': 0x8450ce, 'base_price': 15, 'text': 'Chords are rarer'},
    {'name': 'Feather of ease', 'rarity': LegendaryRelic, 'color': 0x0f77d7, 'base_price': 500, 'text': 'BPM rises more slowly'},
    {'name': 'Feather of the turtle', 'rarity': LegendaryRelic, 'color': 0x9c95c6, 'base_price': 300, 'text': 'BPM starts at a lower value'}
]

let relics = AVAILABLE_RELICS.map(r => new r.rarity(r))
