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
exports.UpdateCategory = void 0;
const category_1 = require("../../entities/category");
const http_status_codes_1 = require("http-status-codes");
let secretKey = process.env.SECRET_KEY;
let UpdateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { category_name, parent_category_id, roleId } = req.body;
        let { id } = req.params;
        let isAvailable = yield category_1.category.findOneBy({ id: id });
        if (!isAvailable) {
            res
                .status(400)
                .send({ status: http_status_codes_1.StatusCodes.BAD_REQUEST, message: "Category not found" });
        }
        let timestamp = new Date();
        let categoryUpdate = yield category_1.category.update({ id: isAvailable.id }, {
            category_name,
            parent_category_id,
            updated_at: timestamp,
            updated_by: roleId,
        });
        res
            .status(200)
            .send({ status: http_status_codes_1.StatusCodes.OK, message: "Category update successfully" });
    }
    catch (error) {
        res.status(400).send({
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: "something went wrong",
            error,
        });
    }
});
exports.UpdateCategory = UpdateCategory;
