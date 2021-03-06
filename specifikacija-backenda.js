import express from 'express';
import data from './store';
import cors from 'cors';

const app = express(); // instanciranje aplikacije
const port = 3200; // port na kojem će web server slušati

app.use(cors());
app.use(express.json());

// oglas
app.get('/oglasi/:id', async (req, res) => {
 let id = req.params.id;
 let document = await db.collection('posts').findOne({ _id: mongo.ObjectId(id)
});
 res.json(document);
});

// oglasi
app.get('/posts', async (req, res) => {
  let db = await connect();
  let query = req.query;

  let selekcija = {};

  if (query._any) {
    let pretraga = query._any;
    let terms = pretraga.split(' ');

    let atributi = ['title', 'createdBy'];

    selekcija = {
      $and: [],
    };

    terms.forEach((term) => {
      let or = {
        $or: [],
      };

      atributi.forEach((atribut) => {
        or.$or.push({ [atribut]: new RegExp(term) });
      });

      selekcija.$and.push(or);
    });
  }

  console.log('Selekcija', selekcija);

  let cursor = await db.collection('posts').find(selekcija);
  let results = await cursor.toArray();

  res.json(results);
});

// unos oglasa
app.post('/posts', async (req, res) => {
	
 let db = await connect();
 
 let doc = req.body;
 
 let result = await db.collection('posts').insertOne(doc);
 delete doc._id
 
 if(!doc.title||!doc.createdBy||!doc.opis||!doc.cijena||!doc.imefirme||!doc.datumrada||!doc.vrijemerada){
        res.json({
            status:'fail'
        })
        return;
    }
    let mail=new RegExp('@')
    if(!mail.test(doc.createdBy)){
        res.json({
            status:'fail, mail neispravan !'
        })
        return;
    }
	
 if (result.insertedCount == 1) {
 res.json({
 status: 'success',
 id: result.insertedId,
 });
 } else {
 res.json({
 status: 'fail',
 });
 }
});

// update oglasa
app.patch('/posts/:id', async (req, res) => {
 let doc = req.body;
 delete doc._id;
 let id = req.params.id;
 let db = await connect();
 let result = await db.collection('posts').updateOne(
 { _id: mongo.ObjectId(id) },
 {
 $set: { doc.data }
 }
 );
 if (result.modifiedCount == 1) {
 res.json({
 status: 'success',
 id: result.insertedId,
 });
 } else {
	 res.json({
 status: 'fail',
 });
 }
});

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
