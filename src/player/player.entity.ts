import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({
    length: 50
  })
  FirstName: string;

  @Column({
    length: 50
  })
  LastName: string;

  @Column()
  Age: number;
}
