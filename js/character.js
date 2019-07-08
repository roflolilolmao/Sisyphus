const CHARACTER_HEIGHT = 50
const BASE_RIGHT_LEG_ROTATION = -0.3
const BASE_LEFT_LEG_ROTATION = 0.3
const BASE_HEAD_BOBBLE_RETARDNESS = 0.4
const HEAD_BOBBLE_AMPLITUDE = 0.3
const LEG_AMPLITUDE = BASE_LEFT_LEG_ROTATION - BASE_RIGHT_LEG_ROTATION

const MAX_FATIGUE = 100

class Character
{

    constructor(x_position, scene)
    {
        this.fatigue = 0

        this.scene = scene
        this.x_position = x_position

        this.left_leg = new PIXI.Sprite.from(textures.left_leg);
        this.right_leg = new PIXI.Sprite.from(textures.right_leg);
        this.head = new PIXI.Sprite.from(textures.head);

        this.stop_animations = false
    }

    game_over()
    {
        this.head.rotation = 0.8
        this.container.scale.set(-1, 1)

        this.stop_animations = true
    }
    
    increment_fatigue(amount)
    {
        this.scene.fatigue.damage(amount)
        this.fatigue += amount
        if (this.fatigue >= MAX_FATIGUE)
            game_over()
    }

    drow()
    {
        this.container = new PIXI.Container()
        graphics_container.addChild(this.container)

        this.container.addChild(this.left_leg);

        this.left_leg.position.set(-35, -15);
        this.left_leg.scale.x = 0.2;
        this.left_leg.scale.y = 0.2;
        this.left_leg.rotation = BASE_LEFT_LEG_ROTATION

        this.container.addChild(this.right_leg);

        this.right_leg.position.set(-25, -10);
        this.right_leg.scale.x = 0.2;
        this.right_leg.scale.y = 0.2;
        this.right_leg.rotation = BASE_RIGHT_LEG_ROTATION;

        let body = new PIXI.Sprite.from(textures.body);
        this.container.addChild(body);

        body.position.set(-60, -45);
        body.scale.x = 0.2;
        body.scale.y = 0.2;

        this.container.addChild(this.head);

        this.head.position.set(-20, -35);
        this.head.anchor.set(0.1, 0.8);
        this.head.scale.x = 0.2;
        this.head.scale.y = 0.2;
        ticker.add(this.head_bobble, {'character': this, 'remaining_time': beat_duration()})
    }

    animate_step_left()
    {
        let current_animation_time = time_to_next_beat
        this.character.left_leg.rotation = BASE_RIGHT_LEG_ROTATION + current_animation_time / beat_duration() * LEG_AMPLITUDE
        this.character.right_leg.rotation = BASE_LEFT_LEG_ROTATION - current_animation_time / beat_duration() * LEG_AMPLITUDE
    }


    animate_step_right()
    {
        let current_animation_time = time_to_next_beat
        this.character.left_leg.rotation = BASE_LEFT_LEG_ROTATION - current_animation_time / beat_duration() * LEG_AMPLITUDE
        this.character.right_leg.rotation = BASE_RIGHT_LEG_ROTATION + current_animation_time / beat_duration() * LEG_AMPLITUDE
    }

    head_bobble()
    {
        if (this.character.stop_animations)
        {
            ticker.remove(this.character.head_bobble, this)
            return
        }

        let current_animation_time = time_to_next_beat
        this.character.head.rotation = BASE_HEAD_BOBBLE_RETARDNESS - Math.sin(Math.PI / beat_duration() * current_animation_time) * HEAD_BOBBLE_AMPLITUDE

        if (this.remaining_time <= 0)
            this.remaining_time = beat_duration();
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
        this.scene.rock.x_position = this.x_position + (ROCK_RADIUS + this.container.width / 2) / GROUND_SEGMENTS_LENGTH
        scene.rock.graphics.rotation += 0.1
    }
}
