import { IProduct, ProductDocument } from "./product.model";
import ProductRepository from "./ProductRepository";

export default class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async findAll(): Promise<ProductDocument[]> {
    try {
      return this.productRepository.findAll();
    } catch (err) {
      console.error("Erro no ProductService.findAll:", err);
      throw err;
    }
  }

  async findById(id: string): Promise<ProductDocument | null> {
    return this.productRepository.findById(id);
  }

  async create(product: IProduct): Promise<ProductDocument> {
    return this.create(product);
  }
}
