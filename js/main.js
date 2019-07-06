const app = new PIXI.Application();
let scene = null

window.onload = function () {
    document.getElementById('pixi_container').appendChild(app.view);
    scene = new Scene()
    loadBasicCanvas()
};

function loadBasicCanvas()
{
    scene.drow()
}
