import { Document, Model, Types } from "mongoose";

export default abstract class Repository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(object: Partial<T>): Promise<T> {
    const document = new this.model(object);
    return document.save();
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async update(object: T & { _id: string }): Promise<T> {
    return this.model
      .updateOne({ _id: object._id }, { $set: object }, { upsert: true })
      .then(() => object);
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}
