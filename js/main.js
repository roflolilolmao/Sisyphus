const app = new PIXI.Application();
const ticker = PIXI.Ticker.shared
var graphics_container = new PIXI.Container()
app.stage.addChild(graphics_container)

const CAMERA_OFFSET_X = app.screen.width / 3
const CAMERA_OFFSET_Y = app.screen.height / 3 * 2

let scene = null
let audio = null;
var current_bpm = 80

function current_speed()
{
    return current_bpm * 0.1
}

window.onload = function () {
    document.getElementById('pixi_container').appendChild(app.view);
    scene = new Scene()
    audio = new AudioTracks()
    loadBasicCanvas()
};

function update(delta)
{
    function move_camera()
    {
        function move_property(property, factor=1)
        {
            property.set(
                -scene.character.container.position.x * factor + CAMERA_OFFSET_X,
                -scene.character.container.position.y * factor + CAMERA_OFFSET_Y,
            )
        }
        move_property(graphics_container.position)
        move_property(scene.ground.sprite.tilePosition)
        move_property(scene.sky.sprite.tilePosition, 1 / 4)
    }

    current_bpm += 60 / 3 * delta / 1000
    move_camera()
    scene.character.move(current_speed() * delta / 1000)
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
        elem.currentTime = 0;
        elem.play();
    })
}
