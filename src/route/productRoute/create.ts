import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { category } from "../../entities/category";
import { Product } from "../../entities/product";
import jwt from "jsonwebtoken";
import {v4 as uuidv4} from 'uuid';

let myuuid = uuidv4();



let secretKey = process.env.SECRET_KEY;

export const createProduct = async (req: Request, res: Response) => {
  try {
    let {
      Product_name,
      description,
      category_id,
      selling_price,
      sort,
      quantity,
      roleID
    } = req.body;


    console.log(req.body);

    const isAvalaible: any = await category.findOneBy({ id: category_id });

    if (!isAvalaible) {
      res
        .sendStatus(StatusCodes.NOT_FOUND)
        .send({ status: StatusCodes.NOT_FOUND, message: "Product not found" });
    }

    const timestamp = new Date();

    let query = await Product.insert({
      id:myuuid,
      Product_name,
      description,
      selling_price,
      category: isAvalaible.id,
      sort: sort,
      quantity,
      created_at: timestamp,
      created_by: roleID,
    });  

    console.log({
      status: StatusCodes.CREATED,
      message: "Product has been created",
    });
    res
      .status(StatusCodes.CREATED)
      .json({
        status: StatusCodes.CREATED,
        message: "Product has been created",
      });
  } catch (error) {
    res.json({
      status: StatusCodes.BAD_REQUEST,
      message: "something went wrong " + error,
    });
  }
};
