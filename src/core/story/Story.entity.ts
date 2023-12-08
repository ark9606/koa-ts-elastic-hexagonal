import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('Story')
export class StoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  fullText: string;

  @Column()
  photoUrl: string;

  @Column()
  authorId: string;

  @Column()
  category: string;

  @Column()
  liked: number;

  @CreateDateColumn()
  createdAt: Date;
}
