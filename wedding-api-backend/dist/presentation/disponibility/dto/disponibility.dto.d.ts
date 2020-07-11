import { DiponibilityType } from '../../../infrastructure/databases/entities/disponibility.entity';
export declare class CreateDisponibilityDto {
    start: Date;
    end: Date;
    type: DiponibilityType;
}
