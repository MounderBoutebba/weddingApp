import {
	Controller,
	Response,
	Param,
	HttpStatus,
	Get,
	Post,
	Body,
	UseGuards,
	Request,
	Delete,
	UseInterceptors,
	UploadedFile
} from '@nestjs/common';
import { PaiementsService } from './paiements.service';
import { CardDto } from './dto/card.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../global/guards/roles.guard';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Roles } from '../../global/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { BankAccountDto } from './dto/banck-account.dto';

@ApiTags('paiements')
@ApiBearerAuth()
@Controller('paiements')
export class PaiementsController {
	constructor(private readonly paiementsService: PaiementsService) {}

	@Post('/customers/:email')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client', 'admin', 'provider')
	public async createCustomer(@Param('email') email: string, @Response() res) {
		const customerCreated = await this.paiementsService.addPaiementAccount(email);
		return res.status(HttpStatus.CREATED).json(customerCreated);
	}

	@Get('/customers/:email')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('admin')
	public async getCustomer(@Param('email') email: string, @Response() res) {
		const customerCreated = await this.paiementsService.getPaiementAccount(email);
		if (!customerCreated) {
			return res.status(HttpStatus.NOT_FOUND).json({ message: 'User dont have paiements infos' });
		}
		return res.status(HttpStatus.CREATED).json(customerCreated);
	}

	@Post('/customers/:email/card')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client', 'admin')
	public async addCardPaiement(@Param('email') email: string, @Body() cardDto: CardDto, @Response() res) {
		const cardAdded = await this.paiementsService.addCardToPaiementAccount(email, cardDto);
		return res.status(HttpStatus.CREATED).json(cardAdded);
	}

	@Get('/customers/:email/cards')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client', 'admin')
	public async getAllCardsPaiement(@Param('email') email: string, @Response() res, @Request() req) {
		if (req.role !== 'admin' && req.user.email !== email) {
			return res.status(HttpStatus.UNAUTHORIZED).json('UNAUTHORIZED');
		} else {
			const cards = await this.paiementsService.getAllCardsPaiement(email);
			return res.status(HttpStatus.OK).json(cards);
		}
	}

	@Post('/accounts/:email')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	public async addAccountPaiementProvider(
		@Param('email') email: string,
		@Body() bankAccount: BankAccountDto,
		@Request() req,
		@Response() res
	) {
		if (req.role !== 'admin' && req.user.email !== email) {
			return res.status(HttpStatus.UNAUTHORIZED).json('UNAUTHORIZED');
		} else {
			const accountCreated = await this.paiementsService.addProviderPaiementAccount(email, bankAccount);
			return res.status(HttpStatus.CREATED).json(accountCreated);
		}
	}
	@Get('/accounts/:email')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	public async getAccountPaiementProvider(@Param('email') email: string, @Request() req, @Response() res) {
		if (req.role !== 'admin' && req.user.email !== email) {
			return res.status(HttpStatus.UNAUTHORIZED).json('UNAUTHORIZED');
		} else {
			const accountCreated = await this.paiementsService.getProviderPaiementAccount(email);
			return res.status(HttpStatus.CREATED).json(accountCreated);
		}
	}

	@Post('/accounts/identityverification/:email')
	@UseInterceptors(FileInterceptor('file'))
	@ApiConsumes('multipart/form-data')
	@Roles('provider', 'admin')
	@UseGuards(AuthGuard(), RolesGuard)
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				identityPrincipale: {
					type: 'string',
					format: 'binary'
				},
				identitySecondary: {
					type: 'string',
					format: 'binary'
				},
				email: {
					type: 'string'
				}
			}
		}
	})
	public async uploadFile(
		@UploadedFile() identityPrincipale,
		@UploadedFile() identitySecondary,
		@Body() modelData,
		@Response() res,
		@Request() req
	) {
		if (req.role !== 'admin' && req.user.email !== modelData.email) {
			return res.status(HttpStatus.UNAUTHORIZED);
		} else {
			const identityverification = await this.paiementsService.identityVerificationPaiementAccount(
				req.user.email,
				identityPrincipale,
				identitySecondary
			);
			return res.status(HttpStatus.CREATED).json(identityverification);
		}
	}

	/**
	 * delete card by finger print card
	 */
	@Delete('/customers/:email/card/:cardId')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client', 'provider', 'admin')
	public async deleteClientCard(
		@Param('email') email: string,
		@Param('cardId') cardId: string,
		@Request() req,
		@Response() res
	) {
		if (req.role !== 'admin' && req.user.email !== email) {
			return res.status(HttpStatus.UNAUTHORIZED);
		} else {
			const cards = await this.paiementsService.deleteCard(email, cardId);
			return res.status(HttpStatus.OK).json(cards);
		}
	}
}
