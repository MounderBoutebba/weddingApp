import { ForbiddenException, Injectable } from '@nestjs/common';
import { CommentsServiceDB } from '../../infrastructure/databases/comments/comments.service';
import { AddCommentDto } from './dto/comment.dto';
import { ClientEntity, ProviderEntity } from '../../infrastructure/databases/entities';
import { BookingService } from '../booking/booking.service';
import { CommentsEntity } from '../../infrastructure/databases/entities/comments.entity';
import { CommentResponseDto } from './dto/commentResponse.dto';
import { CommentsResponseEntity } from '../../infrastructure/databases/entities/commentsResponse.entity';
import { CompanyService } from '../company/company.service';

@Injectable()
export class CommentsService {

    constructor(private readonly commentsServiceDB: CommentsServiceDB,
                private readonly bookingService:BookingService,
                private readonly companyService:CompanyService) {
    }

    public async createComment(commentDto: AddCommentDto, client: ClientEntity) {
        const reservation = await this.bookingService.findBookingPsql(commentDto.reservationId);
        const comment = new CommentsEntity();
        comment.reservation = reservation;
        comment.client = client;
        comment.content = commentDto.content;
        comment.flexibilite = commentDto.flexibilite;
        comment.professionnalisme = commentDto.professionnalisme;
        comment.qualiteService = commentDto.qualiteService;
        comment.rapportQualitePrix = commentDto.rapportQualitePrix;
        comment.totalNotes = (comment.flexibilite + comment.professionnalisme + comment.qualiteService + comment.rapportQualitePrix) / 4;
        comment.company = reservation.company;
        return this.commentsServiceDB.save(comment);
    }

    public async createCommentRespose(responseDto: CommentResponseDto, provider: ProviderEntity, commentId: string) {
        const comment = await this.commentsServiceDB.find(commentId);
        const company = await comment.company;
        if (company.id !== (await provider.company).id) {
            throw new ForbiddenException();
        }
        const response = new CommentsResponseEntity();
        response.user = provider;
        response.content = responseDto.content;
        response.comment = comment;

        return this.commentsServiceDB.createResponse(response);

    }


    public async getCommentByCompanyId(id: string,page:number) {
        return await this.commentsServiceDB.findByCompany(id,page);
    }

    public async deleteComment(id: string, userId: string) {
        return this.commentsServiceDB.delete(id, userId);
    }

    async deleteCommentResponse(id: string, userId: string, commentId: string) {
        return this.commentsServiceDB.deleteResponse(id, userId, commentId);
    }

    async updateCommentResponse(id: string, userId: string, commentId: string, responseDto: CommentResponseDto) {
        return this.commentsServiceDB.updateResponse(id, userId, commentId,responseDto);
    }

	async updateComment(id: string, userId: string, commentDto: AddCommentDto) {
		return this.commentsServiceDB.updateComment(id, userId, commentDto);
	}
}
