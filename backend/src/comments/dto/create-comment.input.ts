// create-comment.input.ts
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  postId: string;

  @Field()
  content: string;
}
