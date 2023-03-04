import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { Product } from "../../entities/product";
let secretKey = process.env.SECRET_KEY;

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    let findProduct = await Product.findOneBy({id:id});
    console.log(findProduct);
    res.send({
      status: StatusCodes.OK,
      message: "Product data retrieved successfully :"
    ,findProduct});
  } catch (error) {
    res.status(400).send({
      status: StatusCodes.BAD_REQUEST,
      message: "something went wrong",
      error,
    });
  }
};
