
var botonIniciarJuego = document.querySelector("#iniciar-juego");
var listaPalabras = ["GATO", "PERRO", "JUEGUETE", "PELOTA", "TROMPO", "ESTUPEFACTO"];

botonIniciarJuego.addEventListener("click",function(event){
    event.preventDefault();

    crearTableroJuego();
    var palabraElegida = escogerPalabraSecreta(listaPalabras);
    console.log("Esta es la palabra elegida " + palabraElegida);
    var letras = palabraElegida.split("");
    console.log("Palabra dividida en letras: " + letras);
    letras.forEach(function(letra){
	
	console.log("cada letra " + letra);

    });

    var cantidadLineas = palabraElegida.length;
    dibujarLineas(cantidadLineas);
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



