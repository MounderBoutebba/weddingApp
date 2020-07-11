import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {  UserEntity } from './user.entity';

@Entity('notifications')
export class NotificationsEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@UpdateDateColumn()
	private updatedAt: Date;

	@CreateDateColumn()
	private createdAt: Date;

	@Column({type:'text'})
	public content: string;

	@Column()
	public url: string;

	@Column({ default: false })
	public seen: boolean = false;

	@ManyToOne(type => UserEntity,object => object.notifications, {
		eager: false})
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user:UserEntity;

}
