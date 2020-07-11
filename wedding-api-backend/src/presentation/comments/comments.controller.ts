import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Request, Response, UseGuards, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AddCommentDto } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../global/guards/roles.guard';
import { Roles } from '../../global/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentResponseDto } from './dto/commentResponse.dto';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
	constructor(private readonly commentService: CommentsService) {}

	@Post()
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	public async addComment(@Body() comment: AddCommentDto, @Request() req, @Response() res) {
		try {
			const client = req.user;
			const data = await this.commentService.createComment(comment,client);
			return res.status(HttpStatus.CREATED).json({ data });
		} catch (e) {
			throw e;
		}
	}

	@Post(':id/response')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider')
	public async addCommentResponse(@Body() response: CommentResponseDto, @Param('id')id: string, @Request() req, @Response() res) {
		try {
			const provider = req.user;
			const data = await this.commentService.createCommentRespose(response, provider,id);
			return res.status(HttpStatus.CREATED).json({ data });
		} catch (e) {
			throw e;
		}
	}

	@Get('company/:id')
	public async getComment(@Param('id')id: string, @Query('page')page: number = 1, @Request() req) {
		try {
			return await this.commentService.getCommentByCompanyId(id,page);
		} catch (e) {
			throw e;
		}
	}

	@Delete(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	public async deleteComment(@Param('id')id: string, @Request() req, @Response() res) {
		try {
			const user = req.user;
			const data = await this.commentService.deleteComment(id, user.id);
			return res.status(HttpStatus.CREATED).json({ data });
		} catch (e) {
			throw e;
		}
	}

	@Put(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	public async updateComment(@Body() comment: AddCommentDto,
							   @Param('id')id: string,
							   @Request() req, @Response() res) {
		try {
			const user = req.user;
			const data = await this.commentService.updateComment(id, user.id,comment);
			return res.status(HttpStatus.CREATED).json({ data });
		} catch (e) {
			throw e;
		}
	}

	@Delete(':commentId/response/:id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider')
	public async deleteCommentResponse(@Param('id')id: string,
									   @Param('commentId')commentId: string,
									   @Request() req, @Response() res) {
		try {
			const user = req.user;
			const data = await this.commentService.deleteCommentResponse(id, user.id, commentId);
			return res.status(HttpStatus.NO_CONTENT).json({ data });
		} catch (e) {
			throw e;
		}
	}

	@Put(':commentId/response/:id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider')
	public async updateCommentResponse(@Body() responseDto:CommentResponseDto,
									   @Param('id')id: string,
									   @Param('commentId')commentId: string,
									   @Request() req, @Response() res) {
		try {
			const user = req.user;
			const data = await this.commentService.updateCommentResponse(id, user.id, commentId,responseDto);
			return res.status(HttpStatus.CREATED).json({ data });
		} catch (e) {
			throw e;
		}
	}

}
