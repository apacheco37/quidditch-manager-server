import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PlayerSkills {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  scoring: number;

  @Column()
  passing: number;

  @Column()
  interceptions: number;

  @Column()
  handling: number;

  @Column({
    name: 'beating_accuracy'
  })
  beatingAccuracy: number;

  @Column()
  agility: number;

  @Column()
  reflexes: number;

  @Column()
  balance: number;

  @Column()
  strength: number;
}
