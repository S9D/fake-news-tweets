require('dotenv').config();
/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/index');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to DB');
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
