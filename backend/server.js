/* eslint-disable prettier/prettier */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection string
const dbURI =
  'mongodb+srv://mongo:mongodb@mongodb.elysdmd.mongodb.net/?retryWrites=true&w=majority&appName=mongodb';

mongoose
  .connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const DataSchema = new mongoose.Schema({
  name: String,
  value: String,
});

const Data = mongoose.model('Data', DataSchema);

// Endpoint to save data
app.post('/data', (req, res) => {
  const {name, value} = req.body;

  const newData = new Data({name, value});

  newData
    .save()
    .then(savedData => {
      res.status(201).json(savedData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error saving data');
    });
});

// Endpoint to fetch data by ID
// Endpoint to fetch data by ID
app.get('/data/:id', (req, res) => {
  const id = req.params.id;
  Data.findById(id)
    .then(data => {
      if (!data) {
        return res.status(404).send('Data not found');
      }
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error fetching data');
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
