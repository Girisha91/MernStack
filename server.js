const express = require('express');
const cdb = require('./config/db');
const app = express();
// should connect db after express
cdb();
app.get('/', (req, res) => res.send('API running'))

const PORT = process.env.port || 5000;

app.listen(PORT, () => { console.log("server started in port ", PORT) });