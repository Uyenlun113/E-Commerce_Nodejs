const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv/config')
const api = process.env.API_URL
const categoriesRoutes = require('./routers/categories')
const productsRoutes = require('./routers/products')
const usersRoutes = require('./routers/users')
const ordersRoutes = require('./routers/orders')

app.use(bodyParser.json())
app.use(morgan('tiny'))
//router
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/oders`, ordersRoutes)

mongoose
    .connect(process.env.CONNECTION_STRING, {})
    .then(() => {
        console.log('Database connection successful')
    })
    .catch((err) => {
        console.error('Database connection error:', err)
    })
app.listen(3000, () => {
    console.log(api)
    console.log('server is running http://localhost:3000')
})
