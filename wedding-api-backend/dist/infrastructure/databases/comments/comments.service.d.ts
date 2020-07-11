import { CommentsRepository } from './comments.repository';
import { CommentsEntity } from '../entities/comments.entity';
import { CommentsResponseEntity } from '../entities/commentsResponse.entity';
import { CommentsResponseRepository } from './commentsResponse.repository';
import { CompanyRepository } from '../company/company.repository';
import { CommentResponseDto } from '../../../presentation/comments/dto/commentResponse.dto';
import { AddCommentDto } from '../../../presentation/comments/dto/comment.dto';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
export declare class CommentsServiceDB {
    private readonly companyRepository;
    private readonly commentsRepository;
    private readonly commentsResponseRepository;
    private elasticsearchService;
    constructor(companyRepository: CompanyRepository, commentsRepository: CommentsRepository, commentsResponseRepository: CommentsResponseRepository, elasticsearchService: ElasticsearchService);
    save(comment: CommentsEntity): Promise<CommentsEntity>;
    find(id: string): Promise<CommentsEntity>;
    createResponse(response: CommentsResponseEntity): Promise<CommentsResponseEntity>;
    findByCompany(companyId: string, page: number): Promise<any>;
    delete(id: string, userId: string): Promise<void>;
    private addVotesToCompany;
    private removeVotesFromCompany;
    deleteResponse(id: string, userId: string, commentId: string): Promise<import("typeorm").DeleteResult>;
    private findResponse;
    updateResponse(id: string, userId: string, commentId: string, responseDto: CommentResponseDto): Promise<CommentsResponseEntity>;
    updateComment(id: string, userId: string, commentDto: AddCommentDto): Promise<CommentsEntity>;
}
