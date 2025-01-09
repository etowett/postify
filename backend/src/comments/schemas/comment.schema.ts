import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from '../../posts/schemas/post.schema';
import { User } from '../../users/schemas/user.schema';

@Schema({ timestamps: true })
@ObjectType()
export class Comment extends Document {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @Field(() => User)
  author: User;

  @Prop({ type: Types.ObjectId, ref: 'Post' })
  @Field(() => Post)
  post: Post;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
