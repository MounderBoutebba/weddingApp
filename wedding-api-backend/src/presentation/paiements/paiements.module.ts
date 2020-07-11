import { Module } from '@nestjs/common';
import { PaiementsService } from './paiements.service';
import { PaiementsController } from './paiements.controller';

@Module({
	providers: [PaiementsService],
	controllers: [PaiementsController]
})
export class PaiementsModule {}
