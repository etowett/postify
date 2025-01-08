import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from '../../categories/schemas/category.schema';
import { User } from '../../users/schemas/user.schema';

@Schema({ timestamps: true })
@ObjectType()
export class Post extends Document {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop()
  @Field()
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @Field(() => User)
  author: User;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  @Field(() => Category)
  category: Category;
}

export const PostSchema = SchemaFactory.createForClass(Post);
