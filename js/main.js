const app = new PIXI.Application({'resizeTo': window})

const ticker = PIXI.Ticker.shared
var graphics_container = new PIXI.Container()
app.stage.addChild(graphics_container)

const CAMERA_OFFSET_X = app.screen.width / 3
const CAMERA_OFFSET_Y = app.screen.height / 3 * 2
const START_BPM = 82

let scene = null
let audio = null
let stopped = true
var current_bpm = START_BPM

let game_over_context = null

function start_game(event=null)
{
    if (event)
        event.target.style = "display:none";
    loadBasicCanvas()
    play_all_tracks()
    audio.stop()
    audio.tracks[0].mute(false)
    audio.tracks[0].volume(1.0)
    start_tick_refresher()
    stopped = false
}

function reset_game()
{
    current_bpm = START_BPM
    audio.calculate_playback_speed()
    audio.set_playback_speed()
    graphics_container.destroy({'children': true})
    graphics_container = new PIXI.Container()
    app.stage.destroy({'children': true})
    app.stage = new PIXI.Container()
    ticker.remove(tick_refresher)
    ticker.remove(update)
    scene = null

    create_scene()
    app.stage.addChild(graphics_container)

    document.getElementById('game_over').style.opacity = '0'
    document.getElementById('game_over').display = 'none'

    start_game()
}

function animate_game_over()
{
    this.time -= ticker.deltaMS
    document.getElementById('game_over') .style.opacity = '' + (1000 - this.time) / 1000
}

function tumblefuck_rock()
{
    scene.rock.x_position -= 0.01
    scene.rock.graphics.rotation -= 0.01
}

function game_over()
{
    stopped = true
    audio.fade_to_stop()
    scene.character.game_over()
    ticker.add(tumblefuck_rock, null)
    setTimeout(function() {
        display_game_over()
        ticker.remove(tumblefuck_rock, null)
    }, 5000)
    setTimeout(function() {
        ticker.remove(animate_game_over, game_over_context)
        reset_game()
    }, 10000)
}

function display_game_over()
{
    document.getElementById('game_over') .style.display = 'block'
    document.getElementById('score') .innerHTML = '' + -Math.round(scene.ground.height_at(scene.character.x_position) / GROUND_SEGMENTS_LENGTH)
    document.getElementById('bpm') .innerHTML = '' + parseFloat(current_bpm).toFixed(1)
    game_over_context = {'time': 1000}
    ticker.add(animate_game_over, game_over_context)
}

function assets_path(filename)
{
    return `https://roflolilolmao.github.io/Sisyphus/assets/${filename}`
}

function current_speed()
{
    return current_bpm * 0.02
}

function beat_duration()
{
    return 60 / current_bpm * 1000
}

function create_scene()
{
    scene = new Scene()
}

window.onload = function () {
    document.getElementById('pixi_container').appendChild(app.view);
    audio = new AudioTracks()
    create_scene()
};

window.onresize = function()
{
    app.resizeTo = window
    app.resize()
}

function update(delta)
{
    function move_camera()
    {
        function move_property(property, x_factor=1, y_factor=1)
        {
            property.set(
                (-scene.character.container.position.x + CAMERA_OFFSET_X) * x_factor,
                (-scene.character.container.position.y + CAMERA_OFFSET_Y) * y_factor,
            )
        }
        move_property(graphics_container.position)
        move_property(scene.ground.sprite.tilePosition)
        move_property(scene.sky.sprite.tilePosition, 1 / 4, 0)
        move_property(scene.vegetation.trees.position)
    }

    move_camera()
    audio.calculate_playback_speed()
    audio.set_playback_speed()
    scene.update()
}

function loadBasicCanvas()
{
    scene.drow()
    ticker.add(update)
}

function play_all_tracks()
{
    audio.tracks.forEach((elem) => {
        elem.play();
        elem.volume(1)
    })
}
