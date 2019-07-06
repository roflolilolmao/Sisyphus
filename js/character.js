CHARACTER_HEIGHT = 60

class Character
{
    constructor(x_position, scene)
    {
        this.scene = scene
        this.x_position = x_position
    }

    drow()
    {
        this.container = new PIXI.Container()
        app.stage.addChild(this.container)
        let left_leg = new PIXI.Graphics();
        this.container.addChild(left_leg);

        left_leg.position.set(0, 40);
        left_leg.beginFill(0xFF0000);
        left_leg.drawRect(0, 0, 5, 25);
        left_leg.endFill();
        left_leg.rotation = 0.5;

        let right_leg = new PIXI.Graphics();
        this.container.addChild(right_leg);

        right_leg.position.set(0, 40);
        right_leg.beginFill(0xFFFF00);
        right_leg.drawRect(0, 0, 5, 25);
        right_leg.endFill();
        right_leg.rotation = -0.5;

        let body = new PIXI.Graphics();
        this.container.addChild(body);

        body.position.set(0, 5);
        body.beginFill(0x00FF00);
        body.drawRect(0, 0, 5, 35);
        body.endFill();

        let arms = new PIXI.Graphics();
        this.container.addChild(arms);

        arms.position.set(0, 15);
        arms.beginFill(0x0000FF);
        arms.drawRect(0, 0, 5, 20);
        arms.endFill();
        arms.rotation = -1.8;

        let head = new PIXI.Graphics();
        this.container.addChild(head);

        head.position.set(0, 0);
        head.beginFill(0x0FFFF0);
        head.drawCircle(0, 0, 8);
        head.endFill();
    }

    update()
    {
        this.container.position.set(
            this.scene.screen_position_at(this.x_position),
            scene.height_at(this.x_position) - CHARACTER_HEIGHT)
    }

    move(distance)
    {
        this.x_position += distance
        this.scene.rock.x_position = this.x_position + 0.5
    }
}
