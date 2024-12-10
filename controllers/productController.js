import { Products } from "../Models/productModel.js"


//add new product
export const createProduit = (req, res, next) => {
    
    const produit = new Products({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    });

    produit.save().then(
        () => res.status(201).json({
            message: "new product added succesfully!"
        })
    ).catch(
        (err) => res.status(400).json({
            error: err
        })
    )
}

//get all product
export const getAllProduct = (req, res, next) => {
    Products.find().populate('category').
        exec().then(
            (products) => res.status(200).json(products)
        ).catch((err) => res.status(400).json({
            error: err
        }))
}

//get one product
export const getOneProduct = (req, res, next) => {
    Products.findOne({ _id: req.params.id }).populate('category').exec().then(
        (product) => res.status(200).json(product)
    ).catch((err) => res.status(400).json({
        error: err
    }))
}

//update one product
export const updateOneProduct = (req, res, next) => {
    
    Products.updateOne(
        {_id: req.params.id},
        { $set: {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        } }
    ).then(() => res.status(200).json({
        message: `This ${req.params.id} product updated successfully!`
    })).catch((err) => res.status(400).json({
        error: err
    }
    ))
    
}

//delete one product
export const deleteOneProduct = (req, res, next) => {
    Products.deleteOne({ _id: req.params.id }).then(() => res.status(200).json({
        message: `This ${req.params.id} product deleted successfully!`
    })).catch((err) => res.status(400).json({
        error: err
    }))
}