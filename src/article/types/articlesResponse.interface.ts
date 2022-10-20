import { ArticleEntity } from "../article.entity";

export interface ArticlesResponseInterface {
    article: ArticleEntity[];
    articleCount: number;
}