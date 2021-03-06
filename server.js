require('dotenv').config()
const express = require('express')
const compression = require('compression')
const routes = require('./routes/products')
const mongoose = require('mongoose')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(
    process.env.MONGODB_URI, {useNewUrlParser: true},
    (err) => {
        if (err) return console.log(`Error: ${err}`)
        console.log(`MongoDB Connection -- Ready state is: ${mongoose.connection.readyState}`)
    }
)

//middlewares

app.use(helmet())
app.use(compression())
app.use('/static', express.static('./static'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/', routes)

// routes

app.route('/').get((req, res) => {
    res.sendFile(process.cwd() + '/index.html')
})

app.listen(port, () => {
    console.log(`App is listening to ${port}`)
})