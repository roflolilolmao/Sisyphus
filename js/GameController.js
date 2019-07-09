var time_to_next_beat = beat_duration()
var time_since_beat = 0

const RELATIVE_TOLERANCE = 0.25
let touched = false
let pinged = false
let gold = 0
let correct_keys = 0

function try_to_buy(price)
{
    if (price > gold)
        return false
    gold -= price
    return true
}

function start_tick_refresher()
{
    time_to_next_beat = beat_duration()
    time_since_beat = 0
    ticker.speed = 3
    ticker.add(tick_refresher)
}

function tick_refresher()
{
    time_to_next_beat -= ticker.elapsedMS
    time_since_beat += ticker.elapsedMS

    if (!stopped && !pinged && time_since_beat > RELATIVE_TOLERANCE * beat_duration())
    {
        if (!touched && phases.current_phase != 0)
            scene.character.increment_fatigue(Math.random() * 10 + 5)
        pinged = true
        touched = false
    }

    if (time_since_beat > beat_duration())
    {
        pinged = false
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

    if (!AVAILABLE_KEYS.includes(arg.key))
        return

    let relative_difference = difference_to_beat() / beat_duration()
    if (relative_difference > RELATIVE_TOLERANCE && difference_to_beat() > 100 + relics[MASTERY_ID].level * 10)
    {
        scene.character.increment_fatigue((25 * relative_difference) * (1 - 0.1 * relics[TOUGHNESS_ID].level))
        return
    }

    let result = scene.keys.try_key(arg.key)
    if (result == KEY_FALSE)
    {
        scene.character.increment_fatigue((50 + Math.random() * 5) * (1 - 0.1 * relics[TOUGHNESS_ID].level))
        return
    }

    if (result == KEY_CORRECT)
    {
        touched = true
        correct_keys++
        if (relics[EASE_ID].level > 0)
            current_bpm += 0.2
        else
            current_bpm += 0.3
        phases.set_according_to_correct_keys()
        if (phases.current_phase)
            YOU_HAFF_TO_BE_LOUDER()
        next_step()
    }
}

function YOU_HAFF_TO_BE_LOUDER()
{
    if (Math.random() < 0.2)
        phases.modify_random_track_volume(Math.random() / 10)
}

function move_character_for_a_beat(delta)
{
    let distance = this.distance / ticker.FPS / beats_period()

    this.character.move(distance)
    this.remaining_time -= ticker.deltaMS / ticker.speed
    this.animation(ticker.deltaMS)

    if (this.remaining_time <= 0)
        ticker.remove(move_character_for_a_beat, this)
}

function distance_to_next_key()
{
    return scene.keys.next_key_position() - scene.character.x_position
}

function beats_period()
{
    return 60 / current_bpm
}

let last_move_context = null

function step_left()
{
    ticker.remove(move_character_for_a_beat, last_move_context)
    last_move_context = {
        'character': scene.character,
        'remaining_time': time_to_next_human_beat(),
        'distance': distance_to_next_key(),
        'animation': scene.character.animate_step_left
    }
    ticker.add(move_character_for_a_beat, last_move_context)
    queue_keys()
    next_step = step_right
}

function step_right()
{
    ticker.remove(move_character_for_a_beat, last_move_context)
    last_move_context = {
        'character': scene.character,
        'remaining_time': time_to_next_human_beat(),
        'distance': distance_to_next_key(),
        'animation': scene.character.animate_step_right
    }
    ticker.add(move_character_for_a_beat, last_move_context)
    queue_keys()
    next_step = step_left
}

window.addEventListener('keydown', call_functions.bind(this))
