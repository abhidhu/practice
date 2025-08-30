import { Pipe, PipeTransform } from "@angular/core";


@Pipe( {
  name: 'temp',
  standalone: true,
  pure: false
} )
export class TempraturePipe implements PipeTransform {

  transform( value: string | number | null, inputType: 'cel' | 'fah', outptType?: 'cel' | 'fah' ) {
    let val: number;
    if ( !value ) {
      return value;
    }
    if ( typeof value === 'string' ) {
      val = parseFloat( value );
    }
    else {
      val = value;
    }

    let outPutTemp: number;
    if ( inputType == 'cel' && outptType === 'fah' ) {
      outPutTemp = val * ( 9 / 5 ) + 32;
    } else if ( inputType == 'fah' && outptType == 'cel' ) {
      outPutTemp = ( val - 32 ) * ( 5 / 9 );
    }
    else {
      outPutTemp = val;
    }

    let symbol: '°F' | '°c';
    if ( !outptType ) {
      symbol = inputType === 'cel' ? '°c' : '°F';
    }
    else {
      symbol = outptType === 'cel' ? '°c' : '°F';
    }
    return `${ outPutTemp.toFixed(2) } ${ symbol }`;
  }
}