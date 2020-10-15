import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import Image from './images';

@Entity({ name: 'orphanages' })
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: boolean;

  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Image, ({ orphanage }) => orphanage, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[];
}