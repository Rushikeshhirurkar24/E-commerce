import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import { category } from "../../entities/category";
import jwt from "jsonwebtoken";
import {v4 as uuidv4} from 'uuid';

let myuuid = uuidv4();

let secretKey = process.env.SECRET_KEY;

export const create_category = async (req: Request, res: Response) => {
  try {
    let { category_name, parent_category_id, roleId } = req.body;

    let categoryAvalaible = await category.findOneBy({
      category_name: category_name,
    });

    if (categoryAvalaible) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({status:StatusCodes.BAD_REQUEST,message:"this category already exist."});
    }

    let timestemp = new Date();
    let createCategory = new category();
    createCategory.id=myuuid
    createCategory.category_name = category_name;
    createCategory.parent_category_id = parent_category_id;
    createCategory.created_at = timestemp;
    createCategory.created_by = roleId;

    let saveCategory = await category.save(createCategory);
    res.status(StatusCodes.OK).send({status:StatusCodes.OK, message:"category has been inserted"});
  } catch (error) {
    res.json({
      status: StatusCodes.BAD_REQUEST,
      message: "👎🏻 something went wrong " + error,
    });
  }
};
