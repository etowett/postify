import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { email, password, name } = createUserInput;
    const hashedPass = await bcrypt.hash(password, 10);

    const createdUser = new this.userModel({
      email,
      password: hashedPass,
      name,
    });
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }
}
