const express = require("express");//framework para el servidor
const cors = require("cors");//para que el servidor reciba peticiones del archivo json
const fs = require("fs");//utilizamos el modulo fs para interactuar con el archivo json

const app = express();//crea una instancia de express
const PORT = 3000;//define en una variable el puerto donde se ejecuta
const path = require("path");//modulo para manejar las rutas
app.use("/html", express.static(path.join(__dirname, "html")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/img", express.static(path.join(__dirname, "img")));//acceder a los archivos desde sus carpetas
const RUTA_DB = path.join(__dirname, "json", "usuarios.json");//se guarda en una variable la ruta al archivo json

app.use(cors());//habilita el uso de cors
app.use(express.json());//para que lea los body en formato json



app.get("/usuarios", (req, res) => {//ruta para mostrar los usuarios
  const data = fs.readFileSync(RUTA_DB, "utf-8");//lee el archivo json usando fs
  res.json(JSON.parse(data));//lo convierte a js
});

app.post("/usuarios", (req, res) => {//ruta para agregar usuarios con metodo post
  const nuevoUsuario = req.body;//almacena los datos del nuevo usuario en una variable
  const data = JSON.parse(fs.readFileSync(RUTA_DB, "utf-8"));//lee el archivo con fs
  nuevoUsuario.id = Date.now();//asigna un id basado en la fecha
  data.push(nuevoUsuario);
  fs.writeFileSync(RUTA_DB, JSON.stringify(data, null, 2));//guarda los cambios escribiendo el archivo con fs
  res.status(201).json(nuevoUsuario);//responde con el nuevo usuario
});

app.put("/usuarios/:id", (req, res) => {//ruta para modificar un usuario con metodo put, usa el id como parámetro
  const id = parseInt(req.params.id);
  const data = JSON.parse(fs.readFileSync(RUTA_DB, "utf-8"));
  const index = data.findIndex(u => u.id === id);//busca el índice del usuario a modificar
  if (index !== -1) {
    data[index] = { id, ...req.body };//reempleza el usuario con lo que obtiene del formulario
    fs.writeFileSync(RUTA_DB, JSON.stringify(data, null, 2));//escribe en el archivo, modificandolo.
    res.json(data[index]);
  } else {
    res.status(404).json({ error: "Usuario no encontrado" });
  }
});

app.delete("/usuarios/:id", (req, res) => {//ruta para eliminar un usuario con metodo delete, usa el id como parámetro
  const id = parseInt(req.params.id);
  let data = JSON.parse(fs.readFileSync(RUTA_DB, "utf-8"));
  data = data.filter(u => u.id !== id);//busca al usuario con el id pasado y se elimina
  fs.writeFileSync(RUTA_DB, JSON.stringify(data, null, 2));//escribe en el archivo, lo convierte a json e indenta con 2 espacios
  res.json({ mensaje: "Usuario eliminado" });
});
app.get("/", (req, res) => {//ruta para que se muestre la lista de usuarios en la raiz
  res.sendFile(path.join(__dirname, "html", "TodosUsuario.html"));
});



app.listen(PORT, () => {//escucha por el puerto 3000
  console.log(`Servidor corriendo en http://localhost:${PORT}`);//muestra un mensaje en consola para iniciarlo
});
