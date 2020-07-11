import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity('settings')
export class SettingEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	periodStartDate: Date;

	@Column()
	periodEndDate: Date;

	@Column()
	increaseWeek: number;

	@Column()
	increaseWeekend: number;

	@Column()
	autoApplication: boolean;

	@UpdateDateColumn()
	updatedAt: Date;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(type => CompanyEntity, object => object.options, { onDelete: 'CASCADE' })
	company: CompanyEntity;
}
