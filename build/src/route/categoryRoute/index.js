"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_admin_seller_1 = require("../../middleware/authenticate-admin&seller");
const create_category_1 = require("./create_category");
const delect_category_1 = require("./delect_category");
const get_Category_1 = require("./get_Category");
const update_Category_1 = require("./update_Category");
const categoryRoute = express_1.default.Router();
categoryRoute.post("/api/createCategory", authenticate_admin_seller_1.authenticate_admineAndseller, create_category_1.create_category); //signUp category
categoryRoute.get("/api/category/:id", authenticate_admin_seller_1.authenticate_admineAndseller, get_Category_1.getCategory); //get category
categoryRoute.put("/api/updateCategory/:id", authenticate_admin_seller_1.authenticate_admineAndseller, update_Category_1.UpdateCategory); //put category
categoryRoute.delete("/api/deleteCategory/:id", authenticate_admin_seller_1.authenticate_admineAndseller, delect_category_1.deleteCategory); //delete category
exports.default = categoryRoute;
