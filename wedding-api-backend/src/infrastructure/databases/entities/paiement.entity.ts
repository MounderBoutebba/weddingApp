import { PrimaryGeneratedColumn, Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('paiements')
export class PaiementEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		nullable: true
	})
	customerId: string;

	@Column({
		nullable: true
	})
	accountId: string;
	@Column({
		nullable: true
	})
	bankAccountId: string;

	@OneToOne(
		type => UserEntity,
		userEntity => userEntity,
		{
			eager: true,
			onDelete: 'CASCADE',
			onUpdate: 'RESTRICT'
		}
	)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;
}
