import express from "express";
import {createCategory, getAllCategory, getOneCategory, updateOnecategory, deleteOnecategory} from "../controllers/categoryController.js";

const categoryRouter = express.Router()


categoryRouter.post('/', createCategory)
categoryRouter.get('/', getAllCategory)
categoryRouter.get('/:id', getOneCategory)
categoryRouter.put('/:id', updateOnecategory)
categoryRouter.delete('/:id', deleteOnecategory)

export default categoryRouter;