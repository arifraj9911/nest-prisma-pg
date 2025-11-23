import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
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
