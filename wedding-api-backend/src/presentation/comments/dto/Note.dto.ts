import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function NoteDto(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'NoteDto',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
            const note = isJson(value) ? JSON.parse( value ) : false ;
            return note && isValidReview( note );
        },
      },
    });
  };
}

export interface Note {
    serviceQuality: number;
    /*profesionalisme: number;
    flexibility: number;
    rapportqualityPrice: number;*/
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
function isValidReview( note ): boolean {

    const keys = ['serviceQuality', 'profesionalisme', 'flexibility', 'rapportqualityPrice' ] ;
    const point = new RegExp('[0-5]{1}');
    const dataKeys = Object.keys(note) ;

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < keys.length; index++) {
        const element = keys[index];
        if ( element in note &&  /^[1-5]{1}$/.test(note[element] )) {
            continue ;
        } else {

            return false ;
        }

    }
    return true;
}
