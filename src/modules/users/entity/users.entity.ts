import { Common } from 'src/common/common.entity';
import {
  Column,
  Entity,
} from 'typeorm';

@Entity()
export class User extends Common{
  @Column('text')
  username: string;

  @Column('text')
  password: string;

  @Column('text')
  salt: string;
}
