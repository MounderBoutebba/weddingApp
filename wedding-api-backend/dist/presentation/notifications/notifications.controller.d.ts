import { NotificationsService } from './notifications.service';
import { UpdateNotificationDto } from './dto/updateNotification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    updateNotifications(notification: UpdateNotificationDto, id: string, req: any): Promise<{
        data: any;
    }>;
    marqueAllAsSeen(req: any): Promise<{
        data: import("typeorm").UpdateResult;
    }>;
    getCountUnseenBugs(req: any): Promise<{
        count: number;
    }>;
    getNotifications(page: number, req: any): Promise<any>;
}
