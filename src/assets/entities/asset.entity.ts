import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Entity('assets')
export class Asset {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    purchase_cost: number;

    @Column({ type: 'date' })
    purchase_date: Date;

    @Column({ unique: true })
    tag_id: string;

    @ManyToOne(() => Category, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'category_id' })
    category: Category;

}