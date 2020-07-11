import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormFieldInterface } from '../models/dynamic-form-field-interface';

// text,email,tel,textarea,password,
@Component({
    selector: 'app-textbox',
    template: `
      <div [formGroup]="form">
      <div class="pb-1" *ngIf="!field.multiline">
          <mat-form-field class='full-width'>
            <input matInput [attr.type]="field.type" [id]="field.name" [name]="field.name" [formControlName]="field.name"
            placeholder='{{field.displayName|lowercase|translate|capitalizeFirstLetter}} {{field.required? "*":""}}'>
          </mat-form-field>
        </div>
        <div class="pb-1" *ngIf="field.multiline">
          <mat-form-field class='full-width'>
            <input matInput [attr.type]="field.type" [id]="field.name" [name]="field.name" [formControlName]="field.name"
            placeholder='{{field.displayName|lowercase|translate|capitalizeFirstLetter}} {{field.required? "*":""}}'>
            <textarea matInput [formControlName]="field.name" [id]="field.name" [ngClass]="{'mat-text-warn': isDirty && !isValid}"
            rows="9" class="form-control" [placeholder]="field.displayName|lowercase|translate|capitalizeFirstLetter"></textarea>
          </mat-form-field>
        </div>
      </div>
    `,
    styleUrls: ['./atoms.style.scss'],
})
export class TextBoxComponent {
    @Input() field: DynamicFormFieldInterface;
    @Input() form: FormGroup;
    @Input() formPurpose: string;
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onDeleteFieldBtnClicked: EventEmitter<any>;
    get isValid() { if (this.form.controls[this.field.name]) {return this.form.controls[this.field.name].valid; } }
    get isDirty() { if (this.form.controls[this.field.name]) {return this.form.controls[this.field.name].dirty; } }
    constructor() {
      this.onDeleteFieldBtnClicked = new EventEmitter<any>();
    }
}
