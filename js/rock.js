class Rock
{
    drow()
    {
        let rock = new PIXI.Graphics();
        app.stage.addChild(rock);

        rock.position.set(0, 0);
        rock.beginFill(0xFFFFFFF);
        rock.drawCircle(120, app.screen.height / 3 * 2 - 30, 30);
        rock.endFill()
    }
}
