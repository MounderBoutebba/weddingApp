import { CommentsServiceDB } from '../../infrastructure/databases/comments/comments.service';
import { AddCommentDto } from './dto/comment.dto';
import { ClientEntity, ProviderEntity } from '../../infrastructure/databases/entities';
import { BookingService } from '../booking/booking.service';
import { CommentsEntity } from '../../infrastructure/databases/entities/comments.entity';
import { CommentResponseDto } from './dto/commentResponse.dto';
import { CommentsResponseEntity } from '../../infrastructure/databases/entities/commentsResponse.entity';
import { CompanyService } from '../company/company.service';
export declare class CommentsService {
    private readonly commentsServiceDB;
    private readonly bookingService;
    private readonly companyService;
    constructor(commentsServiceDB: CommentsServiceDB, bookingService: BookingService, companyService: CompanyService);
    createComment(commentDto: AddCommentDto, client: ClientEntity): Promise<CommentsEntity>;
    createCommentRespose(responseDto: CommentResponseDto, provider: ProviderEntity, commentId: string): Promise<CommentsResponseEntity>;
    getCommentByCompanyId(id: string, page: number): Promise<any>;
    deleteComment(id: string, userId: string): Promise<void>;
    deleteCommentResponse(id: string, userId: string, commentId: string): Promise<import("typeorm").DeleteResult>;
    updateCommentResponse(id: string, userId: string, commentId: string, responseDto: CommentResponseDto): Promise<CommentsResponseEntity>;
    updateComment(id: string, userId: string, commentDto: AddCommentDto): Promise<CommentsEntity>;
}
