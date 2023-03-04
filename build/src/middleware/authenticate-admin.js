"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate_role = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_1 = require("../entities/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let secretKey = process.env.SECRET_KEY;
let authenticate_role = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { authorization } = req.headers;
        let decodeToken = yield jsonwebtoken_1.default.verify(authorization, secretKey);
        let payloadRole = decodeToken.tokenPayload.role;
        if (payloadRole === user_1.role.SUPER_ADMIN) {
            return next();
        }
        res.status(400).send({
            status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            Message: "sorry, only super_admin can access.",
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({
            status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            message: "👎🏻 something went wrong " + error,
        });
    }
});
exports.authenticate_role = authenticate_role;
