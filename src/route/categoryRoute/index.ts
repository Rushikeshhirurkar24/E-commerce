import express from "express";
import { authenticate_admineAndseller } from "../../middleware/authenticate-admin&seller";
import { create_category } from "./create_category";
import { deleteCategory } from "./delect_category";
import { getCategory } from "./get_Category";
import { UpdateCategory } from "./update_Category";

const categoryRoute = express.Router()

categoryRoute.post("/api/createCategory",authenticate_admineAndseller,create_category)          //signUp category
categoryRoute.get("/api/category/:id",authenticate_admineAndseller,getCategory)                //get category
categoryRoute.put("/api/updateCategory/:id",authenticate_admineAndseller,UpdateCategory)      //put category
categoryRoute.delete("/api/deleteCategory/:id",authenticate_admineAndseller,deleteCategory)  //delete category



export default  categoryRoute