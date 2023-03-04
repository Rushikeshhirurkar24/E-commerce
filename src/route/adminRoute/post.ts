import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HashSyncPassword } from "../../common/common-function";
import { userCreateSchema } from "../../common/validation";
import { role, User } from "../../entities/user";
import { User_details } from "../../entities/user_details";
import {v4 as uuidv4} from 'uuid';

let myuuid = uuidv4();
//register user
export const adminSignup = async (req: Request, res: Response) => {
  try {
    await userCreateSchema.validateAsync(req.body);

    let { first_name, last_name, email, password, age, city, state } = req.body;

    let isAvailable = await User.findOneBy({ email: email });

    if (isAvailable) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          status: StatusCodes.BAD_REQUEST,
          message: " super_admin already exist",
        });
    }
    let timestamp = new Date();
    let hashPassword = HashSyncPassword(password);

    const userQuery = await new User();
    userQuery.id=myuuid
    userQuery.first_name = first_name;
    userQuery.last_name = last_name;
    userQuery.email = email;
    userQuery.password = hashPassword;
    userQuery.created_by = email;
    userQuery.created_at = timestamp;
    userQuery.role = role.SUPER_ADMIN;

    const userSave = await User.save(userQuery);

    let detailsQuery = await new User_details();
    detailsQuery.id=myuuid
    detailsQuery.age = age;
    detailsQuery.city = city;
    detailsQuery.state = state;
    detailsQuery.user = userQuery;
    detailsQuery.created_by = email;
    detailsQuery.created_at = timestamp;

    const datailsSave = await User_details.save(detailsQuery);

    console.log("super_admin has been created", userQuery, detailsQuery);
    res.status(StatusCodes.OK).json({ message: "super_admin has been created" });
  } catch (error) {
    res.json({
      status: StatusCodes.BAD_REQUEST,
      message: "👎🏻 something went wrong " + error,
    });
  }
};
