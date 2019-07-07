const app = new PIXI.Application({'resizeTo': window})

const ticker = PIXI.Ticker.shared
var graphics_container = new PIXI.Container()
app.stage.addChild(graphics_container)

const CAMERA_OFFSET_X = app.screen.width / 3
const CAMERA_OFFSET_Y = app.screen.height / 3 * 2
const START_BPM = 82

let scene = null
let audio = null
let stopped = false
var current_bpm = START_BPM

function start_game(event)
{
    event.target.style = "display:none";
    loadBasicCanvas()
    play_all_tracks()
    ticker.add(tick_refresher)
    stopped = false
}

function animate_game_over()
{
    this.time -= ticker.deltaMS
    document.getElementById('game_over') .style.opacity = '' + (1000 - this.time) / 1000
    if (this.time <= 0)
    {
        reset_game()
        setTimeout(function() { document.getElementById('game_over').display = 'none' }, 5000)
        ticker.remove(animate_game_over, this)
    }
}

function tumblefuck_rock()
{
    scene.rock.x_position -= 0.1
}

function game_over()
{
    stopped = true
    ticker.add(tumblefuck_rock, null)
    setTimeout(function() {
        display_game_over()
        ticker.remove(tumblefuck_rock, null)
    }, 5000)
}

function display_game_over()
{
    document.getElementById('game_over') .style.display = 'block'
    document.getElementById('score') .innerHTML = '' + -scene.ground.height_at(scene.character.x_position) / GROUND_SEGMENTS_LENGTH
    ticker.add(animate_game_over, {'time': 1000})
}

function assets_path(filename)
{
    return `https://roflolilolmao.github.io/Sisyphus/assets/${filename}`
}

function current_speed()
{
    return current_bpm * 0.1
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
    })
}
