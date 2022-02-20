const inflation = 3.641;
const anioActual = 2020;
let acumuladorValorFinal = 1.03641;

let inputValue = parseFloat(prompt(`Ingrese un valor que le gustaria actualizar por inflacion`));
let yearValue = parseInt(prompt(`Ingrese el año del que quiziera conocer el valor`));

// Calcula los años a contemplar
function calcularAnioMenor(valoranio) {
    return anioActual - valoranio;
}

function calcularAnioMayor(valoranio) {
    return valoranio - anioActual;
}

let periodoAnios;

if (yearValue > anioActual) {
    periodoAnios = calcularAnioMayor(yearValue);
} else {
    periodoAnios = calcularAnioMenor(yearValue);
}

//Calcula el indice para indexado
function elevadoALaPotencia(potencia) {
    for (let i = 1; i <= potencia; i++) {
        acumuladorValorFinal = acumuladorValorFinal * (1 + 0.03641);
    }
    return acumuladorValorFinal;
}

let valorIndex = elevadoALaPotencia(periodoAnios);

//Calcula el valor menos la indexacion por los años transcurridos
function calcularValorActualizadoMenor(valor, index) {
    return valor / index;
}

function calcularValorActualizadoMayor(valor, index) {
    return valor * index;
}

let valorFinal;

if (yearValue > anioActual) {
    valorFinal = parseInt(calcularValorActualizadoMayor(inputValue, valorIndex));
} else {
    valorFinal = parseInt(calcularValorActualizadoMenor(inputValue, valorIndex));
}

alert(`${inputValue} dolares en el 2022, equivalen a ${valorFinal} dolares del año ${yearValue}`);
