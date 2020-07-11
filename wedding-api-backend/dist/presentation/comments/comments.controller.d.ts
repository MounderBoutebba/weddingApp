import { CommentsService } from './comments.service';
import { AddCommentDto } from './dto/comment.dto';
import { CommentResponseDto } from './dto/commentResponse.dto';
export declare class CommentsController {
    private readonly commentService;
    constructor(commentService: CommentsService);
    addComment(comment: AddCommentDto, req: any, res: any): Promise<any>;
    addCommentResponse(response: CommentResponseDto, id: string, req: any, res: any): Promise<any>;
    getComment(id: string, page: number, req: any): Promise<any>;
    deleteComment(id: string, req: any, res: any): Promise<any>;
    updateComment(comment: AddCommentDto, id: string, req: any, res: any): Promise<any>;
    deleteCommentResponse(id: string, commentId: string, req: any, res: any): Promise<any>;
    updateCommentResponse(responseDto: CommentResponseDto, id: string, commentId: string, req: any, res: any): Promise<any>;
}
