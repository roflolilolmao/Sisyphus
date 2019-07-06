const app = new PIXI.Application();
const ticker = PIXI.Ticker.shared
var graphics_container = new PIXI.Container()
app.stage.addChild(graphics_container)

const CAMERA_OFFSET_X = app.screen.width / 3
const CAMERA_OFFSET_Y = app.screen.height / 3 * 2

let scene = null
let audio = null;
let current_bpm = 80

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
        graphics_container.position.set(
            -scene.character.container.position.x + CAMERA_OFFSET_X,
            -scene.character.container.position.y + CAMERA_OFFSET_Y,
        )
    }

    move_camera()
    scene.character.move(current_speed() * delta / 1000)
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