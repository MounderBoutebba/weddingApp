import {
	Column,
	CreateDateColumn,
	Entity,
	Generated,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn
} from 'typeorm';
import { PaymentType, ReservationStatus } from '../../../domain/entities/reservation.model';
import { CompanyEntity } from './company.entity';
import { ClientEntity } from './user.entity';
import { OrderInterface } from '../../../presentation/booking/dto/createBooking.dto';
import { BillModel } from './reservationsIndex.model';
import { CommentsEntity } from './comments.entity';
import { InvoiceEntity } from './invoice.entity';

@Entity('reservations')
@Unique(['company', 'client', 'start', 'end'])
export class ReservationEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Generated('increment')
	@Column()
	orderNumber: number;

	@UpdateDateColumn()
	updatedAt: Date;

	@CreateDateColumn()
	createdAt: Date;

	@Column({ nullable: true })
	providerConfirmationDate: Date;

	@Column({ nullable: true })
	clientConfirmationDate: Date;

	@Column({ default:0 })
	notifyClientCount: number=0;

	@Column()
	reservationsStatus: ReservationStatus = ReservationStatus.RESERVATION_REQUEST;

	@ManyToOne(
		type => CompanyEntity,
		company => company.reservations,
		{
			eager: true,
			onDelete: 'CASCADE',
			onUpdate: 'RESTRICT'
		}
	)
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company: CompanyEntity;

	@ManyToOne(
		type => ClientEntity,
		client => client.reservations,
		{
			eager: true,
			onDelete: 'CASCADE',
			onUpdate: 'RESTRICT'
		}
	)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	client: ClientEntity;

	@OneToOne(
		type => CommentsEntity,
		object => object.reservation,
		{
			eager: true,
			cascade: ['remove'],
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		}
	)
	public comment: CommentsEntity;

	@OneToMany(
		type => InvoiceEntity,
		object => object.reservation,
		{
			eager: true,
			cascade: ['insert', 'update', 'remove'],
			onDelete: 'CASCADE'
		}
	)
	invoices: InvoiceEntity[];

	@Column({ nullable: true })
	paymentType: PaymentType;

	@Column()
	start: Date;

	@Column()
	end: Date;

	@Column({ type: 'float' })
	totalPrice: number;

	@Column({ type: 'float' })
	finalPrice: number;

	@Column({ type: 'float',default:0 })
	allPrice: number;

	@Column()
	guestcount: number;

	@Column({ type: 'simple-array' })
	categories: string[] = [];

	@Column({ type: 'simple-json', nullable: false,default:[] })
	additionalFees: { title: string; price: number }[]=[];

	@Column({ type: 'simple-json', nullable: false,default:[]})
	discounts: { title: string; price: number }[]=[];

	@Column({ type: 'float', nullable: true })
	loyer: number;

	@Column({ type: 'float', nullable: true })
	nombreDeMois: number;

	@Column({ type: 'float', nullable: true })
	remunerationProvider: number;

	order: OrderInterface;
	bill: BillModel[];
	variations: any[];

	@Column({ type: 'simple-json' })
	location: { address: string; geo: { lat: number; lon: number } };
}
