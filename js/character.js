CHARACTER_HEIGHT = 60

var yo = null

class Character
{

    constructor(x_position, scene)
    {
        this.scene = scene
        this.x_position = x_position

        this.left_leg = new PIXI.Graphics();
        this.right_leg = new PIXI.Graphics();

        this.key_state = {"1": false, "2": false};
        window.addEventListener("keydown", this.key_down.bind(this));
        window.addEventListener("keyup", this.key_up.bind(this));
    }

    key_down(key)
    {
        this.key_state[key.key] = true;

        if (key.key === "1")
            this.step_one();
        else if (key.key === "2")
            this.step_two();
        console.log(key);

    }

    key_up(key)
    {
        this.key_state[key.key] = false;
    }

    drow()
    {
        this.container = new PIXI.Container()
        graphics_container.addChild(this.container)

        this.container.addChild(this.left_leg);

        this.left_leg.position.set(0, 40);
        this.left_leg.beginFill(0xFF0000);
        this.left_leg.drawRect(0, 0, 5, 25);
        this.left_leg.endFill();
        this.left_leg.rotation = 0.5;

        this.container.addChild(this.right_leg);

        this.right_leg.position.set(0, 40);
        this.right_leg.beginFill(0xFFFF00);
        this.right_leg.drawRect(0, 0, 5, 25);
        this.right_leg.endFill();
        this.right_leg.rotation = -0.5;

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

    salut(delta, left, right)
    {
        console.log("salut")
    }

    yo(delta)
    {
        if (this.left_leg.rotation > -0.5)
        {
            this.left_leg.rotation -= 0.01 * delta;
            this.right_leg.rotation += 0.01 * delta;
        }
        else
        {
            console.log("bye");
            app.ticker.remove(this.yo, this)
        }
    }

    step_one()
    {
        if (this.left_leg.rotation >= 0.5 || this.left_leg.rotation <= -0.5)
        {
            app.ticker.add(this.yo, this)
        }
    }

    step_two()
    {
        app.ticker.add((delta) => {
            if (this.left_leg.rotation < 0.5)
                this.left_leg.rotation += 0.01 * delta;
            if (this.right_leg.rotation > -0.5)
                this.right_leg.rotation -= 0.01 * delta;
        });

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
