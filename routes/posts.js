import express from 'express'
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const productData = require('../data/product.json');
const router = express.Router() 


router.get('/',(req,res) => {
    // const pData = productData.json()
    res.status(200).json(productData)
})




export default router