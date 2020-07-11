import { UserEntity } from './user.entity';
export declare class NotificationsEntity {
    id: string;
    private updatedAt;
    private createdAt;
    content: string;
    url: string;
    seen: boolean;
    user: UserEntity;
}
