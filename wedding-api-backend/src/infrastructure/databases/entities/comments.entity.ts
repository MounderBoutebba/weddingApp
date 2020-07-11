import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { ClientEntity } from './user.entity';
import { CommentsResponseEntity } from './commentsResponse.entity';
import { ReservationEntity } from './reservation.entity';

@Entity('comments')
export class CommentsEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@UpdateDateColumn()
	private updatedAt: Date;

	@CreateDateColumn()
	private createdAt: Date;

	@Column({type:'float'})
	public totalNotes: number;

	@Column({type:'float'})
	public qualiteService: number;

	@Column({type:'float'})
	public professionnalisme: number;

	@Column({type:'float'})
	public flexibilite: number;

	@Column({type:'float'})
	public rapportQualitePrix: number;

	@Column({type:'text'})
	public content: string;

	@OneToOne(type => CommentsResponseEntity, object => object.comment, {
		eager: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
		cascade: true
	})
	public response: CommentsResponseEntity;

	@ManyToOne(type => CompanyEntity, company => company.comments, {
		eager: false,
		lazy:true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
		cascade: true
	})
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company: CompanyEntity;

	@ManyToOne(type => ClientEntity, {
		eager: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
		cascade: ['insert','update']
	})
	@JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
	client: ClientEntity;

	@OneToOne(type => ReservationEntity, object => object.comment, {
		eager: false,
		lazy:true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
		cascade: ['insert','update']
	})
	@JoinColumn({ name: 'reservation_id', referencedColumnName: 'id' })
	reservation: ReservationEntity;

}
