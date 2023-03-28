const formulario = document.querySelector(".formulario");
const contenedor_busqueda = document.querySelector(".contenedor_busqueda");
const btnSlide = document.querySelector(".btnSlide");
const col_1 = document.querySelector(".col_1");
const col_2 = document.querySelector(".col_2");
const quitarSlide = document.querySelector(".quitarSlide");
const titulo = document.querySelector(".titulo");
const nombre_ciudad = document.querySelector(".nombre_ciudad");

const nubosidad = document.querySelector(".nubosidad");
const maxima = document.querySelector(".maxima");
const minima = document.querySelector(".minima");

const APIKEY = "c567b85da3d146a868ab3b33e667ff52";

/*****ocultar y mostrar*** */
btnSlide.addEventListener("click", () => {
  if (col_1.style.display === "none") {
    col_1.style.display = "block";
    col_2.style.display = "none";
  } else {
    col_1.style.display = "none";
  }
});

quitarSlide.addEventListener("click", () => {
  if (col_2.style.display === "none") {
    col_2.style.display = "block";
    col_1.style.display = "none";
  } else {
    col_2.style.display = "none";
  }
});

/*********consumo api***** */

document.addEventListener("DOMContentLoaded", () => {
  formulario.addEventListener("submit", enviarFormulario);
  function enviarFormulario(e) {
    e.preventDefault();
    const inputBusqueda = document.querySelector(".inputBusqueda").value;

    if (inputBusqueda === "") {
      const divMensaje = document.createElement("div");
      divMensaje.classList.add("error");

      divMensaje.textContent = "Por favor llena el campo";

      formulario.appendChild(divMensaje);

      setTimeout(() => {
        divMensaje.remove();
      }, 2000);
    }

    obtenerDataClima(inputBusqueda);
    formulario.reset();
  }
});

async function obtenerDataClima(inputBusqueda) {
  try {
    const data = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputBusqueda}&appid=${APIKEY}`
      )
    ).json();
    mostrarData(data);
  } catch (error) {
    console.log(error);
  }
}

function mostrarData(data) {
  const {
    main: { temp_max, temp_min, temp },
    name,
    clouds: { all },
  } = data;

  titulo.textContent = temp + "°K";
  nombre_ciudad.textContent = name;
  nubosidad.textContent = all;
  minima.textContent = temp_min;
  maxima.textContent = temp_max;
}
