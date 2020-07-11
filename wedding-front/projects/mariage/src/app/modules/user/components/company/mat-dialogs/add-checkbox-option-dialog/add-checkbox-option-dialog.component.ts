import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-checkbox-option-dialog',
  templateUrl: './add-checkbox-option-dialog.component.html',
  styleUrls: ['./add-checkbox-option-dialog.component.scss']
})
export class AddCheckboxOptionDialogComponent implements OnInit {
  public isHandset$: Observable<boolean>;
  public form: FormGroup;
  public description = 'Add a New Option';
  public label = `Indiquez le nom de l'option`;
  constructor(public dialogRef: MatDialogRef<AddCheckboxOptionDialogComponent>,
              @Optional()  @Inject(MAT_DIALOG_DATA) public data: any,
              private readonly fb: FormBuilder,
              private readonly breakpointObserver: BreakpointObserver) {
                this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
                .pipe(map(result => result.matches));
                this.buildForm();
              }

  ngOnInit() {
    this.description = this.data.description;
    this.label = this.setLabel(this.description);
  }
  setLabel(description: string): string {
    switch (description) {
      case `Style de photographie`:
      case `Style de vidéographie`:
        return `Ajouter un style`;
      case `Techniques utilisés`:
        return `Ajouter une technique`;
      case `Spécialités`:
        return `Ajouter une spécialité`;
      case `Instruments`:
        return `Ajouter un Instrument`;
      case `Appareils`:
        return `Ajouter une appareil`;
      case `Objectifs`:
        return `Ajouter un objectif`;
      case `Accessoires`:
        return `Ajouter un accessoire`;
      case `Types de réceptions`:
        return `Ajouter un type de réception`;
      case `Sports maîtrisés`:
        return `Ajouter un type de sport`;
      case `Danses maîtrisées`:
        return `Ajouter un type de danse`;
      case `cuisine specialties`:
        return `Ajouter une spécialité`;
      default:
        return `Indiquez le nom de l'option`;
    }
  }
  buildForm() {
    this.form = this.fb.group({
      label: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(3)
      ])],

    });
  }
  cancel() {
    this.data = {cancel: true};
    this.dialogRef.close(this.data);
  }
  save() {
    if (this.form.valid) {
      // tslint:disable-next-line:no-string-literal
      const label = this.form.controls['label'].value;
      const key = String(label).replace(' ', '');
      const option = {key, label, value: true};
      this.data = {save: true, option};
      this.dialogRef.close(this.data);
    }
  }


}
