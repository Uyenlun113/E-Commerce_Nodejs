const { Product } = require('../models/products')
const { Category } = require('../models/category')
const express = require('express')
const router = express.Router()
router.get(`/`, async (req, res) => {
    const productList = await Product.find()
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList)
})
router.post(`/`, async (req, res) => {
    try {
        const category = await Category.findById(req.body.category)
        if (!category) return res.status(400).send('khong hop le')

        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        })

        product = await product.save()
        if (!product) return res.status(500).send('them khong thanh cong')

        res.send(product)
    } catch (err) {
        res.status(500).send('Error: ' + err.message)
    }
})
module.exports = router
