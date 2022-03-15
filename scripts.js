console.log(`Desafio Tema: To do App`);

crearOferta();

const botonAgregar = document.getElementById(`btn__agregar`);
botonAgregar.addEventListener(`click`, obtenerDatos);

const botonReset = document.getElementById(`btn__reset`);
botonReset.addEventListener(`click`, eliminarTodo);

const botonSearch = document.getElementById(`btn__search`);
botonSearch.addEventListener(`click`, filtrarDatos);

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

    if (localStorage.getItem("oferta") === null) {
        let arrOfertas = [];
        arrOfertas.push(nuevaOferta);
        localStorage.setItem("oferta", JSON.stringify(arrOfertas));
    } else {
        let arrOfertas = JSON.parse(localStorage.getItem("oferta"));
        arrOfertas.push(nuevaOferta);
        localStorage.setItem("oferta", JSON.stringify(arrOfertas));
    }
    crearOferta();
}

// CREA EN EL DOM LA VISUALIZACION DE LAS OFERTAS
function crearOferta() {
    let database = JSON.parse(localStorage.getItem("oferta"));
    const tarjetas = document.querySelectorAll(".tarjeta__ofertas");
    for (let i = 0; i < tarjetas.length; ++i) {
        tarjetas[i].remove();
    }

    for (let i = 0; i < database.length; i++) {
        let titulo = database[i].nombre;
        let descripcion = database[i].descripcion;
        let propiedad1 = database[i].jornada;
        let propiedad2 = database[i].lugar;
        let propiedad3 = database[i].remote;
        let propiedad4 = database[i].division;
        let propiedad5 = database[i].seniority;

        const root = document.getElementById(`root`);
        const nuevoDivTarjeta = document.createElement(`div`);
        const nuevoDivTexto = document.createElement(`div`);
        const nuevoH3Titulo = document.createElement(`h3`);
        const nuevoSpanDescripcion = document.createElement(`span`);
        const nuevoDivPropiedades = document.createElement(`div`);
        const nuevoP1 = document.createElement(`p`);
        const nuevoP2 = document.createElement(`p`);
        const nuevoP3 = document.createElement(`span`);
        const nuevoP4 = document.createElement(`p`);
        const nuevoP5 = document.createElement(`p`);

        nuevoDivTarjeta.className += "tarjeta__ofertas d-flex justify-content-between align-items-center p-4 m-1 rounded-3";
        nuevoDivPropiedades.className += "d-flex gap-2 align-items-baseline";
        nuevoP3.className += "badge bg-warning rounded-pill fs-6";

        nuevoH3Titulo.innerText = titulo;
        nuevoSpanDescripcion.innerText = descripcion;
        nuevoP1.innerText = propiedad1;
        nuevoP2.innerText = propiedad2;

        if (propiedad3 == true) {
            nuevoP3.innerText = "Remote";
        }

        nuevoP4.innerText = propiedad4;
        nuevoP5.innerText = propiedad5;

        root.appendChild(nuevoDivTarjeta);
        nuevoDivTarjeta.appendChild(nuevoDivTexto);
        nuevoDivTexto.appendChild(nuevoH3Titulo);
        nuevoDivTexto.appendChild(nuevoSpanDescripcion);
        nuevoDivTarjeta.appendChild(nuevoDivPropiedades);
        nuevoDivPropiedades.appendChild(nuevoP1);
        nuevoDivPropiedades.appendChild(nuevoP2);
        nuevoH3Titulo.appendChild(nuevoP3);
        nuevoDivPropiedades.appendChild(nuevoP4);
        nuevoDivPropiedades.appendChild(nuevoP5);
    }
}

// function botonEliminar() {
//     const nuevoBtn = document.createElement(`button`);
//     nuevoBtn.className += "btn-close";

//     nuevoBtn.addEventListener(`click`, (e) => {
//         const divAEliminar = e.target.parentElement;
//         const root = document.getElementById(`root`);

//         root.removeChild(divAEliminar);
//     });
//     return nuevoBtn;
// }

// OBTIENE DATOS DEL LOCAL STORAGE, ELIMINA TODO Y ACTULIZA EL LOCAL STORAGE, LUEGO ELIMINA TODO ELEMENTO DEL DOM
function eliminarTodo() {
    let arrOfertas = JSON.parse(localStorage.getItem("oferta"));

    arrOfertas.splice(0);

    localStorage.setItem("oferta", JSON.stringify(arrOfertas));

    const tarjetas = document.querySelectorAll(".tarjeta__ofertas");
    for (let i = 0; i < tarjetas.length; ++i) {
        tarjetas[i].remove();
    }
}

// function tacharActividad() {
//     const tilde = document.createElement(`input`);
//     tilde.setAttribute("type", "checkbox");

//     tilde.addEventListener(`change`, (e) => {
//         const spanAModificar = tilde.parentNode.querySelector("span");
//         if (e.target.checked) {
//             spanAModificar.className += "text-decoration-line-through fst-italic";
//             console.log(spanAModificar);
//         } else {
//             spanAModificar.className = ``;
//         }
//     });
//     return tilde;
// }

function filtrarDatos() {
    let arrOfertas = JSON.parse(localStorage.getItem("oferta"));
    //console.log(arrOfertas);
    const busqueda = "Front end";
    //console.log(busqueda);
    console.log("apretamo");
    arrFiltrado = [];

    arrOfertas.forEach((object) => {
        if (object.nombre === "Front end") {
            arrFiltrado.push(object);
        }
        return arrFiltrado;
    });

    console.log(arrFiltrado);

    //let arrFiltrado = arrOfertas.filter((e) => e.nombre == busqueda);

    //console.log(arrFiltrado);

    // for (let i = 0; i < arrOfertas.length; ++i) {
    //     let objeto = arrOfertas[i];

    //     let results = objeto.filter(function (e) {
    //         return e.nombre == busqueda;
    //     });

    //     console.log(results);
    // }
}
