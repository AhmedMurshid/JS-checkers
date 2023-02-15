

const app = new PIXI.Application({
    width: 900,
    height: 900,
  });
  document.body.appendChild(app.view);
  
//   import board from './test.js';


  const gameState = [];
  let selectedChecker = null;
  const tileSize = 110;
  const circleSize = tileSize/2;
  let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const color1 = 0xff0000;
  const color2 = 0x00e5ff;
  const light = 0xfbff00;
  
  let moved;
  
  function validPos(x,y){
    //if e.data.global.x - tileSize / 2 ==
    x = x+1 || x-1;
  
    return x;
  }

  function checkCheckerColor(checker, color) {
    if (checker.tint === color) {
      return true;
    } else {
      return false;
    }
  }
  
  
  function addChecker(x, y, color) {
    const checker = new PIXI.Graphics();
    checker.beginFill(color);
    if(checker.tint == color2){
      checker.beginFill(color1);

    }
    checker.drawCircle(circleSize, circleSize, circleSize);
    checker.endFill();
    checker.x = x * tileSize;
    checker.y = y * tileSize;
    checker.interactive = true;
    checker.buttonMode = true;
    checker.dragging = false;
    // TODO:  mousedow
    let currentDraggedChecker;
    const validPos = [0,1,2,3,4,5,6,7];
   
    // const movedPosX = e.data.global.x - tileSize / 2;
    // const movedPosY = e.data.global.y - tileSize / 2;
  
    checker.on('mousedown', function (e) {
      console.log(x,y);
      console.log('Picked up');
      checker.beginFill(light);
    
      checker.x = (e.data.global.x - tileSize / 2);
      checker.y = e.data.global.y - tileSize / 2;
      checker.dragging = true;
      currentDraggedChecker = checker;
      checker.on('mousemove', function (e) {
        console.log('Dragging');
        if (currentDraggedChecker === checker) {
          checker.x = (e.data.global.x - tileSize / 2);
          checker.y = e.data.global.y - tileSize / 2;
          console.log(checker.x, checker.y);
        } else {
          console.log('not dragging');
        }
      });
      
    });
    
  
    checker.on('mouseup', function (e) {
      console.log('Moving');
      let newPosX = [];
      let newPosY = validPos*tileSize;
      // validPos.forEach(item => newPosX = validPos[item]);
      if (checkCheckerColor(checker, color1)) {
        console.log("The checker has the color you're looking for.");
        checker.x = (x+1)*tileSize;
        checker.y = (y+1)*tileSize;
      } else {
        console.log("The checker does not have the color you're looking for.");
      }
      checker.dragging = false;
      currentDraggedChecker = undefined;
    });
     app.stage.addChild(checker);
  }
  function board(){
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
  board()
// board(app,tileSize);

  function addToBoard(){
    for (let i = 0; i < 8; i++) {
      gameState[i] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0 && (j <= 2 || j >= 5)) {
          gameState[i][j] = (j <= 2) ? color1 : color2;
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
  
  
  