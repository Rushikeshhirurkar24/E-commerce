"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_admin_seller_1 = require("../../middleware/authenticate-admin&seller");
const create_1 = require("./create");
const get_1 = require("./get");
//import { patchDataUSer } from "./update";
const Productroute = express_1.default.Router();
Productroute.post("/productCreate", authenticate_admin_seller_1.authenticate_admineAndseller, create_1.createProduct); //signUp Product
Productroute.get("/getProduct/:id", authenticate_admin_seller_1.authenticate_admineAndseller, get_1.getProduct); // get Product
Productroute.get("/updateProduct/:id", authenticate_admin_seller_1.authenticate_admineAndseller, get_1.getProduct); // update Product
exports.default = Productroute;
