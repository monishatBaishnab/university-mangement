"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(queryModel, query) {
        this.queryModel = queryModel;
        this.query = query;
    }
    search(searchFields) {
        var _a;
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm) {
            this.queryModel = this.queryModel.find({
                $or: searchFields.map((field) => {
                    var _a;
                    return ({
                        [field]: { $regex: (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm, $options: 'i' },
                    });
                }),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludeFiles = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeFiles === null || excludeFiles === void 0 ? void 0 : excludeFiles.forEach((el) => delete queryObj[el]);
        this.queryModel = this.queryModel.find(queryObj);
        return this;
    }
    sort() {
        var _a;
        const sort = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) || '-createdAt';
        this.queryModel = this.queryModel.sort(sort);
        return this;
    }
    paginate() {
        var _a, _b;
        let limit = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.limit) || 0;
        let page = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.page) || 0;
        let skip = (page - 1) * limit;
        this.queryModel = this.queryModel.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b;
        let fields = ((_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',').join(' ')) || '-__v';
        this.queryModel = this.queryModel.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
