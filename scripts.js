console.log(`Primera entrega del Proyecto Final`);

const listadoDeOfertas = [];
let cadenaDeOfertas = [];
let indice = ``;

class oferta {
    constructor(trabajo, modalidad, pais) {
        this.trabajo = trabajo;
        this.modalidad = modalidad;
        this.pais = pais;
    }
}

// Ingreso de ofertas y caracteristicas

while (true) {
    let ingresoOferta = confirm(`Desea ingresar una nueva oferta?\n Presione Aceptar para continuar o Cancelar para salir`);
    if (ingresoOferta == true) {
        const nuevoTrabajo = prompt(`Nombre de la oferta quieres incluir?`).toLowerCase();
        const nuevaModalidad = prompt(`Modalidad de la oferta quieres incluir?`).toLowerCase();
        const nuevoPais = prompt(`Pais de la oferta quieres incluir?`).toLowerCase();

        const nuevaOferta = new oferta(nuevoTrabajo, nuevaModalidad, nuevoPais);

        listadoDeOfertas.push(nuevaOferta);
    } else {
        break;
    }
}

// Crear indice de cadena de ofertas

function indiceDeCadena(arr, fn) {
    indice = ``;
    const trabajos = arr.map((el) => el.trabajo);
    fn(trabajos);
}

function crearIndice(arr) {
    for (let i = 0; i < arr.length; i++) {
        indice += `${i + 1}: ${arr[i]}\n`;
    }
}
indiceDeCadena(listadoDeOfertas, crearIndice);

// Eliminar ofertas y mostrar ofertas disponibles

if (listadoDeOfertas.length > 0) {
    let eliminarActividad = confirm(`Las ofertas de trabajo ingresadas son \n${indice}. Deseas eliminar alguna?\n Ingrese SI o NO`);

    if (eliminarActividad == true) {
        let ofertasAEliminar = parseInt(prompt(`Qué ofertas de trabajo quieres eliminar? ${indice}\n Ingrese el numero de la actividad`));
        ofertasAEliminar--;

        listadoDeOfertas.splice(ofertasAEliminar, 1);
        indiceDeCadena(listadoDeOfertas, crearIndice);
        alert(`Las ofertas disponibles son \n${indice}`);
    } else {
        alert(`Las ofertas disponibles son \n${indice}`);
    }
} else {
    alert(`No hay ofertas disponibles`);
}
