import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import Orphanage from "./orphanages";

@Entity({ name: 'images' })
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Orphanage, ({ images }) => images)
  @JoinColumn({ name: 'orphanage_id' })
  orphanage: Orphanage;

}