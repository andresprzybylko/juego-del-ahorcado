var listaPalabras = ["GATO", "PERRO", "JUEGUETE", "PELOTA", "TROMPO", "ESTUPEFACTO"];

var botonIniciarJuego = document.querySelector("#iniciar-juego");

var palabraElegida = botonIniciarJuego.addEventListener("click",function(event){
    event.preventDefault();
    
    if (listaPalabras.length == 0){
	alert("Ya no quedan palabras disponibles para jugar. Presione Iniciar juego para una nueva partida");
	location.reload();
    }

    crearTableroJuego(); //canvas.js
    var palabraElegida = escogerPalabraSecreta(listaPalabras);
    mostrarGuiones(palabraElegida.length);
   
    console.log("Esta es la palabra elegida " + palabraElegida);
   
    var letras = palabraElegida.split("");
    console.log("Palabra dividida en letras: " + letras);
    letras.forEach(function(letra){
	
	console.log("cada letra " + letra);

    });

    return palabraElegida;
    
});


function escogerPalabraSecreta(listaPalabras){

    var pos = indiceAleatorio(listaPalabras);
    var seleccionAleatoria = listaPalabras[pos];
    console.log("seleccion aleatoria de palabra " + seleccionAleatoria);
    listaPalabras.splice(pos, 1);
    console.log("Quedan " + listaPalabras.length + " palabras para jugar: " + listaPalabras);
    //hacer funcion para escribir en pantalla las palabras eliminadas y tacharlas 
    return seleccionAleatoria;
}

function indiceAleatorio(listaPalabras) {
    indice = Math.round(Math.random() * (listaPalabras.length -1));
    return indice;
}



