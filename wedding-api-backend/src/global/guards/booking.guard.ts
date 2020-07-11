import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class BookingGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const user = request.user;
		const userRole = user.role;
		console.log(userRole);

		const params = request.params;

		console.log('in booking guard ', user.id);
		console.log('in id', params.contractId);
		const objContract = await this.checkContratPremission(params.contractId);
		console.log('in ids ', objContract['company'].user.id);
		// const hasRole = () => roles.includes(user.role);
		/* if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => roles.includes(user.role);
    return !!user && !!user.role && hasRole();*/
		return true;
	}
	async checkContratPremission(id) {
		const contractObj = ''; // await this.reservationsService.getContractById( id,'' ) ;
		return contractObj;
	}
}
