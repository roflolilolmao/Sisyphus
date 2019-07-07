function animate_dick()
{
    this.time -= ticker.deltaMS
    this.boom.alpha = this.time / current_bpm
    if (this.time <= 0)
    {
        ticker.remove(animate_dick, this)
        this.boom.destroy()
    }
}

class Fatigue
{
    constructor(character)
    {
        this.character = character
    }
    
    damage(amount)
    {
        let mateub = Math.min(this.character.fatigue, MAX_FATIGUE) * 2
        let mabite = Math.min(this.character.fatigue + amount, MAX_FATIGUE) * 2

        let boom = new PIXI.Graphics()
        boom.beginFill(0xff0000)
        boom.drawRect(5 + this.bar.width, 5, 5 + amount, 50)
        boom.endFill()
        boom.position.x = 0
        this.container.addChild(boom)

        this.bar.beginFill(0xF7CA18)
        this.bar.drawRect(5, 5, 5 + mabite, 50)
        this.bar.endFill()

        ticker.add(animate_dick, {'boom': boom, 'time': current_bpm})
    }

    drow()
    {
        this.container = new PIXI.Container()
        this.border = new PIXI.Graphics()
        this.bar = new PIXI.Graphics()
        
        this.border.lineStyle(10, 0xcccccc, 1);
        this.border.beginFill(0x888888);
        this.border.drawRect(0, 0, 210, 60);
        this.border.endFill();

        this.damage(0)

        this.container.position.set(
            app.screen.width * 0.1,
            app.screen.height * 0.9 - 60
        )

        app.stage.addChild(this.container)
        this.container.addChild(this.border)
        this.container.addChild(this.bar)
    }

    update()
    {

    }
}
