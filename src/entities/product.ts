import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { category } from "./category";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  Product_name: string;

  // @Column()
  // category_id: string;

  @Column()
  selling_price: string;

  @Column()
  sort: string;

  @Column()
  quantity: string;

  @ManyToOne(()=>category,(category)=>category.id)
  @JoinColumn({name:"category_id"})
  category: category;

  @Column()
  description: string;

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

  @Column()
  deleted_by: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  deleted_at: Date;
}
