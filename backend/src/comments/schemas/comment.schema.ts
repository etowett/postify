import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class Comment extends Document {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @Field()
  author: string;

  @Prop({ type: Types.ObjectId, ref: 'Post' })
  @Field()
  post: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
