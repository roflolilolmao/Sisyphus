const app = new PIXI.Application();
let scene = null
let current_bpm = 80
let last_call = 0

function current_speed()
{
    return current_bpm * 0.001
}

window.onload = function () {
    document.getElementById('pixi_container').appendChild(app.view);
    scene = new Scene()
    loadBasicCanvas()
};

function update(timestamp)
{
    delta = timestamp - last_call
    scene.character.move(current_speed() * delta / 1000)
    scene.update()
    window.requestAnimationFrame(update)
}

function loadBasicCanvas()
{
    scene.drow()
    window.requestAnimationFrame(update)
}
