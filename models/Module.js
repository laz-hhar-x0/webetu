// const mongoose = require('mongoose');

// const noteSchema = new mongoose.Schema({
//   td: Number,
//   tp: Number,
//   cour: Number
// });

// const studentSchema = new mongoose.Schema({
//   firstname: String,
//   lastname: String,
//   matricule: Number,
//   anne: Number,
//   specialiti: String,
//   modules: [noteSchema] // هنا نديرو array فيه 7 موديولات
// });

// module.exports = mongoose.model('Student', studentSchema);



const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  td: Number,
  tp: Number,
  cour: Number
});

const moduleSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  matricule: Number,
  anne: Number,
  specialiti: String,
  password: String, 
  Analyse: noteSchema,
  Algebre: noteSchema,
  Matlab: noteSchema,
  Algorithme: noteSchema,
  Structure: noteSchema,
  Electro: noteSchema,
  Anglais: noteSchema,
});

module.exports = mongoose.model('Studient', moduleSchema);
