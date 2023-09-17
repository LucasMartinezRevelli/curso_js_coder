// API Key obtenida desde el sitio web de TMDb
const apiKey = '1ab128a09cfa006a7c32b0dc4ab0847a';
// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('results');
const quieroList = document.getElementById('quieroList'); 
const vistasList = document.getElementById('vistasList');
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
                <button class="quieroBoton">Quiero</button>
                <button class="vistaBoton">Vista</button>
              </a>
            </ul>
            </div>
          `;
          resultsContainer.appendChild(item);
          // Agregar eventos de clic a los botones "Quiero" y "Vista" dentro del elemento actual
          const quieroBoton = item.querySelector('.quieroBoton');
          const vistaBoton = item.querySelector('.vistaBoton');
          quieroBoton.addEventListener('click', () => {
            const imageUrl = getImageUrl(result);
            agregarPeliculaQuiero(title, imageUrl);
            quieroBoton.disabled = true;
            quieroBoton.classList.add('pressed');
        });
          vistaBoton.addEventListener('click', () => {
            const imageUrl = getImageUrl(result);
            agregarPeliculaVista(title, imageUrl);
            vistaBoton.disabled = true;
        });
        }
    });
}
// Función para agregar una película a la lista "Quiero"
const agregarPeliculaQuiero = (title, imageUrl) => {
  // Verificar si la película ya está en la lista "Vista" y eliminarla si es necesario
  const peliculaEnVista = encontrarPeliculaEnLista(title, vistasList);
  if (peliculaEnVista) {
      vistasList.removeChild(peliculaEnVista);
      decrementarContadorV();
  }
  // Verificar si la película ya está en la lista "Quiero"
  const peliculaEnQuiero = encontrarPeliculaEnLista(title, quieroList);
  if (!peliculaEnQuiero) {
      // Si la película no está en la lista "Quiero" se agrega
      const listItem = document.createElement('li');
      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = title;
      listItem.appendChild(image);
      listItem.appendChild(document.createTextNode(title));
      quieroList.appendChild(listItem);
      // Guardar la lista actualizada en localStorage
    guardarListaEnLocalStorage('quieroList', quieroList.innerHTML);
  }
}
// Función para agregar una película a la lista "Vistas" con imagen
const agregarPeliculaVista = (title, imageUrl) => {
  // Verificar si la película ya está en la lista "Quiero" y eliminarla si es necesario
  const peliculaEnQuiero = encontrarPeliculaEnLista(title, quieroList);
  if (peliculaEnQuiero) {
      quieroList.removeChild(peliculaEnQuiero);
      decrementarContadorQ();
  }
  // Verificar si la película ya está en la lista "Vistas"
  const peliculaEnVista = encontrarPeliculaEnLista(title, vistasList);
  if (!peliculaEnVista) {
      // Si la película no está en la lista "Vistas", agrégala
      const listItem = document.createElement('li');
      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = title;
      listItem.appendChild(image);
      listItem.appendChild(document.createTextNode(title));
      vistasList.appendChild(listItem);
    // Guardar la lista actualizada en localStorage
    guardarListaEnLocalStorage('vistasList', vistasList.innerHTML);
  }
}
// Función para encontrar una película en una lista por su título
const encontrarPeliculaEnLista = (title, lista) => {
  const items = lista.getElementsByTagName('li');
  for (let i = 0; i < items.length; i++) {
      if (items[i].textContent.includes(title)) {
          return items[i];
      }
  }
  return null;
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
const storedVistas = localStorage.getItem('contadorVistas');
const storedQuiero = localStorage.getItem('contadorQuiero');
let contadorV = storedVistas ? parseInt(storedVistas) : 0;
let contadorQ = storedQuiero ? parseInt(storedQuiero) : 0;
// Función para incrementar el contador de Vistas
const incrementarContadorV = () => {
    contadorV++;
    actualizarContadorV();
    localStorage.setItem('contadorVistas', contadorV.toString());
}
// Función para incrementar el contador de Quiero
const incrementarContadorQ = () => {
    contadorQ++;
    actualizarContadorQ();
    localStorage.setItem('contadorQuiero', contadorQ.toString());
}
const actualizarContadorV = () => {
    contadorVistas.textContent = contadorV;
}
const actualizarContadorQ = () => {
    contadorQuiero.textContent = contadorQ;
}
// Función para decrementar el contador de Vistas
const decrementarContadorV = () => {
  if (contadorV > 0) {
      contadorV--;
      actualizarContadorV();
      localStorage.setItem('contadorVistas', contadorV.toString());
  }
}
// Función para decrementar el contador de Quiero
const decrementarContadorQ = () => {
  if (contadorQ > 0) {
      contadorQ--;
      actualizarContadorQ();
      localStorage.setItem('contadorQuiero', contadorQ.toString());
  }
}
actualizarContadorQ();
actualizarContadorV();
// Función para guardar una lista en localStorage
const guardarListaEnLocalStorage = (clave, valor) => {
  localStorage.setItem(clave, valor);
}
// Función para cargar una lista desde localStorage
const cargarListaDesdeLocalStorage = (clave, lista) => {
  const listaGuardada = localStorage.getItem(clave);
  if (listaGuardada) {
    lista.innerHTML = listaGuardada;
  }
}
// Llama a la función para cargar las listas al cargar la página
cargarListaDesdeLocalStorage('quieroList', quieroList);
cargarListaDesdeLocalStorage('vistasList', vistasList);
