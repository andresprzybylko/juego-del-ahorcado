var listaPalabras = ["GATO", "PERRO", "JUGUETE", "PELOTA", "TROMPO", "ESTUPEFACTO"];
var nuevaPalabra = false;
var palabraElegida = "";
var letrasPalabraElegida = [];
var letrasAcertadas = [];
var letrasEquivocadas = new Set();
var juegoTerminado = false;
var mensajeFinal = "";
var mensaje = "";

//emojis
var tristeEmoji = String.fromCodePoint(128549);
var abrazoEmoji = String.fromCodePoint(129303);
var pulgarArribaEmoji = String.fromCodePoint(128077); 
var pulgarAbajoEmoji = String.fromCodePoint(128078); 
var altoEmoji = String.fromCodePoint(129306);
var invalidoEmoji = String.fromCodePoint(9940);

//sonidos
var sonidoInicio = new Audio("sounds/intro.wav");
var sonidoFinJuegoPerdedor = new Audio("sounds/240195__doctor-jekyll__wah-wah-trumpet-failed-joke-punch-line.wav");
var sonidoFinJuegoGanador = new Audio("sounds/15383_1460406134.mp3");

//selectores
var botonIniciarJuego = document.querySelector("#iniciar-juego");
var html = document.querySelector("html");
var cartelError = document.querySelector("#cartel-error");

//desarrollo
botonIniciarJuego.addEventListener("click",function(event){
    sonidoInicio.play();
    crearTableroJuego(); //canvas.js
    
    if (nuevaPalabra){
	let pos = listaPalabras.length;
	console.log('numero' + pos);
	palabraElegida = listaPalabras[pos - 1];
    }else{
	palabraElegida = escogerPalabraSecreta(listaPalabras);
    }

    mostrarGuiones(palabraElegida.length);
    letrasPalabraElegida = palabraElegida.split("");

    dibujarHorca();

    html.addEventListener('keypress', (event) => {
        event.preventDefault();
        if(juegoTerminado){
	    document.querySelector(".titulo").scrollIntoView();
	    setTimeout(function(){
		location.reload();
	    }, 1000);
    	}else{
	    limpiarMensaje();
            var letraCapturada = event.key;
            var testLetra = false;
            testLetra = validarLetra(letraCapturada);
            if (testLetra){
		compararLetras(letraCapturada, letrasPalabraElegida);
            }
    	}
    });
    
});

// retorna numero aleatorio
function indiceAleatorio(listaPalabras) {
    return Math.round(Math.random() * (listaPalabras.length -1));
}

//selecciona palabra de la lista con indice aleatorio 
function escogerPalabraSecreta(listaPalabras){
    var pos = indiceAleatorio(listaPalabras);
    var seleccionAleatoria = listaPalabras[pos];
    return seleccionAleatoria;
}
    
//validar letra - devuelve boolean
function validarLetra(letra){
    caracter = letra.charCodeAt();
    var resultado;
    if ((caracter >= 65 && caracter <= 90) && (letra !="Enter")) {
	resultado = true;
    }else{
	mensaje = invalidoEmoji + " Ingrese una letra válida.<br>Sólo mayúsculas.<br>Sin caracteres especiales.<br>Sin números.";
	mostrarMensaje(mensaje);
	resultado = false;
    }
    return resultado;
}

function verificarUsoPrevio(letra){
    var letraVerificada = true;
    mensaje = altoEmoji + "<br>Esa letra ya fue utilizada.<br>Ingrese otra letra.";
    if (letrasAcertadas.length > 0 && letrasAcertadas.includes(letra)){
	mostrarMensaje(mensaje);
    }else if (letrasEquivocadas.size > 0 && letrasEquivocadas.has(letra)){
	mostrarMensaje(mensaje);
    }else{
	letraVerificada = false;
    }
    return letraVerificada;
}

// verificar si pertenece a la palabra elegida y si lo es, escribirla en su lugar sobre los guiones
function compararLetras(letraParaComparar, letrasPalabraElegida){
    var usoPrevio = verificarUsoPrevio(letraParaComparar);
    if (!usoPrevio){
        
	if (letrasPalabraElegida.includes(letraParaComparar)){
            letrasPalabraElegida.forEach(function(letra){
                
		if (letraParaComparar == letra){
		    letrasAcertadas.push(letra);
		    dibujarLetraAcertada(letra, letrasPalabraElegida);
		    mostrarMensaje(pulgarArribaEmoji);
		    if (letrasPalabraElegida.length == letrasAcertadas.length){
			mensaje = '¡Felicidades! <br>Ha ganado el juego ' + abrazoEmoji + '<br>Presione cualquier tecla para volver a jugar';
			mostrarMensaje(mensaje);
			sonidoFinJuegoGanador.play();
			juegoTerminado = true;
		    }
                }
            });
        }else{
            if(letraParaComparar){
                letrasEquivocadas.add(letraParaComparar);
		dibujarLetraEquivocada(letraParaComparar, letrasEquivocadas);
		dibujarParteCuerpo(letrasEquivocadas);
                mensaje = pulgarAbajoEmoji + "Su letra elegida no está en la palabra secreta";
		mostrarMensaje(mensaje);
		if (letrasEquivocadas.size == 6){
		    mensaje = 'Esta vez no lo logró. ' + tristeEmoji + '<br>Inténtelo nuevamente.<br>Presione cualquier tecla para volver a jugar';
		    mostrarMensaje(mensaje);
		   // sonidoAmbiente.pause();
		    sonidoFinJuegoPerdedor.play();
		    juegoTerminado = true;
		}
            }
        }
    }
}


function mostrarMensaje(mensaje){
    cartelError.innerHTML = mensaje;
}

function limpiarMensaje(){
    cartelError.innerHTML = ""; 
}

/*
//funcion de MDN
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

*/

var botonAgregarPalabra = document.querySelector("#nueva-palabra");

botonAgregarPalabra.addEventListener("click",function(event){
    var inputPalabra = document.querySelector("#input-nueva-palabra").value;
    var palabraMayuscula = inputPalabra.toUpperCase();
    listaPalabras.push(palabraMayuscula);
    nuevaPalabra = true;
    document.querySelector("#input-nueva-palabra").value = "";    
});
