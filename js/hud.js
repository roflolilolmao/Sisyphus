class Hud
{
    constructor()
    {
        this.hud = new PIXI.Container()
    }

    drow()
    {
        graphics_container.addChild(this.hud)
    }

    update()
    {
        this.hud.removeChild(this.text_meters)
        this.hud.removeChild(this.text_bpm)
        this.hud.removeChild(this.text_gold)

        this.meter = -Math.round(scene.ground.height_at(scene.character.x_position) / GROUND_SEGMENTS_LENGTH)
        this.text_meters = new PIXI.Text("Meters: " + this.meter, {fontSize: 40, fill: 0xbd3f1c, fontWeight: 600})

        this.text_bpm = new PIXI.Text("BPM: " + parseFloat(current_bpm).toFixed(1), {fontSize: 40, fill: 0xbd3f1c, fontWeight: 600})
        this.text_bpm.position.y = this.text_meters.height + 2

        this.gold = 0
        this.text_gold = new PIXI.Text("Gold: " + this.gold, {fontSize: 40, fill: 0xbd3f1c, fontWeight: 600})
        this.text_gold.position.y = 2 * this.text_meters.height + 2

        this.hud.addChild(this.text_meters)
        this.hud.addChild(this.text_bpm)
        this.hud.addChild(this.text_gold)

        this.hud.position.set(
            scene.screen_position_at(scene.character.x_position) - app.screen.width / 3,
            scene.height_at(scene.character.x_position) - 2 * app.screen.height / 3
        )
    }
}