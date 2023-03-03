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

// function currentPlace(checker) {
//   const lowerBound = 50;
//   const values = Array.from(new Array(200), (x, i) => i + lowerBound);
//   for (const x of values) {
//     if (checker.x >= x - 20 && checker.x <= x + 20) {
//       return x;
//     }
//   }
// }
function currentPlace(n) {
  return n;
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
  checker.tint = color;
  checker.endFill();
  checker.x = x * tileSize;
  checker.y = y * tileSize;
  checker.interactive = true;
  checker.buttonMode = true;
  checker.dragging = false;
  let currentDraggedChecker;
  initChecker(checker,x,y);  
  app.stage.addChild(checker);
}
// function movements1(checker,x,y){
//   // const newPosX = currentPlace(x);
//   console.log("movement function active");
//   if (isCheckerOfColor(checker, color1) || isCheckerOfColor(checker, color2)) {
//     console.log("The checker has the color you're looking for.", color1);
//     console.log(x, "x place");
//     checker.x = currentPlace(x) * tileSize;
//     checker.y = currentPlace(y) * tileSize;
//     console.log('Put down', checker.x, checker.y);
//     console.log(currentPlace(x), "something is wrong");
//   } else {
//     console.log("The checker does not have the color you're looking for.", color1,"",checker.tint);
//   }
// }
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
function initChecker(checker, x, y) {
  checker.on('pointerdown', function (e) {
    console.log('Picked up', x, y);
    checker.beginFill(light);
  
    checker.x = e.data.global.x - tileSize / 2;
    checker.y = e.data.global.y - tileSize / 2;
    checker.dragging = true;
    currentDraggedChecker = checker;
    checker.on('pointermove', function (e) {
      if (currentDraggedChecker === checker) {
        checker.x = e.data.global.x - tileSize / 2;
        checker.y = e.data.global.y - tileSize / 2;
        console.log('Dragging at', checker.x, checker.y);
      } else {
        console.log('Not dragging');
      }
    });
    
    highlightSurroundingTiles(checker); // Call the highlightSurroundingTiles function
  });

  checker.on('pointerup', function (e) {
    if (currentDraggedChecker === checker) {
      checker.dragging = false;
      checker.x = currentPlace(x) * tileSize;
      checker.y = currentPlace(y) * tileSize;
      currentDraggedChecker = undefined;
     } 
  });
}


function highlightSurroundingTiles(checker) {
  // Get the current position of the checker
  const x = checker.x / tileSize;
  const y = checker.y / tileSize;
  
  // Define the tiles to highlight based on the checker's color and position
  let highlightTiles = [];
  if (isCheckerOfColor(checker, color2)) {
    highlightTiles = [
      [x - 1, y - 1],
      [x + 1, y - 1]
    ];
  } else if (isCheckerOfColor(checker, color1)) {
    highlightTiles = [
      [x - 1, y + 1],
      [x + 1, y + 1]
    ];
  }
  
  // Highlight the tiles
  highlightTiles.forEach(tile => {
    const tileX = tile[0] * tileSize;
    const tileY = tile[1] * tileSize;
    const tileGraphic = new PIXI.Graphics();
    tileGraphic.beginFill(0xffff00);
    tileGraphic.drawRect(0, 0, tileSize, tileSize);
    tileGraphic.endFill();
    tileGraphic.x = tileX;
    tileGraphic.y = tileY;
    app.stage.addChild(tileGraphic);
    checker.on('pointerout', () => {
      app.stage.removeChild(tileGraphic);
    });
  });
  
}



createBoard();
addCheckersToBoard();
  
  