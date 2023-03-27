const formulario = document.querySelector(".formulario");
const contenedor_busqueda = document.querySelector(".contenedor_busqueda");

const APIKEY = "c567b85da3d146a868ab3b33e667ff52";

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
  console.log(data);
}
