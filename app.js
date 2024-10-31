//Capturemos las notas ingresadas pro el usuario
function capturarNotas() {
   
    const nombre = prompt("Por favor, introduce tu nombre")
    const notas = [];

    while(true){

        let nota = parseInt(prompt("Por favor, Introduce una nota"));

        notas.push(nota);

        let option = prompt("¿Quiere agregar otra nota? \n 1-Si \n 2-No");

        if(option == "2"){
            break;
        }
    }

    const usuario = { nombre, notas }

    return usuario;
}

function calculemosPromedio(arrnotas){

    let sumaTotal = 0;

    let cantidadNotas = arrnotas.length;

    arrnotas.forEach( (nota) => { sumaTotal += nota });

    let resultado = sumaTotal / cantidadNotas;

    return resultado
}

function notasFinales() {

    let usuario = capturarNotas();
    let promedio = calculemosPromedio(usuario.notas);

    console.log(usuario);
    console.log(promedio);
}

document.getElementById('calcular').addEventListener('click', notasFinales);
