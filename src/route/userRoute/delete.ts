import { time } from "console";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../../entities/user";
import { User_details } from "../../entities/user_details";
import { user_session } from "../../entities/user_session";

export const deleteDataUSer = async (req: Request, res: Response) => {
  try {
    let { id }: any = req.params;

    let isAvailable = await User.findOneBy({ id: id });
    console.log(isAvailable);

    if (!isAvailable) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: StatusCodes.NOT_FOUND, message: "user not found." });
    }
    let timestamp = new Date();
    let idDelete = await User.update(
      { id: id },
      {
        is_deleted: true,
        deleted_by: isAvailable.email,
        deleted_at: timestamp,
      }
    );

    let detailsDeleted = await User_details.update(
      { user: { id: isAvailable.id } },
      { deleted_at: timestamp, deleted_by: isAvailable.email }
    );

    let deleteSession = await user_session.update(
      { user_id: { id: id } },
      { deleted_at: timestamp }
    );

    res.json({
      status: StatusCodes.OK,
      message: id + "user id is deleted ",
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: "something went wrong",
      error,
    });
  }
};
