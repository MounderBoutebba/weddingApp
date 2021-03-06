import { Strategy } from 'passport-jwt';
import { UsersService } from '../../presentation/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => typeof Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(payload: any): Promise<import("../../infrastructure/databases/entities").UserEntity>;
}
export {};
