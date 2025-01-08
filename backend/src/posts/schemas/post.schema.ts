import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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
  @Field()
  author: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  @Field()
  category: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
