// Seleccionar el botón de calcular
document.getElementById('calcular').addEventListener('click', function() {
    // Obtener los valores de los campos de entrada
    const nombre = document.getElementById('nombre').value;
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);

    // Validar que las notas sean válidas (opcional)
    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        document.getElementById('resultado').textContent = "Por favor, ingrese todas las notas.";
        return;
    }

    // Calcular el promedio de las notas
    const promedio = (nota1 + nota2 + nota3) / 3;

    // Mostrar el resultado en la página
    document.getElementById('resultado').textContent = `La nota final de ${nombre} es: ${promedio.toFixed(0)}`;
});
