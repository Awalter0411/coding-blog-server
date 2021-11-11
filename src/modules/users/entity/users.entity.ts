import { Common } from 'src/common/common.entity';
import { Article } from 'src/modules/articles/entity/articles.entity';
import { Category } from 'src/modules/categories/entity/categories.entity';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity()
export class User extends Common{
  @Column('text')
  username: string;

  @Column('text')
  password: string;

  @Column('text')
  salt: string;

  @OneToMany((type)=> Article,(article)=>article.user)
  articles:Article[]

  @OneToMany((type)=> Category,(category)=>category.user)
  categories:Category[]

  // 个人介绍
  @Column('text')
  desc: string;
}
