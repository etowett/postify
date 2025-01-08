// categories.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private catModel: Model<Category>) {}

  async createCategory(input: CreateCategoryInput): Promise<Category> {
    return this.catModel.create(input);
  }

  async findAll(): Promise<Category[]> {
    return this.catModel.find().exec();
  }
}
