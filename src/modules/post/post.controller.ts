import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const res = await this.postService.createPost(createPostDto);

    return {
      message: 'Post Created Successfully',
      post: res,
    };
  }

  @Get()
  async getAllPost() {
    const res = await this.postService.getPost();

    return {
      message: 'Post Retrieved Successfully',
      posts: res,
    };
  }
}
