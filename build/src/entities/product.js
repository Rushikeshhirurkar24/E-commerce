"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const category_1 = require("./category");
let Product = class Product extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "Product_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "selling_price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_1.category, (category) => category.id),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", category_1.category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "deleted_by", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Product.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Product.prototype, "deleted_at", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
exports.Product = Product;
