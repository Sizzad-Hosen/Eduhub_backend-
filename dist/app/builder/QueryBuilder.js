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
const constance_1 = require("./constance");
class QueryBuilder {
    constructor(modelQuery, query) {
        this.total = 0;
        this.page = 1;
        this.limit = 10;
        this.totalPages = 1;
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(field => {
                    const dbField = constance_1.fieldToDbPathMap[field] || field;
                    return {
                        [dbField]: { $regex: searchTerm, $options: 'i' },
                    };
                }),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        const filterConditions = {};
        Object.entries(queryObj).forEach(([field, value]) => {
            const dbField = constance_1.fieldToDbPathMap[field] || field;
            if (typeof value === "string") {
                filterConditions[dbField] = { $regex: value, $options: "i" };
            }
            else {
                filterConditions[dbField] = value;
            }
        });
        this.modelQuery = this.modelQuery.find(filterConditions);
        return this;
    }
    sort() {
        var _a, _b, _c;
        const sort = ((_c = (_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(",")) === null || _c === void 0 ? void 0 : _c.join(" ")) || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    paginate() {
        var _a, _b;
        this.page = Number((_a = this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        this.limit = Number((_b = this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (this.page - 1) * this.limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(this.limit);
        return this;
    }
    fields() {
        var _a, _b, _c;
        const fields = ((_c = (_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(",")) === null || _c === void 0 ? void 0 : _c.join(" ")) || "-__v";
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    countTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            const filters = this.modelQuery.getFilter();
            this.total = yield this.modelQuery.model.countDocuments(filters);
            this.totalPages = Math.ceil(this.total / this.limit);
            return this;
        });
    }
}
exports.default = QueryBuilder;
