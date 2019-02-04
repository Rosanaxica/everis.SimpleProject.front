import { Directive, Input, HostListener, ElementRef, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appLimitTo]'
})
export class LimitToDirective {

  constructor(elRef: ElementRef) {
    this.elRef2 = elRef;
  }

  elRef2: ElementRef;

  @Input()
  maxLength: number;


  @HostListener('keyup', ['$event'])
  function() {
    //Não permitir varios 0
    this.elRef2.nativeElement.value = this.elRef2.nativeElement.value.replace('00','0');

    //Não permitir ,
    this.elRef2.nativeElement.value = this.elRef2.nativeElement.value.replace(',','');

    //Não permitir .
    this.elRef2.nativeElement.value = this.elRef2.nativeElement.value.replace('.','');

    //Remover e
    this.elRef2.nativeElement.value = this.elRef2.nativeElement.value.replace('e','');
    this.elRef2.nativeElement.value = this.elRef2.nativeElement.value.replace('E','');

    //Não permitir maior que o tamanho maximo
    if (this.elRef2.nativeElement.value != '' && Number(this.elRef2.nativeElement.value) > this.maxLength) {
      this.elRef2.nativeElement.value = this.maxLength;
    }
  }
}