import Repository from "../../core/Repository";
import { ProductModel, ProductDocument } from "./product.model";

export default class ProductRepository extends Repository<ProductDocument> {
  constructor() {
    super(ProductModel);
  }
}
