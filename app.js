// Función para capturar el nombre y las notas desde los campos de entrada en el DOM
function capturarNotas() {
    const nombre = document.getElementById("nombre").value;
    const nota1 = parseInt(document.getElementById("nota1").value);
    const nota2 = parseInt(document.getElementById("nota2").value);
    const nota3 = parseInt(document.getElementById("nota3").value);

    // Verificar que los campos no estén vacíos y las notas sean válidas
    if (!nombre || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        alert("Por favor, introduce un nombre y notas válidas.");
        return null;
    }

    // Crear objeto usuario y almacenarlo en localStorage
    const usuario = { nombre, notas: [nota1, nota2, nota3] };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    
    return usuario;
}

// Función para calcular el promedio de las notas
function calculemosPromedio(arrnotas) {
    const sumaTotal = arrnotas.reduce((acum, nota) => acum + nota, 0);
    return sumaTotal / arrnotas.length;
}

// Función para mostrar resultados en el DOM
function mostrarResultadosEnDOM(usuario, promedio) {
    const resultadosDiv = document.getElementById("resultado");

    // Verificar si el elemento existe en el DOM
    if (!resultadosDiv) {
        console.error("El elemento con id 'resultado' no se encuentra en el DOM.");
        return;
    }

    // Verificar que usuario y promedio tengan datos válidos
    if (!usuario || !usuario.nombre || !usuario.notas || typeof promedio !== 'number') {
        console.error("Datos insuficientes para mostrar resultados.");
        return;
    }

    // Mostrar el contenido en el elemento del DOM
    resultadosDiv.innerHTML = `
        <h2>Resultados para ${usuario.nombre}</h2>
        <p>Notas: ${usuario.notas.join(", ")}</p>
        <p>Promedio: ${promedio.toFixed(2)}</p>
    `;
}

// Función principal para obtener y procesar las notas
function notasFinales() {
    // Capturar datos del formulario o usar el usuario almacenado en localStorage
    let usuario = capturarNotas() || JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
        let promedio = calculemosPromedio(usuario.notas);
        mostrarResultadosEnDOM(usuario, promedio);
    }
}

// Función para mostrar los datos almacenados en localStorage
function mostrarDatosGuardados() {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado) {
        let promedio = calculemosPromedio(usuarioGuardado.notas);
        mostrarResultadosEnDOM(usuarioGuardado, promedio);
    } else {
        alert("No hay datos guardados.");
    }
}


document.getElementById("calcular").addEventListener("click", notasFinales);


document.getElementById("mostrar").addEventListener("click", mostrarDatosGuardados);


document.addEventListener("DOMContentLoaded", function() {
    mostrarDatosGuardados();
});
