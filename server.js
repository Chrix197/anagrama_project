const express = require('express')
const app = express()
const mainRoutes = require('./routes/main')

const logger = require('morgan')


require('dotenv').config({path: './config/.env'})


app.set('view engine', 'ejs') // set ejs as the view engine
app.use(express.static('public')) // set up public folder
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(logger('dev')) // set up morgan to log everything

// app.get('/', (req, res) => {
//         res.render('index.ejs')
// })

app.use('/', mainRoutes)

 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    