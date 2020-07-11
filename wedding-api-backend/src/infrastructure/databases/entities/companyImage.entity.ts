import { AfterRemove, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { GcpFileService } from '../../../global/services/gcp-file/gcp-file.service';

@Entity('images')
export class CompanyImageEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	public name: string;

	@Column()
	public description: string;

	@Column({ nullable: true })
	public path: string;

	@UpdateDateColumn()
	updatedAt: Date;

	@CreateDateColumn()
	createdAt: Date;

	@Column({ default: false, nullable: false })
	public favorite: boolean;

	@ManyToOne(type => CompanyEntity, object => object.images, {
		lazy: true,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company: CompanyEntity;

	@AfterRemove()
	public async removeImageFromDisk() {
		const gcpFileService = new GcpFileService();
		await gcpFileService.removeFile(this.name);
	}
}
