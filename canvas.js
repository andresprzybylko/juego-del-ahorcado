var canvas = document.getElementById('canvas-ahorcado');
var pincel = canvas.getContext('2d');

function crearTableroJuego(){
    canvas.scrollIntoView();
    pincel.fillStyle = "#ffa74f";
    pincel.fillRect(0, 0, 1200, 800); // x, y, width, height
}

function dibujarLineas(cantidadLineas){
    x = 400;
    for(i = 0; i < cantidadLineas; i++){
	pincel.fillStyle = "black";
        pincel.fillRect(x, 400, 30, 2);
	x = x + 60
    }
}




/* para dibujar cada parte del ahorcado
// First path
ctx.beginPath();
ctx.strokeStyle = 'blue';
ctx.moveTo(20, 20);
ctx.lineTo(200, 20);
ctx.stroke();

// Second path
ctx.beginPath();
ctx.strokeStyle = 'green';
ctx.moveTo(20, 20);
ctx.lineTo(120, 120);
ctx.stroke();
*/
