// comments.resolver.ts
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './schemas/comment.schema';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  async createComment(
    @CurrentUser() user: { userId: string },
    @Args('createCommentInput') input: CreateCommentInput,
  ) {
    return this.commentsService.createComment(user.userId, input);
  }

  @Query(() => [Comment])
  async commentsByPost(@Args('postId') postId: string) {
    return this.commentsService.findByPostId(postId);
  }
}
