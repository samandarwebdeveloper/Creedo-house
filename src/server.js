const express = require('express')
const app = express()
const path = require('path')
const { PORT } = require('./config')
const router = require('./controller')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', router)


app.listen(PORT, console.log(PORT))