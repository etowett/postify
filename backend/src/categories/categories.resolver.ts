import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './schemas/category.schema';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}

  @Query(() => [Category])
  async categories() {
    return this.categoriesService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Category, { name: 'createCategory' })
  async createCategory(
    @Args('createCategoryInput') input: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoriesService.createCategory(input);
  }
}
