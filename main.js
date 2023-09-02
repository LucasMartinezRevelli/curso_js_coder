// API Key obtenida desde el sitio web de TMDb
const apiKey = '1ab128a09cfa006a7c32b0dc4ab0847a';

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('results');

// Agregar un evento de clic al botón de búsqueda
searchButton.addEventListener('click', async () => {
    const valorEntrada = searchInput.value.trim();  //Se obtiene el valor del campo de entrada de búsqueda y se elimina cualquier espacio
    if (valorEntrada === '') return;

    const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${valorEntrada}`;

    try {
        const respuesta = await fetch(url); // Esperar a que la solicitud se complete
        const data = await respuesta.json(); // Esperar a que los datos se conviertan a JSON
        displayResults(data.results); // Llamar a la función para mostrar los resultados
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

// Función para mostrar los resultados en el contenedor de resultados
const displayResults = (results) => {
    resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

    results.forEach(result => {
        const item = document.createElement('div');

        const title = result.title || result.name || 'Título no disponible';
        //const overview = result.overview || 'Descripción no disponible';
        const imageUrl = getImageUrl(result); // Obtener la URL de la imagen

        //PARA VERIFICAR URL DE LA IMAGEN
        const imgElement = new Image(); // Crear un elemento <img> para verificar la URL
        imgElement.src = imageUrl;
  
        imgElement.onload = () => { // Se ejecuta si la imagen se carga correctamente

          item.innerHTML = `
            <div>
            <ul>
              <a class="card">
                <img src="${imageUrl}" alt="${title} Image">
                <h4>${title}</h4>
                <button class="quieroBoton" id="quieroBoton">Quiero</button>
                <button class="vistaBoton" id="vistasBoton">Vista</button>
              </a>
            </ul>
            </div>
              
          `;
          resultsContainer.appendChild(item);
        }
    });
}

// Función para obtener la URL de la imagen
const getImageUrl = (result) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    const posterPath = result.poster_path;
    return posterPath ? `${baseUrl}${posterPath}` : 'URL_DE_IMAGEN_POR_DEFECTO';
}
document.addEventListener("click", function(event) {
  let buscador = document.getElementById("results");
  // Si el clic no ocurrió dentro del buscador ni en ningún elemento descendiente, borramos el contenido
  if (!buscador.contains(event.target)) {
      buscador.innerHTML = ""; // Borra el contenido del buscador
  }
});

resultsContainer.addEventListener("click", function(event) {
    // Verifica si el clic ocurrió en un botón con clase "vistaBoton"
    if (event.target.classList.contains("vistaBoton")) {
        incrementarContadorV();
    }

    // Verifica si el clic ocurrió en un botón con clase "quieroBoton"
    if (event.target.classList.contains("quieroBoton")) {
        incrementarContadorQ();
    }
});


const contadorVistas = document.getElementById("contadorVistas");
const contadorQuiero = document.getElementById("contadorQuiero");
const botonIncrementarVistas = document.getElementById("vistasBoton");
const botonIncrementarQuiero = document.getElementById("quieroBoton");

let contadorV = 0;
let contadorQ = 0;
// Función para incrementar el contador de Vistas
const incrementarContadorV = () => {
    contadorV++;
    actualizarContadorV();
}

// Función para incrementar el contador de Quiero
const incrementarContadorQ = () => {
    contadorQ++;
    actualizarContadorQ();
}
const actualizarContadorV = () => {
    contadorVistas.textContent = contadorV;
}
const actualizarContadorQ = () => {
    contadorQuiero.textContent = contadorQ;
}
botonIncrementarVistas.addEventListener("click", incrementarContadorV);
botonIncrementarQuiero.addEventListener("click", incrementarContadorQ);

actualizarContadorV();
actualizarContadorQ();




////////////////FALTA REVISAR PARA IMPLEMENTAR!!!!!!!!!!!!!!!!!!!!!!!!!!
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
/*const listaQuiero = [];
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
*/
