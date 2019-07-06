const app = new PIXI.Application();
const ticker = PIXI.Ticker.shared

let scene = null
let current_bpm = 80

function current_speed()
{
    return current_bpm * 0.1
}

window.onload = function () {
    document.getElementById('pixi_container').appendChild(app.view);
    scene = new Scene()
    loadBasicCanvas()
};

function update(delta)
{
    scene.character.move(current_speed() * delta / 1000)
    scene.update()
}

function loadBasicCanvas()
{
    scene.drow()
    ticker.add(update)
    ticker.start()
}
