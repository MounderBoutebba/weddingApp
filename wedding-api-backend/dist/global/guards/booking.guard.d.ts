import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class BookingGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
    checkContratPremission(id: any): Promise<string>;
}
