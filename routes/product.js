import express from 'express'
import { createRequire } from 'node:module';
import fs from 'fs'
import path from 'node:path';
const require = createRequire(import.meta.url);
const productData = require('../data/product.json');
const router = express.Router()
const rID = crypto.randomUUID() 

//@desc Gets all posts
//@route GET /api/products 
router.get('/',(req,res) => {
    if(!productData){
       return res.status(404).json({msg: 'Product data not found'})    
    }
    res.status(200).json(productData)
    console.log(productData);
    
})

//@desc Gets single product
//@route GET /api/products
router.get('/:id',(req,res,next) => {
    const id = req.params.id
    console.log(id);
    const singleProduct = productData.find((pData) =>  pData.id === id )
    if(!singleProduct){ 
       return res.status(404).json({msg: 'Product data not found'})    
    }
    res.status(200).json(singleProduct)
})


//@desc Create product
//@route POST /api/products
router.post('/',(req,res,next) => {
    const newProduct = {
        id: rID,
        title: req.body.title
    }
    productData.push(newProduct)
    fs.writeFileSync(path.join('data','product.json'),JSON.stringify(productData),'utf-8')
    if(!newProduct){ 
       return res.status(404).json({msg: 'Please include title'})    
    }
    res.status(200).json(newProduct)
})


//@desc Update product
//@route PUT /api/products
router.put('/:id',(req,res,next) => {
    const id = req.params.id
    const Product = productData.find((pData) =>  pData.id === id )
    if(!Product){ 
       return res.status(404).json({msg: `The id of ${id} is not found`})    
    }
      Product.title = req.body.title
    fs.writeFileSync(path.join('data','product.json'),JSON.stringify(productData),'utf-8')
    res.status(200).json(Product)
    console.log(Product);
})

//@desc Delete product
//@route DELETE /api/products
router.delete('/:id',(req,res,next) => {
    const id = req.params.id
    const tobeDeletedProduct = productData.find((pData) =>  pData.id === id )
    if(!tobeDeletedProduct){ 
       return res.status(404).json({msg: `The id of ${id} is not found`})    
    }
    const removedProducts = productData.filter((pData) =>  pData.id !== id )
    // productData = removedProducts  
    fs.writeFileSync(path.join('data','product.json'),JSON.stringify(removedProducts),'utf-8')
    res.status(200).json(tobeDeletedProduct)
    console.log(tobeDeletedProduct);
})

export default router