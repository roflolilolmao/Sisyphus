const app = new PIXI.Application();

window.onload = function () {
    document.getElementById('pixi_container').appendChild(app.view);
    loadBasicCanvas()
};

function loadBasicCanvas()
{
    drawGround();
    drawRock();
    drawCharacter();
}

function drawGround()
{
    let ground = new PIXI.Graphics();
    app.stage.addChild(ground);

    ground.position.set(0, 0);

    ground.lineStyle(1, 0x00ff00)
        .moveTo(0, app.screen.height / 3 * 2)
        .lineTo(app.screen.width, app.screen.height / 3 * 2);
}

function drawRock()
{
    let rock = new PIXI.Graphics();
    app.stage.addChild(rock);

    rock.position.set(0, 0);
    rock.beginFill(0xFFFFFFF);
    rock.drawCircle(120, app.screen.height / 3 * 2 - 30, 30);
    rock.endFill()
}

function drawCharacter()
{
    let character = new PIXI.Graphics();
    app.stage.addChild(character);

    character.position.set(0, 0);
    character.beginFill(0xFF00000);
    character.drawRect(0, 0, 20, 80);
    character.endFill();
    character.position.set(60, app.screen.height / 3 * 2 - character.height);
}