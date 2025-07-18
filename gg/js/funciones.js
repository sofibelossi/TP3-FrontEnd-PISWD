function validarFormulario(form){
const datos = {
    tipo_documento:document.getElementById("tipo_documento").value,
    nro_documento:document.getElementById("nro_documento").value,
    nombre:document.getElementById("nombre").value,
    apellido:document.getElementById("apellido").value,
    año:document.getElementById("anio").value,
    division:document.getElementById("division").value
}

if(nombre.trim()===''){
    alert ('Ingrese el nombre');
    return false;
}
if(apellido.trim()===''){
    alert ('Ingrese el apellido');
    return false;
}
if(tipo_documento.trim()===''){
    alert ('Ingrese el tipo de documento');
    return false;
}
if(nro_documento.trim()===''){
    alert ('Ingrese el numero de documento');
    return false;
}
if(año.trim()===''){
    alert ('Ingrese el año');
    return false;
}
if(division.trim()===''){
    alert ('Ingrese la division')
    return false;
}
if (nro_documento.length > 8) {
    alert('El número de documento no puede tener más de 8 caracteres.');
    return false; 
  }
return true;
}

/*function validarCampos(datos) {
    if (datos.trim == "") {
        return false;
    } 
    return true;
}

function validarCampoNumerico(dato){
   if (isNaN(dato)) {
    return false;
   }
    return true;
} */
