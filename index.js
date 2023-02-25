const app = new PIXI.Application({
  width: 900,
  height: 900,
});

document.body.appendChild(app.view);

const gameState = [];
let selectedChecker = null;
const tileSize = 110;
const circleSize = tileSize / 2;
const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const color1 = 0xff0000;
const color2 = 0x00e5ff;
const light = 0xfbff00;

let moved;

function getNextValidPosX(x) {
  return x + 1 || x - 1;
}

function isCheckerOfColor(checker, color) {
  return checker.tint === color;
}

function createChecker(x, y, color) {
  const checker = new PIXI.Graphics();
  checker.beginFill(color);
  if (checker.tint === color2) {
    checker.beginFill(color1);
  }
  checker.drawCircle(circleSize, circleSize, circleSize);
  checker.endFill();
  checker.x = x * tileSize;
  checker.y = y * tileSize;
  checker.interactive = true;
  checker.buttonMode = true;
  checker.dragging = false;
  let currentDraggedChecker;
  const validPosX = [0, 1, 2, 3, 4, 5, 6, 7];

  checker.on('mousedown', function (e) {
    console.log('Picked up', x, y);
    checker.beginFill(light);

    checker.x = e.data.global.x - tileSize / 2;
    checker.y = e.data.global.y - tileSize / 2;
    checker.dragging = true;
    currentDraggedChecker = checker;
    checker.on('mousemove', function (e) {
      if (currentDraggedChecker === checker) {
        checker.x = e.data.global.x - tileSize / 2;
        checker.y = e.data.global.y - tileSize / 2;
        console.log('Dragging at', checker.x, checker.y);
      } else {
        console.log('Not dragging');
      }
    });
  });

  checker.on('mouseup', function (e) {
    const newPosX = getNextValidPosX(x);
    const newPosY = validPosX * tileSize;

    if (isCheckerOfColor(checker, color1)) {
      console.log("The checker has the color you're looking for.", color1);
      checker.x = newPosX * tileSize;
      checker.y = (y + 1) * tileSize;
      console.log('Put down', checker.x, checker.y);
    } else {
      console.log("The checker does not have the color you're looking for.");
    }

    checker.dragging = false;
    currentDraggedChecker = undefined;
  });

  app.stage.addChild(checker);
}

function createBoard() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const tile = new PIXI.Graphics();

      if ((i + j) % 2 === 0) {
        tile.beginFill(0xffffff);
      } else {
        tile.beginFill(0x000000);
      }

      tile.drawRect(0, 0, tileSize, tileSize);
      tile.endFill();
      tile.x = i * tileSize;
      tile.y = j * tileSize;
      tile.interactive = true;
      tile.buttonMode = true;
      app.stage.addChild(tile);
    }
  }
}

function addCheckersToBoard() {
  for (let i = 0; i < 8; i++) {
    gameState[i] = [];
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 === 0 && (j <= 2 || j >= 5)) {
        gameState[i][j] = (j <= 2) ? color1 : color2;
        createChecker(i, j, gameState[i][j]);
      } else {
        gameState[i][j] = null;
      }
    }
  }
}
createBoard();
addCheckersToBoard();
  
  