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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataUSer = void 0;
const user_details_1 = require("../../entities/user_details");
const http_status_codes_1 = require("http-status-codes");
const getDataUSer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let getData = yield user_details_1.User_details.find({
            where: { user: { id: id } },
            relations: ["user"],
        });
        if (getData.length === 0) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ status: http_status_codes_1.StatusCodes.NOT_FOUND, message: "id is not found." });
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .send({ status: http_status_codes_1.StatusCodes.OK, message: "user data retrieved successfully : ", getData });
        console.log(getData[0].user.first_name);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: "something went wrong",
            error,
        });
    }
});
exports.getDataUSer = getDataUSer;
