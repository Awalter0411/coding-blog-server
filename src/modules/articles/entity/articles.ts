import { Common } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Article extends Common {
  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @Column('text')
  description: string;

  // @Column('text')
  // category: string;
}
