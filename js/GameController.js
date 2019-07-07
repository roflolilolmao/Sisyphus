const KEYS =
    {
        "f": step_left,
        "j": step_right
    }

var time_to_next_beat = 0;
var expected_keys = [["f"],["j"],["f"],["j"],["f"]]

function tick_refresher()
{
    time_to_next_beat -= ticker.deltaMS
    if (time_to_next_beat < 0 - beat_duration() * 0.15)
    {
        time_to_next_beat = beat_duration() + time_to_next_beat
        console.log("missed")
    }
}

function call_functions(arg)
{
    let index = expected_keys[0].indexOf(arg.key);
    if (time_to_next_beat > 0.15 * beat_duration() || time_to_next_beat - beat_duration() > beat_duration() * 0.15 || index === -1)
    {
        console.log("blargh")
        return
    }
    expected_keys[0].splice(index, 1)
    if (expected_keys[0].length !== 0)
        return ;
    current_bpm += 1
    time_to_next_beat += beat_duration()
    try
    {
        KEYS[arg.key]()
        expected_keys.shift()
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

function queue_keys(keys)
{
    expected_keys.push(keys)
    keys.forEach((elem, counter) => {
        let new_key = new Key(
            6 * (expected_keys.length - 1) + scene.character.x_position,
            0,
            elem)
        new_key.drow()
        new_key.update()
    })
}

function step_left()
{
    ticker.add(move_character_for_a_beat, {
        'character': scene.character,
        'remaining_time': beat_duration(),
        'animation': scene.character.animate_step_left
    });
    queue_keys(["j"])
}

function step_right()
{
    ticker.add(move_character_for_a_beat, {
        'character': scene.character,
        'remaining_time': beat_duration(),
        'animation': scene.character.animate_step_right
    });
    queue_keys(["f"])
}

window.addEventListener("keydown", call_functions.bind(this))
