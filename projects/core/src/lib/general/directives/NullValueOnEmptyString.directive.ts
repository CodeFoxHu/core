import { NgControl } from '@angular/forms';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[codeFoxNullValueOnEmptyString]'
})
export class NullValueOnEmptyStringDirective {
  constructor(private el: ElementRef, private control: NgControl) {
    alert(1);
  }

  @HostListener('blur', ['$event.target'])
  blur(target: HTMLInputElement): void {
    console.log("BLUR HAPPANED");
    this.control.viewToModelUpdate((target.value === '') ? null : target.value);
  }
}
