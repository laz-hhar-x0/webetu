const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Module = require('./models/Module');
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');

const fs = require('fs');
const path = require('path');

 
// helo lazhar

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('public'));


// app.get('/', (req, res) => {
//   res.send("✅ Server is running on Render!");
// });


app.get('/', (req, res) => {
  res.render('welcom');
  // res.render('welcom');
})


app.get('/input', async (req, res) => {
  try {
    const modules = await Module.find();
    res.render('input_etud', { modules });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});


app.get('/favicon.ico', (req, res) => res.status(204).end());





app.get('/:id', async (req, res) => {
  const studentId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).send('<h3 style="color:red;">❌ معرف الطالب غير صالح</h3>');
  }

  try {
    const student = await Module.findById(studentId);

    if (student) {
      res.render('home', { student });
      // console.log(student)
    } else {
      res.status(404).send('<h3 style="color:red;">❌ الطالب غير موجود</h3>');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("⚠️ خطأ في الخادم");
  }
});

















app.post('/input', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      placeOfBirth,
      dateOfBirth,
      matricule,
      password,
      annee,
      spic,
      td1, tp1, cours1,
      td2, tp2, cours2,
      td3, tp3, cours3,
      td4, tp4, cours4,
      td5, tp5, cours5,
      td6, tp6, cours6,
      td7, tp7, cours7
    } = req.body;

    const exist = await Module.findOne({ matricule: Number(matricule) });
    if (exist) {
      return res.send('<h3 style="color:red;">⚠️ الطالب مسجل من قبل</h3>');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newModule = new Module({
      firstName,
      lastName,
      placeOfBirth,
      dateOfBirth,
      matricule: Number(matricule),
      password: hashedPassword,
      anne: Number(annee),
      specialiti: spic,
      Analyse: { td: Number(td1), tp: Number(tp1), cour: Number(cours1) },
      Algebre: { td: Number(td2), tp: Number(tp2), cour: Number(cours2) },
      Matlab: { td: Number(td3), tp: Number(tp3), cour: Number(cours3) },
      Algorithme: { td: Number(td4), tp: Number(tp4), cour: Number(cours4) },
      Structure: { td: Number(td5), tp: Number(tp5), cour: Number(cours5) },
      Electro: { td: Number(td6), tp: Number(tp6), cour: Number(cours6) },
      Anglais: { td: Number(td7), tp: Number(tp7), cour: Number(cours7) }
    });

    await newModule.save();
    res.redirect(`/${newModule._id}`);

  } catch (err) {
    console.error(err);
    
  }
});









// app.post('/login', async (req, res) => {
//   const { matricule, password } = req.body;

//   const parsedMatricule = Number(matricule);
//   if (isNaN(parsedMatricule)) {
//     return res.send(`<h3 style="color:red;">❌ الرجاء إدخال matricule صحيح</h3>`);
//   }

//   try {
//     const student = await Module.findOne({ matricule: parsedMatricule });

//     if (!student) {
//      return res.send(`<h3 style="color:red;">❌ خطأ في matricule أو كلمة السر</h3>`);
//     }
  
//     const isMatch = await bcrypt.compare(password, student.password);
//     if (isMatch) {
//       res.redirect(`/${student._id}`);
//     } else {
//       res.send(`<h3 style="color:red;">❌ خطأ في matricule أو كلمة السر</h3>`);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("⚠️ خطأ في الخادم");
//   }
// });

app.post('/login', async (req, res) => {
  const { matricule, password } = req.body;

  if (!matricule || !password || matricule.trim() === "" || password.trim() === "") {
    return res.status(400).json({ error: "الحقول فارغة" });
  }

  const parsedMatricule = Number(matricule);
  if (isNaN(parsedMatricule)) {
    return res.status(400).json({ error: "matricule غير صالح" });
  }

  try {
    const student = await Module.findOne({ matricule: parsedMatricule });

    if (!student) {
      return res.status(404).json({ error: "❌ هذا الرقم غير موجود" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (isMatch) {
      return res.status(200).json({ redirect: `/${student._id}` });
    } else {
      return res.status(401).json({ error: "❌ كلمة المرور خاطئة" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "⚠️ خطأ في الخادم" });
  }
});









  

mongoose.connect("mongodb://7adina:7adina123-123@7adina-shard-00-00.a6o7i.mongodb.net:27017,7adina-shard-00-01.a6o7i.mongodb.net:27017,7adina-shard-00-02.a6o7i.mongodb.net:27017/?replicaSet=atlas-wwrlii-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=7adina")
.then(() => {
  app.listen(port, () => {
    // console.log(`✅ Server is running on http://localhost:${port}/welcom`);
    console.log(`✅ Server is running on `);
  });
  
  
  
}).catch((err) => console.log(err))



