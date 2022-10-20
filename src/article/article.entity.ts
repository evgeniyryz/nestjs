import { UserEntity } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';

 @Entity({name: 'articles'})

export class ArticleEntity{
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     slug: string;

     @Column()
     title: string;

     @Column({ default: '' })
     description: string;

     @Column({ default: '' })
     body: string;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

     @Column('simple-array')
     tagList: string[];

     @Column({ default: 0 })
     favoritesCount: number;

    @ManyToOne(() => UserEntity, user => user.articles, { eager: true })
    author: UserEntity;
}