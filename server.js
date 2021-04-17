const express = require('express');
const cdb = require('./config/db');
var cors = require('cors')
const app = express();

app.use(cors('http://localhost:5000', 'http://localhost:3000'))
// should connect db after express
cdb();

app.use(
    express.urlencoded({
        extended: true
    })
)
// initialize middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API running'));

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/post'));

const PORT = process.env.port || 5000;

app.listen(PORT, () => { console.log("server started in port ", PORT) });