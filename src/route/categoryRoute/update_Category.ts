import { Request, Response } from "express";
import { category } from "../../entities/category";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
let secretKey = process.env.SECRET_KEY;

export let UpdateCategory = async (req: Request, res: Response) => {
  try {
    let { category_name, parent_category_id, roleId } = req.body;

    let { id } = req.params;


    let isAvailable = await category.findOneBy({ id: id });

    if (!isAvailable) {
      res
        .status(400)
        .send({ status: StatusCodes.BAD_REQUEST, message: "Category not found" });
    }

    let timestamp = new Date();

    let categoryUpdate = await category.update(
      { id: isAvailable.id },
      {
        category_name,
        parent_category_id,
        updated_at: timestamp,
        updated_by: roleId,
      }
    );

    res
      .status(200)
      .send({ status: StatusCodes.OK, message: "Category update successfully" });
  } catch (error) {
    res.status(400).send({
      status: StatusCodes.BAD_REQUEST,
      message: "something went wrong",
      error,
    });
  }
};
