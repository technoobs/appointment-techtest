import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appErrorlight]'
})
export class ErrorlightDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.color = 'red';
    el.nativeElement.style.fontSize = '15px';
    el.nativeElement.style.fontWeight = 'bold';
  }

}
