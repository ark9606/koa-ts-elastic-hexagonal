import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('Author')
export class AuthorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  description: string

  @Column()
  photoUrl: string
}
