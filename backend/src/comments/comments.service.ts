// comments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async createComment(
    authorId: string,
    input: CreateCommentInput,
  ): Promise<Comment> {
    return this.commentModel.create({
      content: input.content,
      post: input.postId,
      author: authorId,
    });
  }

  async findByPostId(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ post: postId }).populate('author').exec();
  }
}
