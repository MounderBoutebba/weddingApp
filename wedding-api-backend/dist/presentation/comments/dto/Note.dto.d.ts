import { ValidationOptions } from 'class-validator';
export declare function NoteDto(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
export interface Note {
    serviceQuality: number;
}
