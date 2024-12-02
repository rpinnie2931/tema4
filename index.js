










// Definimos globalmente las variables de Node.js
/* global require, process */




// Importamos las bibliotecas necesarias.
const express = require("express");

// Inicializamos la aplicación
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

// Definimos una estructura de datos para los concesionarios
let concesionarios = [
  {
    nombre: "Concesionario A",
    direccion: "Calle Falsa 123",
    coches: [
      {
        modelo: "Opel Corsa",
        cv: 75,
        precio: 15000,
      },
      {
        modelo: "Renault Clio",
        cv: 90,
        precio: 15500,
      },
    ],
  },
];

// Obtener todos los concesionarios
app.get("/concesionarios", (request, response) => {
  response.json(concesionarios);
});

// Crear un nuevo concesionario
app.post("/concesionarios", (request, response) => {
  const nuevoConcesionario = request.body;
  concesionarios.push(nuevoConcesionario);
  response.json({ message: "Concesionario creado", concesionario: nuevoConcesionario });
});

// Obtener un concesionario por ID
app.get("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  const concesionario = concesionarios[id];

  if (concesionario) {
    response.json({ concesionario });
  } else {
    response.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// Actualizar un concesionario por ID
app.put("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  const concesionario = concesionarios[id];

  if (concesionario) {
    concesionarios[id] = { ...concesionario, ...request.body };
    response.json({ message: "Concesionario actualizado", concesionario: concesionarios[id] });
  } else {
    response.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// Borrar un concesionario por ID
app.delete("/concesionarios/:id", (request, response) => {
  const id = request.params.id;

  if (concesionarios[id]) {
    concesionarios = concesionarios.filter((_, index) => index != id);
    response.json({ message: "Concesionario eliminado" });
  } else {
    response.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// Obtener todos los coches de un concesionario por ID
app.get("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  const concesionario = concesionarios[id];

  if (concesionario) {
    response.json({ coches: concesionario.coches });
  } else {
    response.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// Añadir un nuevo coche al concesionario por ID
app.post("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  const concesionario = concesionarios[id];

  if (concesionario) {
    const nuevoCoche = request.body;
    concesionario.coches.push(nuevoCoche);
    response.json({ message: "Coche añadido", coche: nuevoCoche });
  } else {
    response.status(404).json({ message: "Concesionario no encontrado" });
  }
});

// Obtener un coche específico del concesionario por ID
app.get("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;
  const concesionario = concesionarios[id];

  if (concesionario && concesionario.coches[cocheId]) {
    response.json({ coche: concesionario.coches[cocheId] });
  } else {
    response.status(404).json({ message: "Coche o concesionario no encontrado" });
  }
});

// Actualizar un coche específico del concesionario por ID
app.put("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;
  const concesionario = concesionarios[id];

  if (concesionario && concesionario.coches[cocheId]) {
    concesionario.coches[cocheId] = { ...concesionario.coches[cocheId], ...request.body };
    response.json({ message: "Coche actualizado", coche: concesionario.coches[cocheId] });
  } else {
    response.status(404).json({ message: "Coche o concesionario no encontrado" });
  }
});

// Borrar un coche específico del concesionario por ID
app.delete("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;
  const concesionario = concesionarios[id];

  if (concesionario && concesionario.coches[cocheId]) {
    concesionario.coches = concesionario.coches.filter((_, index) => index != cocheId);
    response.json({ message: "Coche eliminado" });
  } else {
    response.status(404).json({ message: "Coche o concesionario no encontrado" });
  }
});
