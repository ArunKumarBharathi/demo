import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: string) {
    // if(args ===''){
    //   return value;
    // }
    let user=[]
    for(let val of value){
      if(val['stream']===args){
        user.push(val)
      }
    }
   
    return user;
  }

}
