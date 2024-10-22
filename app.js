// Función para capturar las notas ingresadas por el usuario
function capturarNotas() {
    const nombre = prompt("Ingresa el nombre del estudiante:");

    const nota1 = parseFloat(prompt("Ingresa la primera nota:"));
    const nota2 = parseFloat(prompt("Ingresa la segunda nota:"));
    const nota3 = parseFloat(prompt("Ingresa la tercera nota:"));

    // Validar que las notas ingresadas son números válidos
    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        alert("Por favor, ingresa valores numéricos válidos para las notas.");
        return null; // Detener la ejecución si hay errores
    }

    return {
        nombre,
        nota1,
        nota2,
        nota3
    };
}

// Función para calcular el promedio
function calcularPromedio(nota1, nota2, nota3) {
    return (nota1 + nota2 + nota3) / 3;
}

// Función principal del simulador
function simuladorNotasFinales() {
    const datos = capturarNotas();

    // Si las notas fueron correctamente capturadas
    if (datos) {
        const promedio = calcularPromedio(datos.nota1, datos.nota2, datos.nota3);

        // Mostrar el resultado al usuario
        console.log(`La nota final de ${datos.nombre} es: ${promedio.toFixed(1)}`);
        alert(`La nota final de ${datos.nombre} es: ${promedio.toFixed(1)}`);
    }
}

// Capturar el clic en el botón y ejecutar el simulador
document.getElementById('calcular').addEventListener('click', simuladorNotasFinales);