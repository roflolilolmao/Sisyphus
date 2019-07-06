class Sky
{
    drow()
    {
        this.sprite = new PIXI.TilingSprite(
            textures.sky,
            app.screen.width,
            app.screen.height
        )
        app.stage.addChild(this.sprite)
    }

    update()
    {
        this.sprite.tilePosition.x += current_speed() / 4
    }
}
