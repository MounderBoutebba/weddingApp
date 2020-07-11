import { IsBoolean} from 'class-validator';

export abstract class VerifiedDto {
	@IsBoolean()
	public verifiedProvider: boolean;
}
