import { NotificationsRepository } from './notifications.repository';
import { NotificationDto } from '../../../presentation/notifications/dto/notification.dto';
import { UserEntity } from '../entities';
import { NotificationsEntity } from '../entities/notifications.entity';
import { UpdateNotificationDto } from '../../../presentation/notifications/dto/updateNotification.dto';
import { UsersServices } from '../users/users.service';
export declare class NotificationsServiceDB {
    private readonly notificationsRepository;
    private usersServices;
    constructor(notificationsRepository: NotificationsRepository, usersServices: UsersServices);
    createNotification(notificationDto: NotificationDto): Promise<NotificationsEntity>;
    updateNotification(notificationDto: UpdateNotificationDto, user: UserEntity, id: string): Promise<any>;
    getCountUnseenNotification(user: UserEntity): Promise<number>;
    markAllAsSeen(user: UserEntity): Promise<import("typeorm").UpdateResult>;
    getNotifications(user: UserEntity, page: number): Promise<any>;
}
