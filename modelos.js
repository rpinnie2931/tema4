// models/Concesionario.js
const mongoose = require('mongoose');

const concesionarioSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  coches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coche' }]
});

module.exports = mongoose.model('Concesionario', concesionarioSchema);

// models/Coche.js
const mongoose = require('mongoose');

const cocheSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  year: Number,
  concesionario: { type: mongoose.Schema.Types.ObjectId, ref: 'Concesionario' }
});

module.exports = mongoose.model('Coche', cocheSchema);
