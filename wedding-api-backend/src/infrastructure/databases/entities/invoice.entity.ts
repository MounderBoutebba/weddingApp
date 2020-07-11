import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TypeExecution, InvoiceStatus } from '../../../domain/entities/invoice.model';
import { ReservationEntity } from './reservation.entity';

@Entity('invoices')
export class InvoiceEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	montant: number;

	@Column()
	dateExecution: Date;

	@Column()
	typeExecution: TypeExecution;

	@Column()
	stripePaymentIntentId: string;

	@Column()
	status: InvoiceStatus;

	@ManyToOne(
		type => ReservationEntity,
		object => object.invoices
	)
	public reservation: ReservationEntity;
}
