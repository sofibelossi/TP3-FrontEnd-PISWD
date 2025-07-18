const API_URL = "/usuarios";//define la ruta para las peticiones

function mostrarUsuarios() {//funcion para mostrar usuarios
  fetch(API_URL)//hace una peticion fetch para obtener los datos
    .then(res => res.json())//convierte la respuesta a json
    .then(data => {
      const tbody = document.getElementById("tablaUsuarios");//busca el cuerpo de la tabla por id y lo guarda en una variable 
      if (!tbody) return;
      tbody.innerHTML = "";
      data.forEach(usuario => {//genera una fila por cada usuario con sus datos y lo guarda en la variable fila.
        const fila = `
          <tr>
            <td>${usuario.id}</td>
            <td>${usuario.tipo_documento}</td>
            <td>${usuario.nro_documento}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.anio}</td>
            <td>${usuario.division}</td>
            <td>
              <a href="/html/ModificarUsuario.html" onclick='guardarUsuario(${JSON.stringify(usuario)})' class="text-black"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
</svg></a>
              <a href="/html/BajaUsuario.html" onclick='guardarUsuario(${JSON.stringify(usuario)})' class="text-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg></a>
            </td>
          </tr>
        `;
        tbody.innerHTML += fila;//agrega cada fila al cuerpo de la tabla
      });
      const p = document.getElementById("cantidadUsuarios");
      if (p) p.textContent = "Cantidad de usuarios: " + data.length;//actualiza el texto de cantidad de usuarios
    });
}

function guardarUsuario(usuario) {
  localStorage.setItem("usuario_modificar", JSON.stringify(usuario));//funcion para guardar un usuario en localStorage que se ejecuta al hacer click en los botones modificar y eliminar
}

function formularioAltaUsuario() {
  const form = document.getElementById("formUsuario");//busca el formulario de alta por id
  if (!form) return;

  form.addEventListener("submit", function (e) {//en el evento submit del boton
   /* e.preventDefault();
    if (!validarFormulario(e.target)) {//corta el flujo si falla en la validacion (funcion del archivo funciones.js)
    return;
  }*/
    const usuario = {
      tipo_documento: document.getElementById("tipo_documento").value,
      nro_documento: document.getElementById("nro_documento").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      anio: document.getElementById("anio").value,
      division: document.getElementById("division").value
    };//guarda lo ingresado en el formulario en un objeto

    fetch(API_URL, {//hace una peticion con fetch al archivo json
      method: "POST",//utiliza el metodo post para enviar los datos
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    }).then(() => {
      alert("Usuario agregado");//mensaje de exito
      form.reset();//limpia el formulario
      window.location.href = "TodosUsuario.html";
    });
  });
}

function formularioModificarUsuario(id) {
  const form = document.getElementById("formModificar");//busca el formulario por id
  if (!form) return;

  form.addEventListener("submit", function (e) {//en el evento submit del boton
    e.preventDefault();//previene que el formulario se envie automaticamente
    const tipo_documento= document.getElementById("tipo_documento").value;
    const nro_documento= document.getElementById("nro_documento").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const anio = document.getElementById("anio").value;
    const division = document.getElementById("division").value;//obtiene los valores ingresados en el formulario

    fetch(`${API_URL}/${id}`, {//envia los datos nuevos usando put
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo_documento, nro_documento, nombre, apellido, anio, division })
    }).then(() => {
      alert("Usuario modificado correctamente");//mensaje de exito
      localStorage.removeItem("usuario_modificar");//elimina el usuario que estaba guardado en localStorage
      window.location.href = "TodosUsuario.html";
    });
  });
}
function eliminarUsuario(id) {
  fetch(`/usuarios/${id}`, {//hace una peticion delete
    method: "DELETE"
  })
  .then(res => {
    if (res.ok) {
      alert("Usuario eliminado correctamente");//si la respuesta es exitosa,muestra el mensaje de exito
      localStorage.removeItem("usuario_modificar");//borra los datos de localStorage
      window.location.href = "TodosUsuario.html";//redirige al archivo de la lista de usuarios
    } else {
      alert("Error al eliminar el usuario");//si la respuesta no es exitosa se muestra un mensaje de error.
    }
  });
}
