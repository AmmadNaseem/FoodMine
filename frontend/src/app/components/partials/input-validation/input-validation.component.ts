import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
  required:'Should not be empty',
  email:'Email is not valid',
  minlength: 'Field is too short',
  notMatch: 'Password and Confirm does not match'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit,OnChanges {
  @Input() control!:AbstractControl;//ABSTRACT CONTROL IS THE SAME TYPE OF ANGULAR FORM CONTROL.

  @Input() showErrorsWhen:boolean = true;

  errorMessages: string[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit(): void {

    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });

    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    });
  }

  checkValidation(){

    const errors = this.control.errors;

    if(!errors){
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors); //this will get all the key of error.
          // ['required','email']
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]); //this will map validator keys with error and make array of errorMessages.

  }

}
