import * as dotenv from "dotenv";
const bcrypt = require("bcryptjs");
import { Request, Response } from "express";
import { role, User } from "../../entities/user";
import { user_session } from "../../entities/user_session";
import { loginUserSchema } from "../../common/validation";
import { User_details } from "../../entities/user_details";
import {
  compareSynchPassword,
  Send_mail_user,
} from "../../common/common-function";
import jwt from "jsonwebtoken";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  userCreateSchema,
} from "../../common/validation";
import { HashSyncPassword, ITokenData } from "../../common/common-function";
import { StatusCodes } from "http-status-codes";
import {v4 as uuidv4} from 'uuid';

let myuuid = uuidv4();
dotenv.config();

//create secretKey in jwt
let secretKey = process.env.SECRET_KEY;

//register user
export const createWithRelation = async (req: Request, res: Response) => {
  try {
    await userCreateSchema.validateAsync(req.body);
    const roleCheck = () => {
      if (role_name === "seller") {
        return role.SELLER;
      } else {
        return role.USER;
      }
    };

    let {
      role_name,
      first_name,
      last_name,
      email,
      password,
      gender,
      location,
      age,
      city,
      state,
    } = req.body;

    console.log(roleCheck());

    let isAvailable = await User.findOneBy({ email: email });

    if (isAvailable) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: " User already exist",
      });
    }


    let timestamp = new Date();
    let hashPassword = HashSyncPassword(password);

// let aquery=await User.insert({
//   role:role_name,
//   first_name,
//   last_name,
//   email,
//   password:hashPassword,
// })

    const userQuery = await new User();
    userQuery.id=myuuid
    userQuery.role=roleCheck()
    userQuery.first_name = first_name;
    userQuery.last_name = last_name;
    userQuery.email = email;
    userQuery.password = hashPassword;
    userQuery.created_by = email;
    userQuery.created_at = timestamp;

    const userSave = await User.save(userQuery);
    console.log("hitted");

    let detailsQuery = await new User_details();
    detailsQuery.id=myuuid
    detailsQuery.age = age;
    detailsQuery.gender=gender
    detailsQuery.location=location
    detailsQuery.city = city;
    detailsQuery.state = state;
    detailsQuery.user = userQuery;
    detailsQuery.created_by = email;
    detailsQuery.created_at = timestamp;


    const datailsSave = await User_details.save(detailsQuery);

    console.log("user has been created", userQuery, detailsQuery);
    res
      .status(StatusCodes.CREATED)
      .json({ status: StatusCodes.CREATED, message: "user has been created" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: "👎🏻 something went wrong " + error,
    });
  }
};

// login user
export let loginUser = async (req: Request, res: Response) => {
  try {
     await loginUserSchema.validateAsync(req.body);

    let { email, password } = req.body;

    let isAvailable = await User.findOneBy({ email: email });

    if (!isAvailable) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: "👎🏻 User does not exist !!!!, please signup ",
      });
    }

    let comparePassword = compareSynchPassword(password, isAvailable.password);

    if (!comparePassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: "👎🏻 incorrect password ",
      });
    }

    //generate token
    const tokenPayload = {
      id: isAvailable.id,
      email: isAvailable.email,
      role: isAvailable.role,
    };

    let token = await jwt.sign({ tokenPayload }, secretKey, {
      expiresIn: "7d",
    });

    console.log("token:" + token);

    let timestamp = new Date();

    //check  user token
    if (isAvailable.id !== null) {
      let findSession = await user_session.findOne({
        where: { user_id: { id: isAvailable.id } },
        relations: ["user_id"],
      });

      if (findSession) {
        let findToken = await user_session.update(
          { user_id: { id: isAvailable.id } },
          { is_expired: true }
        );
      }
    }

    let newUserToken = await user_session.insert({
      id:myuuid,  
      token: token,
      user_id: isAvailable,
      is_expired: false,
      created_at: timestamp,
    });
    console.log(token);

    return res
      .status(StatusCodes.OK)
      .json({ message: "👍🏼 user login successfully ", token ,myuuid});
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: "👎🏻 something went wrong " + error,
    });
  }
};

//forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    await forgotPasswordSchema.validateAsync(req.body);
    let { email } = req.body;

    let isAvailable = await User.findOneBy({ email: email });

    if (!isAvailable) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "user not exist . please signup" });
    }

    let tokenPayload = {
      id: isAvailable.id,
      email: isAvailable.email,
    };

    let getjwtf = () => {
      return jwt.sign(tokenPayload, secretKey, {
        expiresIn: "7d",
      });
    };

    let token = getjwtf();

    console.log("token :" + token);

    // insert token in user table
    let insertToken = await User.update(
      { id: isAvailable.id },
      { email_verification_token: token }
    );

    let linkSend = await Send_mail_user(email, token);

    res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, message: "link send on email" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: "👎🏻 something went wrong " + error,
    });
  }
};

//reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    await resetPasswordSchema.validateAsync(req.body);

    let { token }: any = req.query;
    console.log(token);

    let { email, password } = req.body;
    console.log(password);

    let isAvailable = await User.findOneBy({ email: email });

    //  console.log(isAvailable);

    if (isAvailable) {
      if (token === isAvailable.email_verification_token) {
        let decoded: any = jwt.verify(token, secretKey);
        console.log(decoded);

        let hashPassword = HashSyncPassword(password);

        let updatePass = await User.update(decoded.id, {
          password: hashPassword,
        });
        console.log(updatePass);

        res.status(StatusCodes.OK).json({
          status: StatusCodes.OK,
          message: "password changed successfully",
        });
      }
    }
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: "user is unautherize.",
    });
  } catch (error) {
    res.json({
      status: StatusCodes.BAD_REQUEST,
      message: "👎🏻 something went wrong " + error,
    });
  }
};
