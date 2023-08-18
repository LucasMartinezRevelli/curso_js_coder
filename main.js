/////////////////////////PRIMER ALGORITMO/////////////////////////////////////
/*alert("Especifique su edad para poder pasar al boliche");
let respuesta = parseInt(prompt("ingrese su edad:"));
if (respuesta >=18 && respuesta <=50){
  alert("Podes ingresar");
}
else if(respuesta>50){
  alert("No puede ingresar porque es muy mayor");
}
else{
alert("No podes ingresar");
}

//////////////////////////////////////SEGUNDO ALGORITMO///////////////////////////////////////////////////

alert ("AHORA PASEMOS AL SEGUNDO ALGORITMO");
alert("Adiviná el número que se encuentra del 1 al 10");
let res = parseInt(prompt("Ingrese un número del 1 al 10"));
while(res != 8){
  alert("intentá de nuevo");
  res = parseInt(prompt("ingrese otro número"));
}
alert("GANASTE!!!");

///////////////////////////////TERCER Y ÚLTIMO ALGORITMO/////////////////////////////////////
alert("Para salir, solo escriba la palabra SALIR");
alert("Para salir, solo escriba la palabra SALIR");
let entrada = prompt("Ingresar un nombre");
while (entrada != "SALIR") {
  switch (entrada) {
    case `${entrada}`:
      alert("Hola!!! "+`${entrada}`);
      break;
    default:
      alert("¿Nombre?");
      break;
  }
  entrada = prompt("Ingresar un nombre");
}*/

//creo la clase constructora para las peliculas
const listaQuiero = [];
const listaVistas = [];
//////////////////////////////////////////////////////////////////////////////////////////    CLASES   ///////////////////////////////////////
//se crea clase constructora para las peliculas que quiero
class Quiero {
  constructor(titulo) {
      this.titulo = titulo;
  }

  obtenerInformacionQuiero() {                          //se crea evento
    console.log(`Agregado a quiero: ${this.titulo}`);
  }
}

//se crea clase constructora para las peliculas que ya las vi
class Vistas {
  constructor(titulo) {
      this.titulo = titulo;
  }
  obtenerInformacionVistas() {                           //se crea evento
    console.log(`Agregado a vistas: ${this.titulo}`);
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('agregarQuiero').addEventListener('click', () =>                    //obtengo valor del input de QUIERO
{
  const titulo = document.getElementById('entrada').value;
  const nuevoQuiero = new Quiero(titulo);                       //se crea objeto con los valores ingresados
  nuevoQuiero.obtenerInformacionQuiero();                       //se llama al evento

  listaQuiero.push(nuevoQuiero);                                  //se agrega dato a array
});

document.getElementById('agregarVistas').addEventListener('click', () =>        //obtengo valor del input de VISTAS
{
  const titulo = document.getElementById('entrada').value;
  const nuevaVista = new Vistas(titulo);                              //se crea objeto con los valores ingresados

  nuevaVista.obtenerInformacionVistas();

  listaVistas.push(nuevaVista); 
});


console.log(listaQuiero);
console.log(listaVistas);
