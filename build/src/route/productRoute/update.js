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
exports.update_Product = void 0;
const http_status_codes_1 = require("http-status-codes");
const product_1 = require("../../entities/product");
const update_Product = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let isAvailable = yield product_1.Product.findOneBy({ id: id });
    if (!isAvailable) {
        res.sendStatus(http_status_codes_1.StatusCodes.NOT_FOUND).send({ status: http_status_codes_1.StatusCodes.NOT_FOUND, message: "product not found" });
    }
    let findProduct = yield product_1.Product.findOneBy({ id: id });
    console.log(findProduct);
    res.sendStatus(http_status_codes_1.StatusCodes.OK).send({ status: http_status_codes_1.StatusCodes.OK, message: "product data retrieved successfully. ", findProduct });
});
exports.update_Product = update_Product;
