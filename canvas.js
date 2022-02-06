var canvas = document.getElementById('canvas-ahorcado');
var pincel = canvas.getContext('2d');
var posicionesX = [];

function crearTableroJuego(){
    canvas.scrollIntoView();
    pincel.fillStyle = "#ffa74f";
    pincel.fillRect(0, 0, 1200, 800); // x, y, width, height
}


function mostrarGuiones(cantidad){
    x = 400;
    for(i = 0; i < cantidad; i++){
	pincel.fillStyle = "black";
        pincel.fillRect(x, 400, 50, 2);
	posicionesX.push(x);
	x = x + 100;
    }
}



function dibujarLetra(letra, x, y){
    pincel.textAlign = 'center';
    pincel.font = '48px serif';
    pincel.fillText(letra, x, y);

}

function dibujarLetraAcertada(letra, letrasPalabraElegida){
    console.log('entro a dibujarletraacertada');
    console.log('checkin letra y letrasPalabraElegida ' + letra + ' y ' + letrasPalabraElegida);
    for (var i = 0; i < letrasPalabraElegida.length; i++){
	event.stopPropagation();
	if (letra == letrasPalabraElegida[i]){
	    y = 395;
	    x = posicionesX[i] + 25;
	    console.log('estoy por dibujar letra, x, y');
	    dibujarLetra(letra, x, y);
	}
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
