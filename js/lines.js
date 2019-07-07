class Lines
{
    constructor(scene)
    {
        this.scene = scene
        this.container = new PIXI.Container()
    }

    add_line(left, right)
    {
        let sprite = new PIXI.Sprite.from(textures['line'])
        let line = new PIXI.Graphics()
        this.container.addChild(line)

        line.lineTextureStyle(36, sprite.texture);

        line.moveTo(left.x, left.y);
        line.lineTo(right.x, right.y);
    }

    drow()
    {
        graphics_container.addChild(this.container)
    }

    update()
    {
    }
}
