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
exports.adminSignup = void 0;
const http_status_codes_1 = require("http-status-codes");
const common_function_1 = require("../../common/common-function");
const validation_1 = require("../../common/validation");
const user_1 = require("../../entities/user");
const user_details_1 = require("../../entities/user_details");
const uuid_1 = require("uuid");
let myuuid = (0, uuid_1.v4)();
//register user
const adminSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.userCreateSchema.validateAsync(req.body);
        let { first_name, last_name, email, password, age, city, state } = req.body;
        let isAvailable = yield user_1.User.findOneBy({ email: email });
        if (isAvailable) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({
                status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                message: " super_admin already exist",
            });
        }
        let timestamp = new Date();
        let hashPassword = (0, common_function_1.HashSyncPassword)(password);
        const userQuery = yield new user_1.User();
        userQuery.id = myuuid;
        userQuery.first_name = first_name;
        userQuery.last_name = last_name;
        userQuery.email = email;
        userQuery.password = hashPassword;
        userQuery.created_by = email;
        userQuery.created_at = timestamp;
        userQuery.role = user_1.role.SUPER_ADMIN;
        const userSave = yield user_1.User.save(userQuery);
        let detailsQuery = yield new user_details_1.User_details();
        detailsQuery.id = myuuid;
        detailsQuery.age = age;
        detailsQuery.city = city;
        detailsQuery.state = state;
        detailsQuery.user = userQuery;
        detailsQuery.created_by = email;
        detailsQuery.created_at = timestamp;
        const datailsSave = yield user_details_1.User_details.save(detailsQuery);
        console.log("super_admin has been created", userQuery, detailsQuery);
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "super_admin has been created" });
    }
    catch (error) {
        res.json({
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: "👎🏻 something went wrong " + error,
        });
    }
});
exports.adminSignup = adminSignup;
