import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { ClientEntity, UserEntity } from './user.entity';
import { CompanyEntity } from './company.entity';

@Unique('unique_company_user', ['company', 'user'])
@Entity('user_favorites')
export class UserFavoriteEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@UpdateDateColumn()
	updatedAt: Date;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(type => CompanyEntity,object => object.favorites,
		{ eager: true})
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company: CompanyEntity;

	@ManyToOne(type => ClientEntity,object => object.favorites,
		{ eager: true})
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user:UserEntity;

}
