import mongoose from "mongoose";
import { logger } from "../../utils/logger";
import { ProductDocument } from "../products/product.model";
import { IUser, UserDocument } from "./user.model";
import UserRepository from "./UserRepository";

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async findAll(): Promise<UserDocument[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      logger.error(`Erro ao buscar Produtos: ${error}`);
      throw error;
    }
  }

  async findById(id: string): Promise<UserDocument | null> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      logger.error(`Erro ao buscar por id ${id}`);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      return this.userRepository.findByEmail(email);
    } catch (error) {
      logger.error(`Erro ao buscar email : ${email}`);
      throw error;
    }
  }

  async create(user: UserDocument): Promise<UserDocument> {
    try {
      return await this.userRepository.create(user);
    } catch (error) {
      logger.error(`Erro ao inserir Usuário: $${user}`);
      throw error;
    }
  }

  async update(user: UserDocument): Promise<UserDocument | null> {
    try {
      const updatedUser = await this.userRepository.update(user);
      return updatedUser;
    } catch (error) {
      logger.error(`Erro ao atualizar usuário: ${error}`);
      throw error;
    }
  }

  async delete(id: string): Promise<UserDocument | null> {
    try {
      const userMongoId = new mongoose.Types.ObjectId(id);
      return await this.userRepository.delete(userMongoId);
    } catch (error) {
      logger.error(`Erro ao deletar usuário: ${error}`);
      throw error;
    }
  }
}
