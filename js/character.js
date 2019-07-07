CHARACTER_HEIGHT = 50

class Character
{

    constructor(x_position, scene)
    {
        this.scene = scene
        this.x_position = x_position

        this.left_leg = new PIXI.Sprite.from('https://roflolilolmao.github.io/Sisyphus/assets/images/CharacterLeg01.png');
        this.right_leg = new PIXI.Sprite.from('https://roflolilolmao.github.io/Sisyphus/assets/images/CharacterLeg02.png');
        this.head = new PIXI.Sprite.from('https://roflolilolmao.github.io/Sisyphus/assets/images/CharacterHead.png');

        this.key_state = {"1": false, "2": false, "3":false};
        window.addEventListener("keydown", this.key_down.bind(this));
        window.addEventListener("keyup", this.key_up.bind(this));
    }

    key_down(key)
    {
        this.key_state[key.key] = true;

        if (key.key === "1") {
            if (this.left_leg.rotation >= 0.3)
                app.ticker.add(this.step_one, this)
        }

        if (key.key === "2")
        {
            if (this.left_leg.rotation <= 0.3)
                app.ticker.add(this.step_two, this)
        }
        if (key.key === "3")
        {
            app.ticker.add(this.head_butt_down, this)
        }

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

        this.left_leg.position.set(-175, -10);
        this.left_leg.scale.x = 0.2;
        this.left_leg.scale.y = 0.2;
        this.left_leg.rotation = 0.3;

        this.container.addChild(this.right_leg);

        this.right_leg.position.set(-165, -5);
        this.right_leg.scale.x = 0.2;
        this.right_leg.scale.y = 0.2;
        this.right_leg.rotation = -0.3;

        let body = new PIXI.Sprite.from('https://roflolilolmao.github.io/Sisyphus/assets/images/CharacterBody.png');
        this.container.addChild(body);

        body.position.set(-200, -45);
        body.scale.x = 0.2;
        body.scale.y = 0.2;

        this.container.addChild(this.head);

        this.head.position.set(-160, -35);
        this.head.anchor.set(0.1, 0.8);
        this.head.scale.x = 0.2;
        this.head.scale.y = 0.2;
        this.head_bobble();
    }

    head_butt_up(delta)
    {
        if (this.head.rotation >= 0)
            this.head.rotation -= 0.03 * delta
        else
            app.ticker.remove(this.head_butt_up, this)
    }

    head_butt_down(delta)
    {
        if (this.head.rotation <= 0.5)
            this.head.rotation += 0.06 * delta
        else
        {
            app.ticker.remove(this.head_butt_down, this)
            app.ticker.add(this.head_butt_up, this)
        }
    }

    step_one(delta)
    {
        if (this.left_leg.rotation >= -0.3)
        {
            this.left_leg.rotation -= 0.02 * delta;
            this.right_leg.rotation += 0.02 * delta;
        }
        else
            app.ticker.remove(this.step_one, this)
    }


    step_two(delta)
    {
        if (this.left_leg.rotation < 0.3)
        {
            this.left_leg.rotation += 0.02 * delta;
            this.right_leg.rotation -= 0.02 * delta;
        }
        else
            app.ticker.remove(this.step_two, this)

    }

    head_bobble()
    {
        let direction = 0.005

        app.ticker.add((delta) => {
            if (this.head.rotation >= 0.1 || this.head.rotation <= -0.1)
                direction *= -1;
            this.head.rotation += direction
        })
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
