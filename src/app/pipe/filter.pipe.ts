// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'filter'
// })
// export class FilterPipe implements PipeTransform {

//   transform(value: unknown, ...args: unknown[]): unknown {
//     return null;
//   }

// }


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propName: string): any[] {
    const resultArray: any[] = [];
    if (value.length === 0 || filterString === '' || propName === '') {
      return value;
    }

    filterString = filterString.toLocaleLowerCase();
    for (const item of value) {
      if (item[propName].toLocaleLowerCase().includes(filterString)) {
        resultArray.push(item);
      }
    }

    // return items.filter(it => {
    //   return it.toLocaleLowerCase().includes(searchText);
    // }

    return resultArray;
  }
}