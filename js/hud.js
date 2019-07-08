class Hud
{
    constructor()
    {
        this.hud = new PIXI.Container()
    }

    drow()
    {
        app.stage.addChild(this.hud)

        this.text_meters = new PIXI.Text("Altitude: " + altitude(), {fontSize: 40, fill: 0xbd3f1c, fontWeight: 600})
        this.text_bpm = new PIXI.Text("BPM: " + parseFloat(current_bpm).toFixed(1), {fontSize: 40, fill: 0xbd3f1c, fontWeight: 600})
        this.text_gold = new PIXI.Text("Gold: " + gold, {fontSize: 40, fill: 0xbd3f1c, fontWeight: 600})

        this.hud.addChild(this.text_meters)
        this.hud.addChild(this.text_bpm)
        this.hud.addChild(this.text_gold)

        this.hud.position.set(
            app.screen.width / 20,
            app.screen.height / 20
        )
        this.text_gold.position.y = 2 * this.text_meters.height + 2
        this.text_bpm.position.y = this.text_meters.height + 2
    }

    update()
    {
        this.text_meters.text = "Altitude: " + altitude()
        this.text_bpm.text = "BPM: " + parseFloat(current_bpm).toFixed(1)
        this.text_gold.text = "Gold: " + gold
    }
}
