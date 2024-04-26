const express = require('express');
const app = express();
const port = 3000

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

//import library CORS
const cors = require('cors');

//use cors
app.use(cors());

//import body parser
const bodyParser = require('body-parser')

// parse application
app.use(bodyParser.urlencoded({ extended:false}))

// parse application/json
app.use(bodyParser.json())

//import route rekam medis
const postRouter = require('./router/medical records');
app.use('/medical_records', postRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});