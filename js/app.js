//Variables
const formulario = document.querySelector('#formulario');
const listaAgenda = document.querySelector('#lista-agenda');
let tareas = [];


// Event Listeners
eventListeners();

function eventListeners(){
    formulario.addEventListener('submit',agregarTarea);

    document.addEventListener('DOMContentLoaded', () => {
        tareas = JSON.parse(localStorage.getItem('tareas')) || [];

        crearHTML();
    });
}


// FuncionesF

function agregarTarea(e){
    e.preventDefault();

    const tituloTarea = document.querySelector('#titulo').value;
    const descripcionTarea = document.querySelector('#descripcion').value;

    // Validando campos vacios
    if(tituloTarea === ''){
        mostrarError('El titulo no puede estar vacío');

        return;
    }

    if(descripcionTarea === ''){
        mostrarError('Ingrese una descripcion para la Tarea');

        return;
    }

    const tareaObj ={
        id: Date.now(),
        titulo: tituloTarea,
        descripcion: descripcionTarea
    }

    // Añadir al arreglo de taread
    tareas = [...tareas, tareaObj];

    crearHTML();

    //Reiniicar Formulario

    formulario.reset();

}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent= error;
    mensajeError.classList.add('error');

    // Insertando en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 2500);
}

function crearHTML(){

    limpiarHTML();

    if(tareas.length > 0){
        tareas.forEach ( tarea => {

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
            btnEliminar.onclick = () =>{
                borrarTarea(tarea.id);
            }

            const li = document.createElement('li');

            li.innerText = tarea.titulo + " | Descripcion: " + tarea.descripcion;

            li.appendChild(btnEliminar);

            listaAgenda.appendChild(li);

        });
    }

    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Limpiar HTML
function limpiarHTML(){
    while(listaAgenda.firstChild){
        listaAgenda.removeChild(listaAgenda.firstChild);
    }
}

function borrarTarea(id){
    tareas = tareas.filter( tarea => tarea.id !== id);
    crearHTML();
}