const KEYS =
    {
        "f": step_left,
        "j": step_right
    }

var time_to_next_beat = 0;
var expected_keys = ["f"]

ticker.add(tick_refresher)

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
    let index = expected_keys.indexOf(arg.key);
    if (time_to_next_beat > 0.15 * beat_duration() || time_to_next_beat - beat_duration() > beat_duration() * 0.15 || index === -1)
    {
        console.log("blargh")
        return
    }
    expected_keys.splice(index, 1)
    if (expected_keys.length !== 0)
        return ;
    current_bpm += 1
    time_to_next_beat += beat_duration()
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
    expected_keys = ["j"]
}

function step_right()
{
    ticker.add(move_character_for_a_beat, {
        'character': scene.character,
        'remaining_time': beat_duration(),
        'animation': scene.character.animate_step_right
    });
    expected_keys = ["f"]
}

window.addEventListener("keydown", call_functions.bind(this))
