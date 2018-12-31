import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(arrayToGroup: any[], args: string): any[] {
    const fields = args.split('.');
    var groups = arrayToGroup.reduce(function(accu, item) {
        let key = item;
        fields.forEach((value) => key = key[value]);
        key = key || "";
		    accu[key] = accu[key] || [];
        accu[key].push(item);
        return accu;
    }, {});
    const result = Object.keys(groups).reduce((accu, key) => {
		accu.push({key: key, value: groups[key]});
		return accu;
	}, []);
	return result;
  }

}
