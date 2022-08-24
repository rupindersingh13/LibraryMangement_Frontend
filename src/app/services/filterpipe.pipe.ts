import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(value: any, searchterm: any): any {
  
    if(!value){return null;}
    if(!searchterm) {return value;}
    return value.filter(function(search:any){
     return search.name.toLowerCase().indexOf(searchterm) >-1
    });
  }

}
