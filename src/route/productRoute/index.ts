import express from "express";
import { authenticate_admineAndseller } from "../../middleware/authenticate-admin&seller";
import { createProduct } from "./create";
import { getProduct } from "./get";
//import { patchDataUSer } from "./update";

const Productroute = express.Router()

Productroute.post("/productCreate",authenticate_admineAndseller,createProduct)//signUp Product

Productroute.get("/getProduct/:id",authenticate_admineAndseller,getProduct)// get Product

Productroute.get("/updateProduct/:id",authenticate_admineAndseller,getProduct)// update Product

export default  Productroute