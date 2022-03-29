console.log(`Desafio Tema: To do App`);

crearOferta();

const botonAgregar = document.getElementById(`btn__agregar`);
botonAgregar.addEventListener(`click`, obtenerDatos);

const botonReset = document.getElementById(`btn__reset`);
botonReset.addEventListener(`click`, eliminarTodo);

const filtroDivision = document.getElementById(`btn__division`);
filtroDivision.addEventListener(`click`, filtrarDatosDivision);

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

    crearOferta();
}

//CREA VISUALIZACION DE OFERTAS EN EL DOM
function crearOferta() {
    eliminarOfertas();
    const contendorOfertas = document.querySelector("#contedor__ofertas");
    let database = JSON.parse(localStorage.getItem("oferta"));
    const template = document.querySelector("#template-ofertas").content;
    const fragment = document.createDocumentFragment();

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

function filtrarDatosDivision() {
    const filter = filtroDivision.value;
    console.log(filter);
    let arrOfertas = JSON.parse(localStorage.getItem("oferta"));
    const result = arrOfertas.filter((objeto) => objeto.division == filter);
    console.log(result);
    mostrarOfertasFiltradas(result);
}

function mostrarOfertasFiltradas(database) {
    eliminarOfertas();
    const dinamico = document.querySelector("#div_ofertas");
    for (let i = 0; i < database.length; i++) {
        const fetch = document.querySelector("#div_ofertas").innerHTML;
        const remoto = database[i].remote == true ? true : "d-none";
        dinamico.innerHTML =
            `<div id="cards${i}" class="tarjeta__oferta d-flex justify-content-between align-items-center p-4 my-2 rounded-3">
                <div>
                    <h3>${database[i].nombre}<span class="badge bg-warning rounded-pill fs-6 ${remoto}">Remoto</span></h2>
                    <span>${database[i].descripcion}</span>
                </div>
                <div class="d-flex gap-2 align-items-baseline">
                    <p>${database[i].jornada}</p>
                    <p>${database[i].lugar}</p>
                    <p>${database[i].division}</p>
                    <p>${database[i].seniority}</p>
                </div>
            </div>` + fetch;
    }
}
