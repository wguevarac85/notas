
// Cargar tareas del localStorage al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    var tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    for (var i = 0; i < tareas.length; i++) {
        agregarTarea(tareas[i].texto, tareas[i].realizada);
    }
});

// Agregar tarea al formulario
document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();
    var tarea = document.getElementById('nuevaTarea').value;
    agregarTarea(tarea, false);
    document.getElementById('nuevaTarea').value = '';
});

// Función para agregar tarea
function agregarTarea(tarea, realizada) {
    var li = document.createElement('li');
    li.textContent = tarea;
    li.className = 'tarea p-2 border border-gray-300 mb-2 cursor-pointer flex justify-between';
    if (realizada) {
        li.classList.add('line-through', 'text-gray-500');
    }
    li.addEventListener('click', function(e) {
        if (e.target !== this) return;
        this.classList.toggle('line-through');
        this.classList.toggle('text-gray-500');
        guardarTareas();
    });

    var botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.className = 'bg-red-500 text-white rounded px-2 py-1';
    botonEliminar.addEventListener('click', function() {
        li.remove();
        guardarTareas();
    });
    li.appendChild(botonEliminar);

    document.getElementById('tareas').appendChild(li);
    guardarTareas();
}

// Función para guardar tareas en localStorage
function guardarTareas() {
    var tareas = [];
    var elementos = document.getElementsByClassName('tarea');
    for (var i = 0; i < elementos.length; i++) {
        tareas.push({
            texto: elementos[i].childNodes[0].textContent,
            realizada: elementos[i].classList.contains('line-through')
        });
    }
    localStorage.setItem('tareas', JSON.stringify(tareas));
}
