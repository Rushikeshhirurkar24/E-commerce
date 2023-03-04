import { Request, Response } from "express";

import { category } from "../../entities/category";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
let secretKey = process.env.SECRET_KEY;

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as {
      id: string;
    };

    let findCategory = await category.find({ where: { id: id } });
    console.log(findCategory);
    res.send({
      status: StatusCodes.OK,
      message: "category data retrieved successfully :" + findCategory,
    });
  } catch (error) {
    res.status(400).send({
      status: StatusCodes.BAD_REQUEST,
      message: "something went wrong",
      error,
    });
  }
};
