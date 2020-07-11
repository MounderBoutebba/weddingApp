import { Controller, Get, NotFoundException, Options, Param, Request, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './global/decorators/roles.decorator';
import { RolesGuard } from './global/guards/roles.guard';
import { GcpFileService } from './global/services/gcp-file/gcp-file.service';
import * as fetch from 'node-fetch';
import express = require('express');

@Controller()
export class AppController {
	constructor(private readonly gcpFileService: GcpFileService) {}

	@Get('upload/company/:path')
	public async getCompany(@Param('path') path, @Response() res) {
		try {
			const url = await this.gcpFileService.getUrlFile(path);
			// @ts-ignore
			const g = await fetch(url);
			const buf = await g.buffer();
			const buffer = Buffer.from(buf);
			return res.end(buffer, 'binary');
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Get('upload/profile/:path')
	public async getProfile(@Param('path') path, @Response() res) {
		try {
			const url = await this.gcpFileService.getUrlFile(path);
			// @ts-ignore
			const g = await fetch(url);
			const buf = await g.buffer();
			const buffer = Buffer.from(buf);
			return res.end(buffer, 'binary');
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Options()
	public async getSupprtedMethods(@Response() response: Response) {
		return response;
	}

	@Get('secret')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client') // ex: client or provider or both
	secretEndpoint(@Request() req: express.Request): string {
		return 'this endpoint should be protected';
	}
}
