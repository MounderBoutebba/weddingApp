import {
	ChildEntity,
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	TableInheritance
} from 'typeorm';
import { WeddingEntity } from './wedding.entity';
import { PaiementEntity } from './paiement.entity';
import { CompanyEntity } from './company.entity';
import { ReservationEntity } from './reservation.entity';
import { NotificationsEntity } from './notifications.entity';
import { UserFavoriteEntity } from './user-favorite.entity';

export enum ConnectionType {
	USER_PASSWORD = 'USER_PASSWORD',
	GOOGLE = 'GOOGLE',
	FACEBOOK = 'FACEBOOK'
}

export enum Roles {
	CLIENT = 'client',
	PROVIDER = 'provider',
	ADMIN = 'admin'
}

export enum Status {
	PUBLISHED = 'PUBLISHED',
	UNPUBLISHED = 'UNPUBLISHED',
	ARCHIVED = 'ARCHIVED'
}

export enum State {
	COMPLETED = 'COMPLETED',
	UNCOMPLETED = 'UNCOMPLETED'
}

export class Phone {
	@Column()
	public country: string;
	@Column()
	public phoneNumber: string;

	public toString() {
		return this.country + (!!this.phoneNumber ? this.phoneNumber.slice(1) : '');
	}
}

// tslint:disable-next-line:max-classes-per-file
@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@OneToMany(
		type => NotificationsEntity,
		object => object.user,
		{
			eager: false,
			lazy: false,
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			cascade: true
		}
	)
	notifications: NotificationsEntity[];

	@Column({ type: 'simple-json', nullable: true })
	public location: { address: string; lat: number; lng: number } = { address: null, lat: null, lng: null };

	@Column()
	@Index({ unique: true })
	email: string;

	@Column({ default: false })
	emailVerified?: boolean = false;

	@Column({ default: false })
	phoneVerified?: boolean = false;

	@Column({ nullable: true })
	public phoneToken: string;

	@Column({ default: 0, nullable: true })
	public phoneTokenRequestCount: number;

	@Column({ nullable: true })
	firstname?: string;

	@Column({ nullable: true, default: null })
	deletedAt?: Date | null;

	@Column({ type: 'simple-array', nullable: true })
	languages?: string[] = [];

	@Column({ nullable: true })
	lastname?: string;

	@Column(type => Phone)
	phone?: Phone;

	@Column({ nullable: true })
	status?: Status;

	@Column({ nullable: true })
	state?: State;

	@Column({ nullable: true })
	lastConnexionDate?: Date;

	@Column()
	connectionType: ConnectionType;

	@Column()
	role: Roles;

	@Column({ nullable: true })
	photo: string;

	@OneToOne(
		type => PaiementEntity,
		paiementEntity => paiementEntity.user,
		{
			onDelete: 'CASCADE',
			cascade: ['remove'],
			lazy: true
		}
	)
	paiement: PaiementEntity;

	@CreateDateColumn({ nullable: true })
	createdAt: Date;
}

// tslint:disable-next-line:max-classes-per-file
@ChildEntity('client')
export class ClientEntity extends UserEntity {

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

	@OneToOne(
		type => WeddingEntity,
		wedding => wedding.client,
		{
			onDelete: 'CASCADE',
			cascade: ['remove'],
			lazy: true
		}
	)
	wedding: Promise<WeddingEntity>;

	@OneToMany(
		type => ReservationEntity,
		object => object.client,
		{
			lazy: true
		}
	)
	reservations: ReservationEntity[];
}
// tslint:disable-next-line:max-classes-per-file
@ChildEntity('providers')
export class ProviderEntity extends UserEntity {
	@Column({ nullable: true })
	siret?: number;

	@OneToOne(
		type => CompanyEntity,
		object => object.user,
		{
			onDelete: 'CASCADE',
			cascade: ['remove', 'update', 'insert'],
			lazy: true
		}
	)
	company: CompanyEntity;

	@Column({ default: false })
	public verifiedProvider: boolean = false;
}
