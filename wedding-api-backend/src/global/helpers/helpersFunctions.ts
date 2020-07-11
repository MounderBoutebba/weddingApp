import { BadRequestException } from '@nestjs/common' ;

/**
 * @param obj elastic search object for provider
 * @param prifix Array type of metier prifix ( ex: photopgrapg_ ) ;
 */
export function mapEsObj( obj , prifix: string[]) {

    const keyValues = Object.keys(obj).map(key => {

        const regex = new RegExp(`(${prifix.join('|')})`,'g') ;
        const newKey = key.replace(regex, '');
        return { [newKey]: obj[key] };

      });
      return Object.assign({}, ...keyValues);
}

export function checkAndConvertDate( strDate: Date ): number {

	try {
    const parsedDate =  Date.parse( strDate.toString() ) || 0;
    console.log( parsedDate ) ;
    return parsedDate ;
	} catch (error) {
		throw new BadRequestException( 'NOT_VALID_DATE' );
	}

}