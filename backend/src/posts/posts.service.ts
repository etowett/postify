import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(authorId: string, input: CreatePostInput): Promise<Post> {
    return this.postModel.create({
      title: input.title,
      content: input.content,
      category: input.categoryId,
      author: authorId,
    });
  }

  async updatePost(authorId: string, input: UpdatePostInput): Promise<Post> {
    const { postId, ...updates } = input;
    return this.postModel.findOneAndUpdate(
      { _id: postId, author: authorId },
      updates,
      { new: true },
    );
  }

  async findAll(page = 1, limit = 10): Promise<Post[]> {
    return this.postModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author')
      .populate('category');
  }

  async findOne(postId: string): Promise<Post> {
    return this.postModel
      .findById(postId)
      .populate('author')
      .populate('category');
  }
}
