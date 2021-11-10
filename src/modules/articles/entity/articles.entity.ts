import { Common } from 'src/common/common.entity';
import { Category } from 'src/modules/categories/entity/categories.entity';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Article extends Common {
  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @Column('text')
  description: string;

  @ManyToOne((type)=>User,(user)=>user.articles)
  user: number

  @ManyToMany((type)=>Category,(category)=>category.articles)
  categories:Category[]
}
