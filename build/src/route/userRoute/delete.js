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
exports.deleteDataUSer = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_1 = require("../../entities/user");
const user_details_1 = require("../../entities/user_details");
const user_session_1 = require("../../entities/user_session");
const deleteDataUSer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let isAvailable = yield user_1.User.findOneBy({ id: id });
        console.log(isAvailable);
        if (!isAvailable) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ status: http_status_codes_1.StatusCodes.NOT_FOUND, message: "user not found." });
        }
        let timestamp = new Date();
        let idDelete = yield user_1.User.update({ id: id }, {
            is_deleted: true,
            deleted_by: isAvailable.email,
            deleted_at: timestamp,
        });
        let detailsDeleted = yield user_details_1.User_details.update({ user: { id: isAvailable.id } }, { deleted_at: timestamp, deleted_by: isAvailable.email });
        let deleteSession = yield user_session_1.user_session.update({ user_id: { id: id } }, { deleted_at: timestamp });
        res.json({
            status: http_status_codes_1.StatusCodes.OK,
            message: id + "user id is deleted ",
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: "something went wrong",
            error,
        });
    }
});
exports.deleteDataUSer = deleteDataUSer;
