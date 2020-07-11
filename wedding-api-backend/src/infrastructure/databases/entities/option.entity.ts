import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';

export enum FeeType {
	SINGLE_FEE = 'Frais unique',
	UNIT_FEE = 'Frais par unité',
	GUEST_FEE = 'Frais par invité'
}

@Entity('options')
export class OptionEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	public name: string;

	@Column()
	public description: string;

	@Column()
	public optionRate: number;

	@Column({ type: 'simple-array',default:'' })
	public categories: string[] = [];

	@Column()
	public feeType: FeeType;

	@UpdateDateColumn()
	updatedAt: Date;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(type => CompanyEntity, object => object.options, { onDelete: 'CASCADE' })
	company: CompanyEntity;
}
