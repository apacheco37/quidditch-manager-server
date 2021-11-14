import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Player } from '../../player/entities/player.entity';

@Entity()
export class MatchOrder {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToMany(() => Player, {
    eager: true
  })
  @JoinTable()
  chasers: Player[];

  @ManyToMany(() => Player, {
    eager: true
  })
  @JoinTable()
  beaters: Player[];

  @ManyToOne(() => Player, {
    eager: true
  })
  @JoinColumn()
  keeper: Player;
}
