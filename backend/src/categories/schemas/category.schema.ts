import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class Category extends Document {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true, unique: true })
  @Field()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
