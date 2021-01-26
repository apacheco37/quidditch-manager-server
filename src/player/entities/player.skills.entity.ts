import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PlayerSkills {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Scoring: number;

  @Column()
  Passing: number;

  @Column()
  Interceptions: number;

  @Column()
  Handling: number;

  @Column()
  BeatingAccuracy: number;

  @Column()
  Agility: number;

  @Column()
  Reflexes: number;

  @Column()
  Balance: number;

  @Column()
  Strength: number;
}
