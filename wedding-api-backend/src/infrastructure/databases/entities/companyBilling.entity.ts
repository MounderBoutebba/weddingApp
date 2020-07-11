import {
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	JoinColumn
} from 'typeorm';
import { CompanyEntity } from './company.entity';

export enum CondRefundDepositType {
	SYSTEMATIC_REFUND = 'remboursement systematique',
	CONDITIONAL_REFUND = 'remboursement conditionnel'
}

export enum CondRefundDepositCause {
	GRIEVOUS_FAMILY_EVENT = 'Evénement familial grave',
	EVENT_PREVENTING_UNFOLDING = 'Tout évenement empechant le déroulement du mariage',
	PERSONAL_JUDGMENT = 'Selon mon jugement personnel de la situation'
}

@Entity('companyBilling')
export class CompanyBillingEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		type: Boolean,
		default: false,
		nullable: true
	})
	public paymentSecure: boolean;

	@Column({
		type: Boolean,
		default: false,
		nullable: true
	})
	public depositPayment: boolean;

	@Column({ nullable: true })
	public depositPercentage: number;

	@Column({ nullable: true })
	public condRefundDepositClient: CondRefundDepositType;

	@Column({ nullable: true })
	public condRefundDepositClientCause: CondRefundDepositCause;

	@Column({ nullable: true })
	public percentageRefundDepositClient: number;

	@Column({ nullable: true })
	public condRefundDepositCompany: CondRefundDepositType;

	@Column({ nullable: true })
	public condRefundDepositCompanyCause: CondRefundDepositCause;

	@Column({ nullable: true })
	public percentageRefundDepositCompany: number;

	@UpdateDateColumn()
	updatedAt: Date;

	@CreateDateColumn()
	createdAt: Date;

	@OneToOne(type => CompanyEntity, object => object.billing, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE',
		onUpdate:'CASCADE',
		eager:false,
		lazy:true
	})
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company: Promise<CompanyEntity>;
}
