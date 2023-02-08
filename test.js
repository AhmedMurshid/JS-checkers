
const app = new PIXI.Application({
  width: 900,
  height: 900,
});
document.body.appendChild(app.view);

const gameState = [];
let selectedChecker = null;
const tileSize = 110;
const circleSize = tileSize/2;
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

let moved;
function addChecker(x, y, color) {
  const checker = new PIXI.Graphics();
  checker.beginFill(color);
  checker.drawCircle(circleSize, circleSize, circleSize);
  checker.endFill();
  checker.x = x * tileSize;
  checker.y = y * tileSize;
  checker.interactive = true;
  checker.buttonMode = true;
  checker.dragging = false;
  // TODO:          mousedown
  checker.on('mousedown', function (e) {
    console.log('Picked up');
    
    checker.x = e.data.global.x- tileSize/2;
    checker.y = e.data.global.y- tileSize/2;
    checker.dragging = true;
  });
  // TODO:           mousemove
  checker.on('mousemove', function (e) {
    console.log('Dragging');
    
    if (checker.dragging) {
      checker.x = e.data.global.x- tileSize/2;
      checker.y = e.data.global.y- tileSize/2;
      console.log(checker.x,checker.y);
    
    }else{
      console.log("not dragging")
    }
  });
  // todo           mouseup 
  checker.on('mouseup', function (e) {
    console.log('Moving');
    
    checker.x = e.data.global.x- tileSize/2;
    checker.y = e.data.global.y- tileSize/2;
    checker.dragging = false;
  });
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
    tile.x = i * tileSize;
    tile.y = j * tileSize;

    app.stage.addChild(tile);

  }
}
function addToBoard(){
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
  const newDiv = document.createElement("div");

  const newContent = document.createTextNode("addToBoard");

  newDiv.appendChild(newContent);

  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);

}
addToBoard();


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


