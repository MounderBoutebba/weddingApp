import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyImageEntity } from './companyImage.entity';
import { ProviderEntity } from './user.entity';
import { ReservationEntity } from './reservation.entity';
import { SettingEntity } from './setting.entity';
import { OptionEntity } from './option.entity';
import { CompanyBillingEntity } from './companyBilling.entity';
import { DisponibilityEntity } from './disponibility.entity';
import { CommentsEntity } from './comments.entity';
import { UserFavoriteEntity } from './user-favorite.entity';

export enum TripFeeType {
	SINGLE_FEE = 'Frais unique',
	FEE_PER_KM = 'Frais par kilomètre'
}

@Entity('companies')
export class CompanyEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	public name: string;

	@Column()
	public description: string;

	@Column({
		type: Boolean,
		default: false,
		nullable: true
	})
	public weekendVariation: boolean;

	@Column({ nullable: true, default: 0 })
	public weekendVariationPercentage: number;

	@Column({
		type: Boolean,
		default: false,
		nullable: true
	})
	public periodeVariation: boolean;

	@Column({
		type: Boolean,
		default: false,
		nullable: true
	})
	public optionsProposed: boolean;

	@Column({
		type: Boolean,
		default: false,
		nullable: true
	})
	public suppHours: boolean;

	@Column({ nullable: true, default: 0 })
	public suppHoursRate: number;

	@Column({
		type: Boolean,
		default: false,
		nullable: true
	})
	public tripExpences: boolean;

	@Column({ nullable: true, default: 0 })
	public tripExpencesDistance: number;

	@Column({ nullable: true })
	public tripExpencesRateType: TripFeeType;

	@Column({ nullable: true, default: 0 })
	public tripExpencesTypePrice: number;

	@Column({ nullable: true })
	public currentStep: string;

	@Column('simple-array')
	public categories: string[] = [];

	@Column('simple-array')
	public links: string[] = [];

	@Column({ type: 'simple-json', nullable: true })
	public questions: object;

	@Column({ type: 'simple-json', nullable: true })
	public location: { address: string; lat: number; lng: number } = { address: null, lat: null, lng: null };

	@Column({ type: 'simple-json', nullable: true })
	public dynamiqueQts: { label: string; response: string }[] = [];

	@OneToMany(type => CompanyImageEntity, object => object.company, {
		eager: true,
		cascade: ['insert', 'update', 'remove'],
		onDelete: 'CASCADE'
	})
	images: CompanyImageEntity[];

	@OneToMany(type => SettingEntity, object => object.company, {
		eager: true,
		cascade: ['insert', 'update', 'remove'],
		onDelete: 'CASCADE'
	})
	settings: SettingEntity[];

	@OneToMany(type => OptionEntity, object => object.company, {
		eager: true,
		cascade: ['insert', 'update', 'remove'],
		onDelete: 'CASCADE'
	})
	options: OptionEntity[];

	@OneToOne(type => CompanyBillingEntity, object => object.company, {
		onDelete: 'CASCADE',
		onUpdate:'CASCADE',
		cascade: ['remove', 'update', 'insert'],
		eager: true
	})
	billing: CompanyBillingEntity;

	@UpdateDateColumn()
	updatedAt: Date;

	@CreateDateColumn()
	createdAt: Date;

	@OneToOne(type => ProviderEntity, object => object.company, {
		eager: true,
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: ProviderEntity;

	@OneToMany(
		type => ReservationEntity,
		reservations => reservations.company,
		{ eager: false, lazy: true }
	)
	reservations: ReservationEntity[];

	@Column({ type: 'simple-array', nullable: true })
	networks?: string[] = [];

	@OneToMany(type => CommentsEntity, comments => comments.company , {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE'
	})
	comments: CommentsEntity[];

	@Column({ default: 0 })
	public countVotes: number = 0;

	@Column({ default: 0, type: 'float' })
	public totalNotes: number = 0;

	@Column({ default: 0, type: 'float' })
	public qualiteService: number = 0;

	@Column({ default: 0,type:'float' })
	public countQualiteService: number = 0;


	@Column({ default: 0, type: 'float' })
	public professionnalisme: number = 0;

	@Column({ default: 0,type:'float' })
	public countProfessionnalisme: number = 0;


	@Column({ default: 0, type: 'float' })
	public flexibilite: number = 0;

	@Column({ default: 0,type:'float' })
	public countFlexibilite: number = 0;


	@Column({ default: 0, type: 'float' })
	public rapportQualitePrix: number = 0;

	@Column({ default: 0,type:'float' })
	public countRapportQualitePrix: number = 0;

	@Column({ default: false })
	public securePayment: boolean = false;

	@OneToMany(type => DisponibilityEntity, object => object.company, {
		lazy: false,
		eager: false,
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE'
	})
	public disponibility: Promise<DisponibilityEntity>;

	@OneToMany(
		type => UserFavoriteEntity,
		object => object.user,
		{
			eager: false,
			lazy: false,
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			cascade: true
		}
	)
	favorites: UserFavoriteEntity[];

}
