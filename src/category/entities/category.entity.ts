import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    category_id: string;
    @Column({ unique: true })
    name: string;
    @Column('decimal', { precision: 5, scale: 4 })
    depreciation_rate: number;
    @Column({ nullable: true })
    description: string;
}