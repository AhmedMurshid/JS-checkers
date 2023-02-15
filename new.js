// var two = new Two({
// 	fullscreen: true,
//   autostart: true
// }).appendTo(document.body);

function createSquare(two, x, y, size) {
    var rect = two.makeRectangle(x, y, size, size);
    rect.fill = "red";
    rect.title = `${String.fromCharCode(65 + x/100)}${8 - y/100}`;
    return rect;
  }
  function createChessboard(two) {
    let x = 53;
    let y = 53;
    let squares = [];
    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        two.update();
        //createSquare(two, x, y,100);
        let square = createSquare(two, x, y, 100);
        squares.push(square);
        
        // createSquare._renderer.two.addEventListener('mouseover', function() {
        //     polygon.fill = 'rg b(150, 100, 255)';
        // }, false);
        // two._renderer.createSquare.addEventListener('mouseover', function(){
        //     createSquare.fill = 'white';}, false);
        // square.mouseover(function() {
        //     this.fill = 'green';
        //   });
        square._renderer.elem.addEventListener('mouseover', function() {
            square.fill = 'rgb(150, 100, 255)';
        }, false);
        
        square._renderer.elem.addEventListener('mouseout', function() {
            square.fill = 'white';
        }, false);
        if (i === 0) {
          two.makeText(alphabet[j], x + 0, y, { size: 20 });
        }
        if (j === 0) {
          two.makeText(8 - i, x - 30, y, { size: 20 });
        }
        x = x + 100;
      }
      y = y + 100;
      x = 53;
    }
    
    two.update();
  }

// Create a hit-test object that we'll bind events to,
// but is also a portion of the size of the polygon.


// Add both to a group — making sure hit is added after
// so that it's visible. Any transformations should
// happen on the group so that the polygon and hit stay
// on top of each other.


// Update the renderer in order to generate
// the SVG DOM Elements. Then bind the events
// to those elements directly.
two.update();


function main() {
    // Get the canvas element
    var elem = document.getElementById("drawing");
  
    // Create a Two.js stage
    var two = new Two({ width: 850, height: 850 }).appendTo(elem);
  
    // Create the chessboard
    createChessboard(two);
    two.update();
    // rect.mouseover(function(){
    //     return true;
    // });
    // rect.mouseout(function(){
    //     return false;
    // });
  
    // Render the stage
    two.update();
  }
main();  