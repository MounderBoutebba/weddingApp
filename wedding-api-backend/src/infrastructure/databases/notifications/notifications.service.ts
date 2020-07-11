import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsRepository } from './notifications.repository';
import { NotificationDto } from '../../../presentation/notifications/dto/notification.dto';
import { UserEntity } from '../entities';
import { NotificationsEntity } from '../entities/notifications.entity';
import { UpdateNotificationDto } from '../../../presentation/notifications/dto/updateNotification.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { UsersServices } from '../users/users.service';

@Injectable()
export class NotificationsServiceDB {

    constructor(
		@InjectRepository(NotificationsRepository) private readonly  notificationsRepository: NotificationsRepository,
		private usersServices: UsersServices
	) {}


	public async createNotification(notificationDto: NotificationDto) {
		const user = await this.usersServices.findUserById(notificationDto.userId);
			let notifications = new NotificationsEntity();
			notifications.content = notificationDto.content;
			notifications.user = user;
			notifications.url = notificationDto.url;
			notifications = await this.notificationsRepository.save(notifications);
			return notifications;

	}

	public async updateNotification(notificationDto: UpdateNotificationDto, user: UserEntity,id:string) {
		let notification;
		try{
			notification = await this.notificationsRepository.findOneOrFail(id)
		}catch (e) {
			throw new NotFoundException()
		}
		notification.seen = notificationDto.seen;
		notification= await this.notificationsRepository.save(notification);
		return notification;
	}

	public async getCountUnseenNotification(user: UserEntity) {
		try {
			return await this.notificationsRepository.count({ user: { id : user.id }, seen: false });
		} catch (e) {
			throw new NotFoundException();
		}
	}

	public async markAllAsSeen(user: UserEntity) {
		try {
			return await this.notificationsRepository.update(
				{ user: { id: user.id }, seen: false },
				{ seen: true }
			);
		} catch (e) {
			throw e;
			// throw new NotFoundException();
		}
	}

	public async getNotifications(user: UserEntity, page: number) {
		try {
			return await paginate<NotificationsEntity>(this.notificationsRepository, {
				limit: 10,
				page,
				route: `/api/notifications`
				// @ts-ignore
			}, { where:{user: { id: user.id }},order:{createdAt:'DESC'} });
		} catch (e) {
			throw new NotFoundException();
		}
	}

}
