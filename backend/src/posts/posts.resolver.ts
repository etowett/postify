import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostsService } from './posts.service';
import { Post } from './schemas/post.schema';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query(() => [Post])
  async posts(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    return this.postsService.findAll(page, limit);
  }

  @Query(() => Post, { nullable: true })
  async post(@Args('postId') postId: string) {
    return this.postsService.findOne(postId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  async createPost(
    @CurrentUser() user: { userId: string },
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<Post> {
    return this.postsService.createPost(user.userId, createPostInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  async updatePost(
    @CurrentUser() user: { userId: string },
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postsService.updatePost(user.userId, updatePostInput);
  }
}
