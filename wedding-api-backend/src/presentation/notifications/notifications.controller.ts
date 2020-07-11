import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationDto } from './dto/notification.dto';
import { UpdateNotificationDto } from './dto/updateNotification.dto';

@ApiBearerAuth()
@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

/*	@Post() // test purpose only notification will be created on other actions
	@UseGuards(AuthGuard())
	public async addComment(@Body() notification: NotificationDto, @Request() req) {
		try {
			const user = req.user;
			const data=await this.notificationsService.createNotification(notification,user);
			return {data};
		} catch (e) {
			throw e;
		}
	}*/


	@Patch(':id')
	@UseGuards(AuthGuard())
	public async updateNotifications(
		@Body() notification: UpdateNotificationDto,
		@Param('id')id: string,
		@Request() req) {
		try {
			const user = req.user;
			const data = await this.notificationsService.updateNotification(notification,user,id);
			return { data };
		} catch (e) {
			throw e;
		}
	}

	@Put('mark-all-seen')
	@UseGuards(AuthGuard())
	@HttpCode(HttpStatus.NO_CONTENT)
	public async marqueAllAsSeen(@Request() req) {
		try {
			const user = req.user;
			const data = await this.notificationsService.markAllAsSeen(user);
			return { data };
		} catch (e) {
			throw e;
		}
	}

	@Get('unseen')
	@UseGuards(AuthGuard())
	public async getCountUnseenBugs(@Request() req) {
		try {
			const user = req.user;
			const count = await this.notificationsService.getUnseeNotification(user);
			return { count };
		} catch (e) {
			throw e;
		}
	}

	@Get()
	@UseGuards(AuthGuard())
	public async getNotifications(@Query('page') page = 0, @Request() req) {
		try {
			const user = req.user;
			const data = await this.notificationsService.getNotifications(user, page);
			return data;
		} catch (e) {
			throw e;
		}
	}


}
