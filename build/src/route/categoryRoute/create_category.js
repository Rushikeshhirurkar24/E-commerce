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
exports.create_category = void 0;
const status_codes_1 = require("http-status-codes/build/cjs/status-codes");
const category_1 = require("../../entities/category");
const uuid_1 = require("uuid");
let myuuid = (0, uuid_1.v4)();
let secretKey = process.env.SECRET_KEY;
const create_category = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { category_name, parent_category_id, roleId } = req.body;
        let categoryAvalaible = yield category_1.category.findOneBy({
            category_name: category_name,
        });
        if (categoryAvalaible) {
            return res
                .status(status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ status: status_codes_1.StatusCodes.BAD_REQUEST, message: "this category already exist." });
        }
        let timestemp = new Date();
        let createCategory = new category_1.category();
        createCategory.id = myuuid;
        createCategory.category_name = category_name;
        createCategory.parent_category_id = parent_category_id;
        createCategory.created_at = timestemp;
        createCategory.created_by = roleId;
        let saveCategory = yield category_1.category.save(createCategory);
        res.status(status_codes_1.StatusCodes.OK).send({ status: status_codes_1.StatusCodes.OK, message: "category has been inserted" });
    }
    catch (error) {
        res.json({
            status: status_codes_1.StatusCodes.BAD_REQUEST,
            message: "👎🏻 something went wrong " + error,
        });
    }
});
exports.create_category = create_category;
