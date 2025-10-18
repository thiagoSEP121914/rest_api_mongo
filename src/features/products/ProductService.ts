import { IProduct, ProductDocument } from "./product.model";
import ProductRepository from "./ProductRepository";

export default class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  // ProductService.ts
  async findAll(): Promise<ProductDocument[]> {
    try {
      return this.productRepository.findAll();
    } catch (err) {
      console.error("Erro no ProductService.findAll:", err);
      throw err; // relança para o controller pegar
    }
  }

  async findById(id: string): Promise<ProductDocument | null> {
    return this.productRepository.findById(id);
  }

  async create(product: IProduct): Promise<ProductDocument> {
    return this.create(product);
  }
}
