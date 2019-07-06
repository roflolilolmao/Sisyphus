let CHARACTER_HEIGHT = 40;

class Character
{
    constructor(x_position, scene)
    {
        this.height = scene.ground_height_at(x_position) + CHARACTER_HEIGHT / 2
        this.x_position = x_position
    }

    drow()
    {
        let character = new PIXI.Graphics();
        app.stage.addChild(character);

        character.position.set(0, 0);
        character.beginFill(0xFF00000);
        character.drawRect(0, 0, 20, 80);
        character.endFill();
        character.position.set(60, app.screen.height / 3 * 2 - character.height);
    }
}
