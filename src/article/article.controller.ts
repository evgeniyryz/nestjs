import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { UserEntity } from 'src/user/user.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import { ArticlesResponseInterface } from './types/articlesResponse.interface';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articlleService: ArticleService) {}

    @Get()
    async findAll(@User('id') currentUserId: number, @Query() query: any) {
        return await this.articlleService.findAll(currentUserId, query);
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async create
    (@User() currentUser: UserEntity,
     @Body('article') CreateArticleDto): Promise<ArticleResponseInterface> {
        const article = await this.articlleService.createArticle(currentUser, CreateArticleDto);
        return this.articlleService.buildArticleResponse(article);
    }

    @Get(':slug')
    async getSingleArticle(@Param('slug') slug: string): Promise<ArticleResponseInterface> {
        const  article = await this.articlleService.findBySlug(slug);
        return this.articlleService.buildArticleResponse(article); 
    }

    @Delete(':slug')
    @UseGuards(AuthGuard)
    async deleteArticle(@User('id') currentUserId: number, @Param('slug') slug: string) {
        return await this.articlleService.deleteArticle(slug, currentUserId);
    }

    @Put(':slug')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateArticle(
        @User('id') currentUserId: number,
        @Param('slug') slug: string,
        @Body('article') updateArticleDto: CreateArticleDto ): Promise<ArticleResponseInterface> {
        const article = await this.articlleService.updateArticle(slug, updateArticleDto, currentUserId);
        return this.articlleService.buildArticleResponse(article);
    }
}
