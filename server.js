import express from 'express'
import path from 'path'
import posts from './routes/product.js'  
const app = express()

const port = process.env.PORT || 8000

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//routes
app.use('/api/products/', posts)

app.listen(port,() => {
    console.log(`The port of ${port} is running`);
})