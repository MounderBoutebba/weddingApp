import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalizeFirstLetter'
})

export class CapitalizeFirstLetterPipe implements PipeTransform {
    transform(value: string): string {
        return value[0].toLocaleUpperCase() + value.slice(1);
    }
}
