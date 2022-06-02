const Products = require('../models/products')
let {MongoClient, ObjectId} = require('mongodb')

// GET all products

const getAllProducts = (req, res, next) => {
    Products.find({}, (err, data) => {
        if (err) {
            return res.json({Error: err})
        } else {
            return res.json(data)
        }
    })
}

// POST new product

const newProduct = (req, res, next) => {
    console.log(`req.body is ${req.body}`)
    console.log(`req.file is ${req.file}`)
    console.log(`req.files is ${req.files}`)
    Products.insertOne({
        name: req.body.name,
        category: req.body.category,
        inShoppingList: false
        }, (err, data) => {
            if (err) {
                res.json(err)
            } else {
                res.json(data)
            }
    })
}

const addProductToList = (req, res, next) => {
    Products.findOneAndUpdate({
        _id: ObjectId(req.params.id)
    }, {
        $set: {
            inShoppingList: true
        }
    }, (err, data) => {
        if (err) {
            res.json({Error: err})
        } else {
            res.json(data)
        }
    })
}

const removeProductFromList = (req, res, next) => {
    Products.findOneAndUpdate({
        _id: ObjectId(req.params.id)
    }, {
        $set: {
            inShoppingList: false
        }
    }, (err, data) => {
        if (err) {
            res.json({Error: err})
        } else {
            res.json(data)
        }
    })
}

const deleteOneProduct = (req, res, next) => {
    Products.deleteOne({
        _id: ObjectId(req.params.id)
    }, (err, data) => {
        if (err) {
            res.json({Error: err})
        } else {
            res.json(data)
        }
    })
}


module.exports = {
    getAllProducts,
    newProduct,
    addProductToList,
    removeProductFromList,
    deleteOneProduct
}