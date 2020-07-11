import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberLabelDisplay'
})

export class NumberLabelDisplayPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/_/g, ' ');
    }
}
