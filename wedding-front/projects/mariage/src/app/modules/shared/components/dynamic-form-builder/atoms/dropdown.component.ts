import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormFieldInterface } from '../models/dynamic-form-field-interface';

@Component({
    selector: 'app-dropdown',
    template: `
      <div [formGroup]="form">
        <div class='pb-1'>
          <span class='mat-text-muted'>{{field.label}} {{field.required? "*":""}}</span>
          <mat-form-field class='full-width'>
          <input matInput [hidden]='true'>
          <mat-select [formControlName]="field.name" [id]="field.name">
            <mat-option *ngFor="let opt of field.options" [value]="opt.key">
            {{opt.label}}
            </mat-option>
          </mat-select>
          </mat-form-field>
        </div>
      </div>
    `,
    styleUrls: ['./atoms.style.scss'],
})
export class DropDownComponent {
  @Input() field: DynamicFormFieldInterface;
  @Input() form: FormGroup;
    constructor() {
    }
}
