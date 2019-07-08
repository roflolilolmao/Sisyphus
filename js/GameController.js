var time_to_next_beat = beat_duration();
var time_since_beat = 0;

function start_tick_refresher()
{
    time_to_next_beat = beat_duration();
    time_since_beat = 0;
    ticker.add(tick_refresher)
}

function tick_refresher()
{
    time_to_next_beat -= ticker.deltaMS
    time_since_beat += ticker.deltaMS
    if (time_since_beat > beat_duration())
    {
        let delta_overflow = time_since_beat -  beat_duration()
        time_to_next_beat = beat_duration() - delta_overflow
        time_since_beat = delta_overflow
    }
}

function difference_to_beat()
{
    return Math.min(time_to_next_beat, time_since_beat)
}

function call_functions(arg)
{
    if (stopped)
        return

    let index = expected_keys[0].indexOf(arg.key);

    if (index === -1)
    {
        scene.character.increment_fatigue(50 + Math.random() * 5)
        return
    }

    let relative_difference = difference_to_beat() / beat_duration()
    if (relative_difference > 0.25 && difference_to_beat() > 100)
    {
        scene.character.increment_fatigue(50 * relative_difference)
        return
    }
    
    expected_keys[0].splice(index, 1)
    if (expected_keys[0].length !== 0)
        return ;
    current_bpm += 0.3
    if (audio.fading_in.length === 0)
        audio.add_track_to_mix()
    else
    {
        audio.fading_in.forEach((track, index, arr) =>
        {
            track.volume(track.volume() + 0.05)
            if (track.volume() >= 0.95)
                arr.splice(index)
        })
    }
    time_to_next_beat = beat_duration()
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
