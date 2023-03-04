import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { role } from "../entities/user";
import jwt from "jsonwebtoken";
let secretKey = process.env.SECRET_KEY;

export const authenticate_admineAndseller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { authorization }: any = req.headers;
  

    let decodeToken: any = await jwt.verify(authorization, secretKey);
    const payloadRole = decodeToken.tokenPayload.role; 
    const payloadID =decodeToken.tokenPayload.id
  

    if (payloadRole === role.SUPER_ADMIN || payloadRole === role.SELLER) {
        req.body={...req.body,roleId:payloadID}
        console.log(req.body);
          return next();
    }

    res.status(StatusCodes.UNAUTHORIZED).send({
      status: StatusCodes.UNAUTHORIZED,
      Message: "sorry, only supe admin and seller can access.",
    });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send({
      status: StatusCodes.UNAUTHORIZED,
      message: "👎🏻 something went wrong " + error,
    });
  }
};
