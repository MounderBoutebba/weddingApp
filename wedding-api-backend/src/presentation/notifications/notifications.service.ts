import { Injectable } from '@nestjs/common';
import { NotificationsServiceDB } from '../../infrastructure/databases/notifications/notifications.service';
import { NotificationDto } from './dto/notification.dto';
import { UserEntity } from '../../infrastructure/databases/entities';
import { UpdateNotificationDto } from './dto/updateNotification.dto';

@Injectable()
export class NotificationsService {

    constructor(private readonly notificationsServiceDB: NotificationsServiceDB) {
    }

    public async createNotification(notification: NotificationDto) {
        return this.notificationsServiceDB.createNotification(notification);
    }

    public async updateNotification(notification: UpdateNotificationDto, user: UserEntity, id: string) {
        return this.notificationsServiceDB.updateNotification(notification, user, id);
    }

    public async getUnseeNotification(user: UserEntity) {
        return this.notificationsServiceDB.getCountUnseenNotification(user);
    }

	public async markAllAsSeen(user: UserEntity) {
		return this.notificationsServiceDB.markAllAsSeen(user);
	}

	public async getNotifications(user: UserEntity,page: number) {
		return this.notificationsServiceDB.getNotifications(user,page);
	}
}
