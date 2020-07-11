import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';

@Component({
  selector: 'app-add-radio-option-dialog',
  templateUrl: './add-radio-option-dialog.component.html',
  styleUrls: ['./add-radio-option-dialog.component.scss']
})
export class AddRadioOptionDialogComponent implements OnInit {
  public isHandset$: Observable<boolean>;
  public form: FormGroup;
  public description = 'Add a New Option';
  public stringLabel = `Indiquez le type de l'option`;
  public numberLabel = `days`;
  public fieldType;
  FieldTypeEnum = FieldTypeEnum;
  dialogContentHeight = '15vh';
  constructor(public dialogRef: MatDialogRef<AddRadioOptionDialogComponent>,
              @Optional()  @Inject(MAT_DIALOG_DATA) public data: any,
              private readonly fb: FormBuilder,
              private readonly breakpointObserver: BreakpointObserver) {
                this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
                .pipe(map(result => result.matches));
              }

  ngOnInit() {
    this.fieldType = this.data.type;
    this.description = this.data.description;
    this.setLabel(this.description);
    this.buildForm();
  }
  setLabel(description: string) {
    if (this.fieldType === FieldTypeEnum.RADIO_STRING) {
      if (description === 'Type de lieu') {
        this.stringLabel = `Indiquez le type de votre lieu`;
      } else if (description === 'Situation géographique') {
        this.stringLabel = `Indiquez la situation géographique de votre lieu`;
      }
    } else if (this.fieldType === FieldTypeEnum.RADIO) {
      if (description === `capacité d'invités`) {
        this.numberLabel = `personnes`;
      } else if (description === 'Élèves simultanés') {
        this.numberLabel = `personnes`;
      }
    }
  }
  buildForm() {
    if (this.fieldType === this.FieldTypeEnum.RADIO) {
      this.form = this.fb.group({
        value: ['1', Validators.compose([
          Validators.required,
        ])],
      });
    } else if (this.fieldType === this.FieldTypeEnum.RADIO_STRING) {
      this.form = this.fb.group({
        value: ['', Validators.compose([
          Validators.required,
        ])],
      });
    }

  }
  cancel() {
    this.data = {cancel: true};
    this.dialogRef.close(this.data);
  }
  save() {
    if (this.form.valid) {
      if (this.fieldType === FieldTypeEnum.RADIO) {
        // tslint:disable-next-line:no-string-literal
          const value = +this.form.controls['value'].value;
          const key = String(value);
          const option = {key, label: '', value};
          this.data = {save: true, option};
          this.dialogRef.close(this.data);
      } else if (this.fieldType === FieldTypeEnum.RADIO_STRING) {
          // tslint:disable-next-line:no-string-literal
          const value = this.form.controls['value'].value;
          const key = String(value).replace(/ /g, '_');
          const option = {key, label: value, value: key};
          this.data = {save: true, option};
          this.dialogRef.close(this.data);
      }

    }
  }


}
