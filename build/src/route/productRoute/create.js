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
exports.createProduct = void 0;
const http_status_codes_1 = require("http-status-codes");
const category_1 = require("../../entities/category");
const product_1 = require("../../entities/product");
const uuid_1 = require("uuid");
let myuuid = (0, uuid_1.v4)();
let secretKey = process.env.SECRET_KEY;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { Product_name, description, category_id, selling_price, sort, quantity, roleID } = req.body;
        console.log(req.body);
        const isAvalaible = yield category_1.category.findOneBy({ id: category_id });
        if (!isAvalaible) {
            res
                .sendStatus(http_status_codes_1.StatusCodes.NOT_FOUND)
                .send({ status: http_status_codes_1.StatusCodes.NOT_FOUND, message: "Product not found" });
        }
        const timestamp = new Date();
        let query = yield product_1.Product.insert({
            id: myuuid,
            Product_name,
            description,
            selling_price,
            category: isAvalaible.id,
            sort: sort,
            quantity,
            created_at: timestamp,
            created_by: roleID,
        });
        console.log({
            status: http_status_codes_1.StatusCodes.CREATED,
            message: "Product has been created",
        });
        res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json({
            status: http_status_codes_1.StatusCodes.CREATED,
            message: "Product has been created",
        });
    }
    catch (error) {
        res.json({
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: "something went wrong " + error,
        });
    }
});
exports.createProduct = createProduct;
