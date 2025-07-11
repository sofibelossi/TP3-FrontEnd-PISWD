function validarFormulario(form){
const tipo_documento=document.getElementById("tipo_documento").value;
const nro_documento=document.getElementById("nro_documento").value;
const nombre=document.getElementById("nombre").value;
const apellido=document.getElementById("apellido").value;
const año=document.getElementById("año").value;
const division=document.getElementById("division").value;
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