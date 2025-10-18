import Repository from "../../core/Repository";
import { UserDocument, userModel } from "./user.model";

export default class UserRepository extends Repository<UserDocument> {
  constructor() {
    super(userModel);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.model.findOne({ email }).exec();
  }
}
