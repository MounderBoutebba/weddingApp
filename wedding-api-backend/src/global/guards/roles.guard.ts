import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { customLogger } from '../../config/logging';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());
		customLogger('CanActivate', {
			action: 'get roles',
			userRoles: roles
		});
		if (!roles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		const hasRole = () => roles.includes(user.role);
		customLogger('hasRole', {
			action: 'has  roles',
			userHasRole: hasRole
		});

		customLogger('Return can Activate', {
			action: 'Return can Activate',
			userHasRole: !!user && !!user.role && hasRole()
		});
		return !!user && !!user.role && hasRole();
	}
}
