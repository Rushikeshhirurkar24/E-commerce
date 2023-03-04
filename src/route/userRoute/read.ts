import { Request, Response } from "express";
import { User_details } from "../../entities/user_details";
import { User } from "../../entities/user";
import { user_session } from "../../entities/user_session";
import { StatusCodes } from "http-status-codes";

export const getDataUSer = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;

    let getData = await User_details.find({
      where: { user: { id: id } },
      relations: ["user"],
    });

    if (getData.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: StatusCodes.NOT_FOUND, message: "id is not found." });
    }

    res
      .status(StatusCodes.OK)
      .send({status:StatusCodes.OK, message: "user data retrieved successfully : ",getData});
    console.log(getData[0].user.first_name);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: "something went wrong",
      error,
    });
  }
};
