const KEYS =
    {
        "f": step_left,
        "j": step_right
    }

function call_functions(arg)
{
    try
    {
        KEYS[arg.key]()
    }
    catch
    {
        // yolo
    }
}

function move_character_for_a_beat(delta)
{

    let distance = ticker.deltaMS * current_speed() / 1000
    this.character.move(distance)
    this.remaining_time -= ticker.deltaMS
    this.animation(ticker.deltaMS)
    if (this.remaining_time <= 0)
        ticker.remove(move_character_for_a_beat, this)
}

function step_left()
{
    ticker.add(move_character_for_a_beat, {
        'character': scene.character,
        'remaining_time': beat_duration(),
        'animation': scene.character.animate_step_left
    });
}

function step_right()
{
    ticker.add(move_character_for_a_beat, {
        'character': scene.character,
        'remaining_time': beat_duration(),
        'animation': scene.character.animate_step_right
    });
}

window.addEventListener("keydown", call_functions.bind(this))
