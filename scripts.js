console.log(`Proyecto Final: Listado de Ofertas de Trabajo con Filtrado`);

fetch(`./public/data/data.json`)
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

if (database == null) {
    crearOferta(arrOfertas);
    console.log("loaded from json");
} else crearOferta(database);
console.log("loaded from local");

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
            template.querySelector(".oferta__remote").textContent = "";
            if (el.remote === true) {
                template.querySelector(".oferta__remote").textContent = "REMOTO";
            }
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
    for (let i = 0; i < tarjetas.length; ++i) {
        tarjetas[i].remove();
    }
}

// FILTROS
const filtro = document.getElementById(`input`);
filtro.addEventListener("keyup", filtros);

function filtros() {
    let filtro = this.value;
    let data = JSON.parse(localStorage.getItem("oferta"));
    let arrdata = Array.from(data);
    const database = filtrarDatos(filtro, data);
    crearOferta(database);
}

function filtrarDatos(value, data) {
    const arrFiltrado = [];

    for (let i = 0; i < data.length; i++) {
        value = value.toLowerCase();
        let name = data[i].nombre.toLowerCase();

        if (name.includes(value)) {
            arrFiltrado.push(data[i]);
        }
    }
    return arrFiltrado;
}
