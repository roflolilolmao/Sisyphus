class Sky
{
    drow()
    {
        this.sprite = new PIXI.TilingSprite(
            textures.sky,
            app.screen.width,
            app.screen.height
        )
        app.stage.addChildAt(this.sprite, 0)
    }

    update()
    {
    }
}
