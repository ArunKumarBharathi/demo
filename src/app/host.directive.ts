import { Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHost]'
})
export class HostDirective {

  @Input() set show (value: any){
    if(value){
      this.containerRef.createEmbeddedView(this.tempRef);
    }
    else{
      this.containerRef.clear()
    }
    
  }  
  constructor(public containerRef:ViewContainerRef, public tempRef:TemplateRef<any>) { }

}
