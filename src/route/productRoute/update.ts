import { Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Product } from "../../entities/product";


export const update_Product=async (req:Request, res:Response) => {
    let {id}=req.params

    let isAvailable=await Product.findOneBy({id:id})

    if (!isAvailable) {
        res.sendStatus(StatusCodes.NOT_FOUND).send({status:StatusCodes.NOT_FOUND, message:"product not found"})
    }

    let findProduct= await Product.findOneBy({id:id})
    console.log(findProduct);
    res.sendStatus(StatusCodes.OK).send({status:StatusCodes.OK, message:"product data retrieved successfully. ",findProduct })
    

}