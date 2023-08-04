import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'datetimeFormat'
})
export class DatetimeFormatPipe implements PipeTransform {

  transform(value: any, format: string = 'yyyy-MM-dd HH:mm:ss'): string {
    if (value instanceof Timestamp) {
      value = value.toDate(); // Convert Timestamp to Date object
    }

    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, format + ' HH:mm:ss')!;
  }


}
