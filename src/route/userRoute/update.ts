import { Request, Response } from "express";
import { STATUS_CODES } from "http";
import { StatusCodes } from "http-status-codes";
import { date } from "joi";
import { updateSchema } from "../../common/validation";
import { User } from "../../entities/user";
import { User_details } from "../../entities/user_details";
import { user_session } from "../../entities/user_session";

export let updateUser = async (req: Request, res: Response) => {
  try {
    await updateSchema.validateAsync(req.body);
    let { first_name, last_name, city, state, age } = req.body;
    let { id }: any = req.params;
    let isAvailable = await User.findOneBy({ id: id });

    if (!isAvailable) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ status: StatusCodes.NOT_FOUND, message: "User not found" });
    }

    let timestamp = new Date();
    let userUpdate = await User.update(
      { id: isAvailable.id },
      {
        first_name,
        last_name,
        updated_by: isAvailable.email,
        updated_at: timestamp,
      }
    );

    let userDetailsAvailable: any = await User_details.findOneBy({
      user: { id: isAvailable.id },
    });

    let updateDetails = await User_details.update(
      { id: userDetailsAvailable.id },
      { age, city, state, updated_at: timestamp, updated_by: isAvailable.email }
    );
    console.log(updateDetails);

    res
      .status(StatusCodes.OK)
      .send({ status: StatusCodes.OK, message: "user update successfully" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({
      status: StatusCodes.BAD_REQUEST,
      message: "something went wrong",
      error,
    });
  }
};
