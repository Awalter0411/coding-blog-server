import { Common } from 'src/common/common.entity';
import { Article } from 'src/modules/articles/entity/articles.entity';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Category extends Common {
  @Column('text')
  name: string;

  @ManyToOne((type) => User, (user) => user.categories)
  user: number;

  @OneToMany((type) => Article, (article) => article.category)
  articles: Article[];
}
