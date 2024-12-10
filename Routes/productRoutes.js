import express from "express";
import { createProduit, getAllProduct, getOneProduct, updateOneProduct, deleteOneProduct } from "../controllers/productController.js";

const productRoute = express.Router()

productRoute.post('/', createProduit)
productRoute.get('/', getAllProduct)
productRoute.get('/:id', getOneProduct)
productRoute.put('/:id', updateOneProduct)
productRoute.delete('/:id', deleteOneProduct)

export default productRoute;