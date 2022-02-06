var listaPalabras = ["GATO", "PERRO", "JUGUETE", "PELOTA", "TROMPO", "ESTUPEFACTO"];
var palabraElegida = "";
var letrasPalabraElegida = [];
var letrasAcertadas = [];
var letrasEquivocadas = new Set();

var botonIniciarJuego = document.querySelector("#iniciar-juego");
var html = document.querySelector("html");

botonIniciarJuego.addEventListener("click",function(event){
    //event.preventDefault();
    if (listaPalabras.length == 0){
	alert("Ya no quedan palabras disponibles para jugar. Presione Iniciar juego para una nueva partida");
	location.reload();
    }

    crearTableroJuego(); //canvas.js
    
    palabraElegida = escogerPalabraSecreta(listaPalabras);
    //mostrarGuiones(palabraElegida.length);
    console.log("Esta es la palabra elegida " + palabraElegida);

    letrasPalabraElegida = palabraElegida.split("");
    console.log(letrasPalabraElegida);


    //capturaTecla();
    html.addEventListener('keypress', (event) => {
	event.preventDefault();

	var letraCapturada = event.key;
        console.log('La letra capturada es: ' + letraCapturada);
	
	var testLetra = false;
        testLetra = validarLetra(letraCapturada);
        if (testLetra){
	    console.log('La letra ' + letraCapturada + ' es valida');
    	    compararLetras(letraCapturada, letrasPalabraElegida);
        }
	
    });

});



// Paso 1 - numero para indice que elige palabra - retorna un int ************
function indiceAleatorio(listaPalabras) {
    return Math.round(Math.random() * (listaPalabras.length -1));
}

// Paso 2 - seleccion palabra de la lista con indice aleatorio *****
function escogerPalabraSecreta(listaPalabras){

    var pos = indiceAleatorio(listaPalabras);
    var seleccionAleatoria = listaPalabras[pos];
    //console.log("seleccion aleatoria de palabra " + seleccionAleatoria);
    listaPalabras.splice(pos, 1);
    console.log("Quedan " + listaPalabras.length + " palabras para jugar: " + listaPalabras);
    //hacer funcion para escribir en pantalla las palabras eliminadas y tacharlas 
    return seleccionAleatoria;
}


// Paso 3 - captura de tecla presionada - devuelve string con la letra

//function capturaTecla(){ 
//}

    
// Paso 4 - validar letra - devuelve boolean
function validarLetra(letra){
    caracter = letra.charCodeAt();
    var resultado;
    if (caracter >= 65 && caracter <= 90) {
	resultado = true;
    }else{
	// ***** cambiar este alert por box en html *******
	alert('Ingrese una letra válida. Sólo mayúsculas y sin caracteres especiales ni números');
	resultado = false;
    }
    return resultado;
}

// verificar si pertenece a la palabra elegida y si lo es, escribirla en su lugar sobre los guiones

function compararLetras(letraParaComparar, letrasPalabraElegida){

    var usoPrevio = verificarUsoPrevio(letraParaComparar);
    if (!usoPrevio){
        console.log("Palabra dividida en letras: " + letrasPalabraElegida);


        if (letrasPalabraElegida.includes(letraParaComparar)){
            letrasPalabraElegida.forEach(function(letra){
                if (letraParaComparar == letra){
            	letrasAcertadas.push(letra);
                }
            });
            

        }else{
            if(letraParaComparar){
                letrasEquivocadas.add(letraParaComparar);
                alert("Su letra elegida no está en la palabra secreta");
            }
        }
    }
}


/*
function compararLetras(letraCapturada, letras){

    console.log("Palabra dividida en letras: " + letras);
    var cantidadLetras = letras.length;
    for (var i = 0; i < cantidadLetras; i++){
	console.log("cada letra " + letras[i]);
	console.log(letras.length);	
	if (letras[i] == letraCapturada ){
	    console.log("Esta letra esta siendo dibujada en el canvas");

	    letrasAcertadas.push(letraCapturada);
            if (letras.length == letrasAcertadas.length){
                alert('Felicidades! Ha ganado el juego adivinando la palabra ' + palabraElegida);
		letrasAcertadas.splice(0); // vacio el contenido de este array para elegir otra palabra
	    }
	}else{
	    console.log('No coincide');
	    letrasEquivocadas.push(letraCapturada);
	}
	console.log("Estas son las letras que quedan por adivinar: " + (letras.length - letrasAcertadas.length)); 
    }
}
*/
function verificarUsoPrevio(letra){
    var letraVerificada = true;
    var warning = "Esa letra ya fue utilizada. Ingrese otra letra";
    console.log("Se verifico letra si fue usada");
    if (letrasAcertadas.length > 0 && letrasAcertadas.includes(letra)){
	alert(warning);
    }else if (letrasEquivocadas.size > 0 && letrasEquivocadas.has(letra)){
	alert(warning);
    }else{
	letraVerificada = false;
    }
    return letraVerificada;
}





	
/*
        if(letrasErroneas.includes(letra)){
            alert('Esa letra ya fue utilizada');
	}else if (letras.includes(letra)){
	    letrasErroneas.push(letra);

	        }else{
	letrasErroneas.push(letra);

	    letraAcertada.push(letra);
    console.log(letrasErroneas);
*/

/*
function compararLetras(letraCapturada){

    console.log("Palabra dividida en letras: " + letras);

    
    for (var i = 0; i < letras.length; i++){
	console.log("cada letra " + letras[i]);
	console.log(letras.length);	
	if (letras[i] == letraCapturada){
	    console.log("Esta letra esta siendo dibujada en el canvas");
	    letras.splice(i, 1);
	    i = i -1 ; // para compensar el indice
	    /* VERIFICARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
            if (letras.length == 0){
                alert('Felicidades! Ha ganado el juego adivinando la palabra ' + palabraElegida);
	    }*//*
	}else{
	    console.log('No coincide');
	}
	
    }
    console.log("Estas son las letras que quedan por adivinar: " + letras); 
}
*/
