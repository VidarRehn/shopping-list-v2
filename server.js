require('dotenv').config()
const express = require('express')
const compression = require('compression')
const routes = require('./routes/products')
const mongoose = require('mongoose')
const helmet = require('helmet')

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

app.use('/', routes)
app.use(helmet())
app.use(compression())

// routes


app.listen(port, () => {
    console.log(`App is listening to ${port}`)
})