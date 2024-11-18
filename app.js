
async function cargarDatosIniciales() {
    try {
        const respuesta = await fetch('usuarios.json');
        if (!respuesta.ok) throw new Error("Error al cargar los datos iniciales.");
        const datos = await respuesta.json();

        if (!localStorage.getItem("historial")) {
            localStorage.setItem("historial", JSON.stringify(datos));
        }

        mostrarHistorialEnDOM(); 
    } catch (error) {
        console.error(error);
    }
}


function capturarNotas() {
    const nombre = document.getElementById("nombre").value;
    const nota1 = parseInt(document.getElementById("nota1").value);
    const nota2 = parseInt(document.getElementById("nota2").value);
    const nota3 = parseInt(document.getElementById("nota3").value);

    if (!nombre || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        Swal.fire({
            icon: "error",
            title: "Datos Inválidos",
            text: "Por favor, introduce un nombre y notas válidas."
        });
        return null;
    }

    const usuario = { nombre, notas: [nota1, nota2, nota3] };
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push(usuario);
    localStorage.setItem("historial", JSON.stringify(historial));
    
    return usuario;
}


function calculemosPromedio(arrnotas) {
    const sumaTotal = arrnotas.reduce((acum, nota) => acum + nota, 0);
    return sumaTotal / arrnotas.length;
}


function mostrarResultadosEnDOM(usuario, promedio) {
    const resultadosDiv = document.getElementById("resultado");
    resultadosDiv.innerHTML = `
        <h2>Resultados para ${usuario.nombre}</h2>
        <p>Notas: ${usuario.notas.join(", ")}</p>
        <p>Promedio: ${promedio.toFixed(2)}</p>
    `;

    
    gsap.fromTo(
        "#resultado", 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 1 }
    );
}


function mostrarHistorialEnDOM() {
    const historialDiv = document.getElementById("historial");
    const historial = JSON.parse(localStorage.getItem("historial")) || [];

    if (historial.length === 0) {
        historialDiv.innerHTML = "<p>No hay historial para mostrar.</p>";
        return;
    }

    historialDiv.innerHTML = "<h2>Historial de Usuarios</h2>";
    historial.forEach((usuario, index) => {
        const promedio = calculemosPromedio(usuario.notas);
        historialDiv.innerHTML += `
            <div class="historial-item">
                <h3>Usuario ${index + 1}: ${usuario.nombre}</h3>
                <p>Notas: ${usuario.notas.join(", ")}</p>
                <p>Promedio: ${promedio.toFixed(2)}</p>
            </div>
        `;
    });

    
    gsap.fromTo(
        ".historial-item",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 }
    );
}


function borrarHistorial() {
    localStorage.removeItem("historial");
    Swal.fire({
        icon: "success",
        title: "Historial Borrado",
        text: "El historial de usuarios se ha eliminado correctamente."
    });
    mostrarHistorialEnDOM();
}


function notasFinales() {
    const usuario = capturarNotas();
    if (usuario) {
        const promedio = calculemosPromedio(usuario.notas);
        mostrarResultadosEnDOM(usuario, promedio);

        
        Swal.fire({
            icon: "success",
            title: "Datos Guardados",
            text: `El usuario ${usuario.nombre} ha sido registrado exitosamente con un promedio de ${promedio.toFixed(2)}.`,
            timer: 3000,
            showConfirmButton: false
        });
    }
}


document.getElementById("calcular").addEventListener("click", notasFinales);
document.getElementById("mostrar").addEventListener("click", mostrarHistorialEnDOM);
document.getElementById("borrar").addEventListener("click", borrarHistorial);


document.addEventListener("DOMContentLoaded", cargarDatosIniciales);

