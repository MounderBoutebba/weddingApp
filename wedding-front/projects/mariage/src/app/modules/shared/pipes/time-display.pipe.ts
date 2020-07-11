import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeDisplay'
})

export class TimeDisplayPipe implements PipeTransform {
    transform(value: number): string {
        if (value < 10) {
            return '0' + value;
        } else {
            return String(value);
        }
    }
}