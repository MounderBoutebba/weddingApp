import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Phone } from './user.entity';
import { ClientEntity } from './user.entity';
@Entity('weddings')
export class WeddingEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text', { nullable: true })
	conjointEmail: string;

	@Column()
	conjointFirstname: string;

	@Column()
	conjointLastname: string;

	@Column(type => Phone)
	conjointPhone?: Phone;

	@Column()
	date: Date;

	@Column()
	budget: number;

	@Column()
	guestsNumber: number;

	@Column({ nullable: true })
	public phoneToken: string;

	@Column({ default: false })
	phoneVerified?: boolean = false;

	@Column({ default: true })
	emailVerified?: boolean = true;

	@Column({ type: 'simple-json', nullable: true })
	public location: { address: string; lat: number; lng: number } = { address: null, lat: null, lng: null };

	@OneToOne(
		type => ClientEntity,
		client => client.wedding,
		{
			onDelete: 'CASCADE',
			eager: true,
			onUpdate: 'RESTRICT'
		}
	)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	client: ClientEntity;
}
