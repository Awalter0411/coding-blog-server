import { Common } from 'src/common/common.entity';
import { Article } from 'src/modules/articles/entity/articles.entity';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Category extends Common {
  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @Column('text')
  description: string;

  @ManyToOne((type) => User, (user) => user.categories)
  user: number;

  @ManyToMany((type) => Article, (article) => article.categories)
  @JoinTable()
  articles: Article[];
}
