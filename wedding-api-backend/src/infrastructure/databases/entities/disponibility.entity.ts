import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';


export enum DiponibilityType {
	RESERVED = 'reserved',
	ABSENT = 'absent',
}


@Entity('disponibility')
export class DisponibilityEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@UpdateDateColumn()
	private updatedAt: Date;

	@CreateDateColumn()
	private createdAt: Date;

	@Column({ enum: DiponibilityType })
	type: DiponibilityType;

	@Column({unique:true})
	start: Date;

	@Column({unique:true})
	end: Date;

	@ManyToOne(type => CompanyEntity, object => object.disponibility, {
		onDelete: 'CASCADE',
		cascade: ['remove', 'update', 'insert'],
		eager: false,
		lazy: true
    })
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company: Promise<CompanyEntity>;


}

