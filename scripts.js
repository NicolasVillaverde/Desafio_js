console.log(`Desafio Tema: To do App`);

fetch(`./data/data.json`)
    .then((r) => r.json())
    .then((data) => {
        let arrOfertas = data || [];
        localStorage.setItem("oferta", JSON.stringify(arrOfertas));
    });

let database = JSON.parse(localStorage.getItem("oferta"));

const botonAgregar = document.getElementById(`btn__agregar`);
botonAgregar.addEventListener(`click`, obtenerDatos);

const botonReset = document.getElementById(`btn__reset`);
botonReset.addEventListener(`click`, eliminarTodo);

const filtroDivisionFront = document.getElementById(`btn__front`);
filtroDivisionFront.addEventListener(`click`, filtrarDatosFrontEnd);

const filtroDivisionBack = document.getElementById(`btn__back`);
filtroDivisionBack.addEventListener(`click`, filtrarDatosBackEnd);

const filtroPlaceArg = document.getElementById(`btn__arg`);
filtroPlaceArg.addEventListener(`click`, filtrarDatosArg);

const filtroPlaceUsa = document.getElementById(`btn__usa`);
filtroPlaceUsa.addEventListener(`click`, filtrarDatosUsa);

crearOferta(database);

// FUNCION OBTIENE DATOS DEL FORMULARIO, CREA BASE DE DATOS O ACTUALIZA Y DISPARA FUNCION PARA VISUALIZAR OFERTAS
function obtenerDatos() {
    const nombre = document.getElementById(`offerName`).value;
    const descripcion = document.getElementById(`descriptionText`).value;
    const jornada = document.getElementById(`inputGroupJornada`).value;
    const lugar = document.getElementById(`inputGroupLugar`).value;
    const remote = document.getElementById(`flexSwitchRemote`).checked;
    const division = document.getElementById(`inputGroupDivision`).value;
    const seniority = document.getElementById(`inputGroupSeniority`).value;

    class oferta {
        constructor(nombre, descripcion, jornada, lugar, remote, division, seniority) {
            this.nombre = nombre;
            this.descripcion = descripcion;
            this.jornada = jornada;
            this.lugar = lugar;
            this.remote = remote;
            this.division = division;
            this.seniority = seniority;
        }
    }

    let nuevaOferta = new oferta(nombre, descripcion, jornada, lugar, remote, division, seniority);

    let arrOfertas = JSON.parse(localStorage.getItem("oferta")) || [];
    arrOfertas.push(nuevaOferta);
    localStorage.setItem("oferta", JSON.stringify(arrOfertas));

    Toastify({
        text: "Oferta cargada con éxito!",
        duration: 5000,
        gravity: "bottom",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();

    crearOferta(arrOfertas);
}

//CREA VISUALIZACION DE OFERTAS EN EL DOM
function crearOferta(database) {
    eliminarOfertas();
    const contendorOfertas = document.querySelector("#contedor__ofertas");
    const template = document.querySelector("#template-ofertas").content;
    const fragment = document.createDocumentFragment();
    if (database === null) {
        return;
    } else {
        database.forEach((el) => {
            template.querySelector(".oferta__tittle").textContent = el.nombre;
            template.querySelector(".oferta__descripcion").textContent = el.descripcion;
            template.querySelector(".oferta__jornada").textContent = el.jornada;
            template.querySelector(".oferta__lugar").textContent = el.lugar;
            template.querySelector(".oferta__division").textContent = el.division;
            template.querySelector(".oferta__seniority").textContent = el.seniority;
            const clone = template.cloneNode(true);
            fragment.appendChild(clone);
        });
        contendorOfertas.appendChild(fragment);
    }
}

// OBTIENE DATOS DEL LOCAL STORAGE, ELIMINA TODO Y ACTULIZA EL LOCAL STORAGE, LUEGO ELIMINA TODO ELEMENTO DEL DOM
function eliminarTodo() {
    let arrOfertas = JSON.parse(localStorage.getItem("oferta"));

    arrOfertas.splice(0);

    localStorage.setItem("oferta", JSON.stringify(arrOfertas));

    eliminarOfertas();
}
// ELIMINA DEL DOM LAS OFERTAS
function eliminarOfertas() {
    const tarjetas = document.querySelectorAll(".tarjeta__ofertas");
    console.log(tarjetas);
    for (let i = 0; i < tarjetas.length; ++i) {
        tarjetas[i].remove();
    }
}

// FILTROS

function filtrarDatosFrontEnd() {
    let arrOfertas = JSON.parse(localStorage.getItem("oferta"));
    const result = arrOfertas.filter((objeto) => objeto.division === "Front-End");
    console.log(result);
    mostrarOfertasFiltradas(result);
}

function filtrarDatosBackEnd() {
    let arrOfertas = JSON.parse(localStorage.getItem("oferta"));
    const result = arrOfertas.filter((objeto) => objeto.division === "Back-End");
    console.log(result);
    mostrarOfertasFiltradas(result);
}

function filtrarDatosArg() {
    let arrOfertas = JSON.parse(localStorage.getItem("oferta"));
    const result = arrOfertas.filter((objeto) => objeto.lugar === "ARG");
    console.log(result);
    mostrarOfertasFiltradas(result);
}

function filtrarDatosUsa() {
    let arrOfertas = JSON.parse(localStorage.getItem("oferta"));
    const result = arrOfertas.filter((objeto) => objeto.lugar === "USA");
    console.log(result);
    mostrarOfertasFiltradas(result);
}

function mostrarOfertasFiltradas(database) {
    eliminarOfertas();
    crearOferta(database);
}
