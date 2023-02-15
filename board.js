const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
import Two from "two.js";


var r = Raphael(0, 0, 400, 650);

r.rect(0, 0, 50, 50)
    .attr({fill: "#000"})
    .click(function () {
        alert('first rectangle clicked');
     });
    
r.rect(200, 0, 100, 50)
    .attr({fill: "#000"})
    .click(function () {
        alert('sejjjnd rectangle clicked');
     });



function checknum(num){
    if(num %2 == 0){
        ctx.fillStyle = "green";
    }else{
        ctx.fillStyle = "red";
    }
}
function checknum2(num){
    if(num %2 != 0){
        ctx.fillStyle = "green";
    }else{
        ctx.fillStyle = "red";
    }
}
function board2(){
    let x = 0;
    let y = 0;
    let square = 0;
    for (let i = 1; i<=8; i++){
        for(let j = 1; j<9; j++){
            if(i %2 == 0){
                checknum(j);
            }else{
                checknum2(j);
            }
            ctx.fillRect(x, y, 100, 100);
            square = square +1;
            x = x + 100;
        }
        y= y+ 100;
        x= 0;
    }
}
board2();