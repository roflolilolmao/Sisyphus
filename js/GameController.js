var time_to_next_beat = beat_duration()
var time_since_beat = 0

function start_tick_refresher()
{
    time_to_next_beat = beat_duration()
    time_since_beat = 0
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

function time_to_next_human_beat()
{
    let result = time_to_next_beat

    if (result < beat_duration() / 2)
        result += beat_duration()

    return result
}

function call_functions(arg)
{
    if (stopped)
        return

    let relative_difference = difference_to_beat() / beat_duration()
    if(relative_difference > 0.25 && difference_to_beat() > 100)
    {
        scene.character.increment_fatigue(50 * relative_difference)
        return
    }

    let result = scene.keys.try_key(arg.key)
    if (result == KEY_FALSE)
    {
        scene.character.increment_fatigue(50 + Math.random() * 5)
        return
    }

    if (result == KEY_CORRECT)
    {
        current_bpm += 0.3
        next_step()
    }
}

function move_character_for_a_beat(delta)
{
    console.log(ticker.deltaMS)
    let distance = this.distance_per_tick
    if (this.remaining_time - ticker.deltaMS < 0)
        distance = scene.keys.next_key_position() - scene.character.x_position

    this.character.move(distance)
    this.remaining_time -= ticker.deltaMS
    this.animation(ticker.deltaMS)

    if (this.remaining_time <= 0)
        ticker.remove(move_character_for_a_beat, this)
}

function distance_per_tick()
{
    let distance = scene.keys.next_key_position() - scene.character.x_position
    console.log(scene.keys.next_key_position(), scene.character.x_position, distance, ticker.FPS)
    return distance / ticker.FPS * beat_duration() / 60
}

function step_left()
{
    ticker.add(move_character_for_a_beat, {
        'character': scene.character,
        'remaining_time': time_to_next_human_beat(),
        'distance_per_tick': distance_per_tick(),
        'animation': scene.character.animate_step_left
    })
    queue_keys()
    next_step = step_right
}

function step_right()
{
    ticker.add(move_character_for_a_beat, {
        'character': scene.character,
        'remaining_time': time_to_next_human_beat(),
        'distance_per_tick': distance_per_tick(),
        'animation': scene.character.animate_step_right
    })
    queue_keys()
    next_step = step_right
}

window.addEventListener('keydown', call_functions.bind(this))
