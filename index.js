const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
//const ctx2 = canvas.getContext("2d");

let x = 20;
let y = 20;
let width = 150;
let height = 100;
let speed = 5;

// function moveBox() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     x += speed;
//     ctx.beginPath();
//     ctx.rect(x, y, width, height);
//     ctx.fillStyle = "red";
//     ctx.fill();
//     ctx.closePath();
// }

// setInterval(moveBox, 6);

ctx.fillStyle = 'green';
//ctx.fillRect(210, 100, 100, 100);

//ctx.fillStyle = 'red';
function board(){
    let x = 10;
    let y = 10;
    for (let i = 1; i<=64; i++){
        ctx.fillRect(x, y, 100, 100);
        x = x + 110;
        if(i % 8 === 0 && i != 0){
            y = y + 110;
            x = 10;
        }
    }
}
board();
canvas.addEventListener('click', function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let color1 = rect.fillStyle;

    // Determine which rectangle was clicked
    let rectX = Math.floor(x / 110);
    let rectY = Math.floor(y / 110);
    let rectIndex = rectY * 8 + rectX;

    console.log("Rectangle " + rectIndex + " was clicked!");

    
    
    const clicked1 = document.createElement("h1");
    clicked1.innerHTML = `${"Rectangle " + rectIndex + " was clicked!" + rectX +""+rectY}`;
    document.body.appendChild(clicked1);
    // clicked1.style.color = "black";
    // clicked1.style.textAlign = "left";
    // clicked1.style.marginTop = "50px";
    // clicked1.style.fontSize = "30px";
    //clicked1.style.float = "left";
    if(clicked1 > 1){
        clicked1.remove();
    }

});

function addCheckerCircles() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            // if(j == 3 || j == 4){
            //     j == 5;
            // }
            if (j<=2 && (i + j) % 2 != 0) {
                ctx.beginPath();
                let x = 10 + 110 * i + 50;
                let y = 10 + 110 * j + 50;
                ctx.arc(x, y, 40, 0, 2 * Math.PI);
                ctx.fillStyle = 'black';
                ctx.fill();
            }
            if(j >= 5 && (i + j) % 2 != 0){
                ctx.beginPath();
                let x = 10 + 110 * i + 50;
                let y = 10 + 110 * j + 50;
                ctx.arc(x, y, 40, 0, 2 * Math.PI);
                ctx.fillStyle = 'white';
                ctx.fill();
            }
        }
    }
}
addCheckerCircles();
// function addCheckerCircles1() {
//     for (let i = 0; i < 8; i++) {
//         for (let j = 0; j < 3; j++) {
//             if ((i + j) % 2 === 0) {
//                 ctx.beginPath();
//                 let x = 10 + 110 * i + 50;
//                 let y = 560 + 110 * j + 50;
//                 ctx.arc(x, y, 40, 0, 2 * Math.PI);
//                 ctx.fillStyle = 'white';
//                 ctx.fill();
//             }
//         }
//     }
// }
// addCheckerCircles1();
let selectedCircle;
canvas.addEventListener('click', function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let rectX = Math.floor(x / 110);
    let rectY = Math.floor(y / 110);
    let rectIndex = rectY * 8 + rectX;
      const pixel = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;

  // create rgb color for that pixel
  const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

    // Determine if a circle was clicked
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 != 0) {
                let circleX = 10 + 110 * i + 50;
                let circleY = 10 + 110 * j + 50;
                let distance = Math.sqrt((x - circleX) ** 2 + (y - circleY) ** 2);
                if (distance <= 40) {
                    if (selectedCircle) {
                        const clicked1 = document.createElement("h1");
                        clicked1.innerHTML = `${"black"+" was clicked!" + rectX +","+rectY}`;
                        document.body.appendChild(clicked1);
                        // ctx.beginPath();
                        // ctx.arc(circleX, circleY, 40, 0, 2 * Math.PI);
                        // ctx.fillStyle = 'black';
                        // ctx.fill();

                        selectedCircle = null;
                    } else {
                        const clicked1 = document.createElement("h1");
                        clicked1.innerHTML = `${"white"+" was clicked!" + rectX +","+rectY}`;
                        document.body.appendChild(clicked1);
                        // ctx.beginPath();
                        // ctx.arc(circleX, circleY, 40, 0, 2 * Math.PI);
                        // ctx.fillStyle = 'white';
                        // ctx.fill();
                        selectedCircle = { x: circleX, y: circleY };
                    }
                }
            }
        }
    }
});


