import { UserEntity } from './user.entity';
import { CommentsEntity } from './comments.entity';
export declare class CommentsResponseEntity {
    id: string;
    private updatedAt;
    private createdAt;
    content: string;
    user: UserEntity;
    comment: CommentsEntity;
}
