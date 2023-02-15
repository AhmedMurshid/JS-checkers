export function board(app,tileSize){
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
      //return tile;
      app.stage.addChild(tile);
    }
  }
}