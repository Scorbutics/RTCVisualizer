import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(arrayToGroup: any[], args: string): any[] {
    const fields = args.split('.');
    
    return arrayToGroup.sort((itemA, itemB) => {
      let keyA = itemA;
      let keyB = itemB;
      fields.forEach((value) => keyA = keyA[value]);
      fields.forEach((value) => keyB = keyB[value]);
      if(keyA == keyB) {
        return 0;
      }

      return keyA > keyB ? 1 : -1;
    });
  }

}
