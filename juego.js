
var botonIniciarJuego = document.querySelector("#iniciar-juego");

botonIniciarJuego.addEventListener("click",function(event){
    event.preventDefault();

    crearTableroJuego();
    var palabraElegida = escogerPalabraSecreta();
    
});


function escogerPalabraSecreta(){
    var listaPalabras = ["gato", "perro", "juguete", "pelota", "trompo"];
    var seleccionAleatoria = listaPalabras[indiceAleatorio(listaPalabras)];
    // si la palabra ya fue elegida previamente sacarla de la lista  
    console.log(seleccionAleatoria);

}

function indiceAleatorio(listaPalabras) {
    indice = Math.round(Math.random() * (listaPalabras.length -1));
    console.log(indice)
    return indice;
}
