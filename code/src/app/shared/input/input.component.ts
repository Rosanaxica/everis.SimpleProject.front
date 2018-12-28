import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-input-container',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() myGenericLabel: string;
  @Input() myGenericErrorMessage: string;

  myGenericInput: any;

  @ContentChild(NgModel) model: NgModel;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.myGenericInput = this.model;

    if (this.myGenericInput === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel');
    }
  }

  hasSuccess(): Boolean {
    return this.myGenericInput.valid && (this.myGenericInput.dirty || this.myGenericInput.touched);
  }

  hasError(): Boolean {
    return this.myGenericInput.invalid && (this.myGenericInput.dirty || this.myGenericInput.touched);
  }


}
