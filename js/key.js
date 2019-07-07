const KEY_LENGTHSIDE = 50
const KEY_RADIUS = 5

class Key
{
    constructor(x_position, scene)
    {
        this.scene = scene
        this.x_position = x_position
        this.key_to_print = "F"
    }

    drow()
    {
        this.container = new PIXI.Container()
        graphics_container.addChild(this.container)

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
        this.container.position.set(
            this.scene.screen_position_at(this.x_position),
            this.scene.height_at(this.x_position)
        )
        if (this.x_position < scene.character.x_position)
            graphics_container.removeChild(this.container);
    }
}
