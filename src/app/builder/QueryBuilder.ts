import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  search(searchFields: string[]) {
    if (this?.query?.searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchFields.map(
          (field) =>
            ({
              [field]: { $regex: this?.query?.searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludeFiles = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFiles?.forEach((el) => delete queryObj[el]);

    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort = this?.query?.sort || '-createdAt';
    this.queryModel = this.queryModel.sort(sort as string);
    return this;
  }

  paginate() {
    let limit = Number(this?.query?.limit) || 0;
    let page = Number(this?.query?.page) || 0;
    let skip = (page - 1) * limit;

    this.queryModel = this.queryModel.skip(skip as number).limit(limit);

    return this;
  }

  fields() {
    let fields =
      (this?.query?.fields as string)?.split(',').join(' ') || '-__v';

    this.queryModel = this.queryModel.select(fields as string);

    return this;
  }
}

export default QueryBuilder;
