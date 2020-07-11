import { NotificationsServiceDB } from '../../infrastructure/databases/notifications/notifications.service';
import { NotificationDto } from './dto/notification.dto';
import { UserEntity } from '../../infrastructure/databases/entities';
import { UpdateNotificationDto } from './dto/updateNotification.dto';
export declare class NotificationsService {
    private readonly notificationsServiceDB;
    constructor(notificationsServiceDB: NotificationsServiceDB);
    createNotification(notification: NotificationDto): Promise<import("../../infrastructure/databases/entities/notifications.entity").NotificationsEntity>;
    updateNotification(notification: UpdateNotificationDto, user: UserEntity, id: string): Promise<any>;
    getUnseeNotification(user: UserEntity): Promise<number>;
    markAllAsSeen(user: UserEntity): Promise<import("typeorm").UpdateResult>;
    getNotifications(user: UserEntity, page: number): Promise<any>;
}
