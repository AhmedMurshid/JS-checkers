
const app = new PIXI.Application({
  width: 800,
  height: 800,
});
document.body.appendChild(app.view);

const gameState = [];
let selectedChecker = null;
const tileSize = 100;
const circleSize = tileSize/2;


function onClick(event) {
  const xIndex = Math.floor(event.data.global.x / tileSize);
  const yIndex = Math.floor(event.data.global.y / tileSize);

  setTimeout(() => {
    if ((xIndex + yIndex) % 2 === 0) {
      this.beginFill(0x43235f);
      } else { 
        this.beginFill(0x873f30);
      }
    this.drawCircle(circleSize, circleSize, circleSize);
    this.endFill();
  }, 500);
	
  this.beginFill(0xff0000);
  this.drawCircle(circleSize, circleSize, circleSize);
  this.endFill();
  
  if (gameState[xIndex][yIndex] !== null) {
    selectedChecker = {x: xIndex, y: yIndex};
    // setTimeout(() => {
    //   if ((xIndex + yIndex) % 2 === 0) {
    //     this.beginFill(0x43235f);
    //   } else { 
    //     this.beginFill(0x873f30);
    //   }
    //   this.drawRect(0, 0, tileSize, tileSize);
    //   this.endFill();
    // }, 4500);
    
    // this.beginFill(0x277500);
    // this.drawRect(0, 0, tileSize, tileSize);
    // this.endFill();
    
  }
}
function onMove(event){
  if (selectedChecker === null) {
    return;
  }
  const xIndex = Math.floor(event.data.global.x / tileSize);
  const yIndex = Math.floor(event.data.global.y / tileSize);
  if (Math.abs(selectedChecker.x - xIndex) === 1 && Math.abs(selectedChecker.y - yIndex) === 1) {
    gameState[xIndex][yIndex] = gameState[selectedChecker.x][selectedChecker.y];
    gameState[selectedChecker.x][selectedChecker.y] = null;
    addChecker(xIndex, yIndex, gameState[xIndex][yIndex]);
    app.stage.removeChild(app.stage.children[selectedChecker.y * 8 + selectedChecker.x + 16]);
  }
  selectedChecker = null;
}

function addChecker(x, y, color) {
  const checker = new PIXI.Graphics();
  checker.beginFill(color);
  checker.drawCircle(circleSize, circleSize, circleSize);
  checker.endFill();
  checker.x = x * tileSize;
  checker.y = y * tileSize;
  checker.interactive = true;
  checker.buttonMode = true;
  checker.on("mousedown", onClick);
  checker.on("mouseup", onMove);


  app.stage.addChild(checker);
}

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

    // Position the tile on the checker board
    tile.x = i * tileSize;
    tile.y = j * tileSize;

    // Make the tile interactive
    tile.interactive = true;
    tile.buttonMode = true;

    // Add the onClick event listener

    // Add the tile to the PixiJS application
    app.stage.addChild(tile);

  }
}
for (let i = 0; i < 8; i++) {
  gameState[i] = [];
  for (let j = 0; j < 8; j++) {
    if ((i + j) % 2 === 0 && (j <= 2 || j >= 5)) {
      gameState[i][j] = (j <= 2) ? 0x43235f : 0x873f30;
      addChecker(i, j, gameState[i][j]);
    } else {
      gameState[i][j] = null;
    }
  }
}


// addChecker(0,0,0xff0);
// for(let x = 0; x<=7; x++){
//   for(let y = 0; y<=2; y++){
//     if((x+y)%2 === 0){
//     addChecker(x,y,0x43235f)
//     }
//   }
// }
// for(let x = 0; x<=7; x++){
//   for(let y = 5; y<=7; y++){
//     if((x+y)%2 === 0){
//     addChecker(x,y,0x873f30)
//     }
//   }
// }


