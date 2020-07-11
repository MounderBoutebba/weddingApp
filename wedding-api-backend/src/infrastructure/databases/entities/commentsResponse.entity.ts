import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { CommentsEntity } from './comments.entity';

@Entity('comments_responses')
export class CommentsResponseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@UpdateDateColumn()
	private updatedAt: Date;

	@CreateDateColumn()
	private createdAt: Date;

	@Column()
	public content: string;

	@OneToOne(type => UserEntity, {
		eager: true,
		onDelete: 'CASCADE',
		onUpdate: 'RESTRICT'
	})
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserEntity;

	@OneToOne(type => CommentsEntity, object => object.response, {
		onDelete: 'CASCADE',
		onUpdate: 'RESTRICT'
	})
	@JoinColumn({ name: 'comment_id', referencedColumnName: 'id' })
	comment: CommentsEntity;

}
