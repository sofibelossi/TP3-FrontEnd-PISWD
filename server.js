const express = require("express");
const cors = require("cors");
const fs = require("fs");//utilizamos el modulo fs para interactuar con el archivo json

const app = express();
const PORT = 3000;
const path = require("path");
app.use("/html", express.static(path.join(__dirname, "html")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/img", express.static(path.join(__dirname, "img")));
const RUTA_DB = path.join(__dirname, "json", "usuarios.json");//se guarda en una variable la ruta al archivo json

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


app.get("/usuarios", (req, res) => {//ruta para mostrar los usuarios
  const data = fs.readFileSync(RUTA_DB, "utf-8");
  res.json(JSON.parse(data));
});

app.post("/usuarios", (req, res) => {//ruta para agregar usuarios con metodo post
  const nuevoUsuario = req.body;
  const data = JSON.parse(fs.readFileSync(RUTA_DB, "utf-8"));
  nuevoUsuario.id = Date.now();
  data.push(nuevoUsuario);
  fs.writeFileSync(RUTA_DB, JSON.stringify(data, null, 2));
  res.status(201).json(nuevoUsuario);
});

app.put("/usuarios/:id", (req, res) => {//ruta para modificar un usuario con metodo put
  const id = parseInt(req.params.id);
  const data = JSON.parse(fs.readFileSync(RUTA_DB, "utf-8"));
  const index = data.findIndex(u => u.id === id);
  if (index !== -1) {
    data[index] = { id, ...req.body };
    fs.writeFileSync(RUTA_DB, JSON.stringify(data, null, 2));
    res.json(data[index]);
  } else {
    res.status(404).json({ error: "Usuario no encontrado" });
  }
});

app.delete("/usuarios/:id", (req, res) => {//ruta para eliminar un usuario con metodo delete
  const id = parseInt(req.params.id);
  let data = JSON.parse(fs.readFileSync(RUTA_DB, "utf-8"));
  data = data.filter(u => u.id !== id);
  fs.writeFileSync(RUTA_DB, JSON.stringify(data, null, 2));
  res.json({ mensaje: "Usuario eliminado" });
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "TodosUsuario.html"));
});



app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
