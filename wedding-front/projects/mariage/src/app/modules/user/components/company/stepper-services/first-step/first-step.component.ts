import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit, AfterViewInit {
  @Input() stepper: MatStepper;
  @ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
  showSubmitBtn = false;
  public isHandset$: Observable<boolean>;
  public form: FormGroup;
  public fields: DynamicFormFieldInterface[] = [
    {
      type: 'text',
      name: 'text',
      displayName: 'text',
      label: 'saisie votre texte ici ...',
      required: true,
      showAddFieldBtn: false,
    },
    {
      type: 'checkbox',
      name: 'Prestation',
      displayName: 'Prestation',
      label: 'Indiquez les prestation que vous proposez',
      required: true,
      showAddFieldBtn: true,
      options: [
        { key: 'f', label: 'photo', value: true},
        { key: 'v', label: 'video', value: true}
      ]
    },
    {
      type: 'checkbox',
      name: 'Photographe',
      displayName: 'Photographe',
      label: 'Indiquez les styles de photographies que vous proposez',
      required: true,
      showAddFieldBtn: true,
      options: [
        { key: 't', label: 'Traditionnel', value: true},
        { key: 'a', label: 'Artistique', value: true},
        { key: 'a', label: 'Photojournalisme', value: true},
        { key: 'a', label: 'fourth', value: true},
        { key: 'a', label: 'fifth', value: true},
      ]
    },
    {
      type: 'radio',
      name: 'Photographe radio',
      displayName: 'Photographe radio',
      label: 'Indiquez les styles de photographies que vous proposez',
      required: true,
      value: 'Photojournalisme',
      showAddFieldBtn: true,
      options: [
        { key: 't', label: 'Traditionnel', value: 'Traditionnel'},
        { key: 'a', label: 'Artistique', value: 'Artistique'},
        { key: 'b', label: 'Photojournalisme', value: 'Photojournalisme'},
        { key: 'c', label: 'fourth', value: 'fourth'},
        { key: 'd', label: 'fifth', value: 'fifth'},
      ]
    },
    {
      type: 'toggle-number',
      name: 'Séance d\'engagement',
      displayName: 'Séance d\'engagement',
      label: 'Indiquez si vous proposez la séance d\'engagement',
      required: false,
      showAddFieldBtn: false,
      numberOptions: [
        {
          value: 2,
          label: 'Durrée minimum',
          unit: 'h',
          step: 1,
        },
        {
          value: 80,
          label: 'Tarif Horaire',
          unit: '€',
          step: 10,
        },
      ]
    },
    {
      type: 'toggle-number',
      name: 'Photomaton',
      displayName: 'Photomaton',
      label: 'Indiquez si vous proposez le service photomaton',
      required: false,
      showAddFieldBtn: false,
      numberOptions: [
        {
          value: 80,
          label: 'Tarif de l\'option',
          unit: '€',
          step: 10,
        },
      ]
    },
  ];
  constructor(private breakpointObserver: BreakpointObserver,
              private readonly fb: FormBuilder) {
    this.isHandset$ = this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Small
    ]).pipe(map((result) => result.matches));
    this.buildForm();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
		this.showSubmitBtn = true;
	}
  buildForm() {
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields))
    });
  }
  onAddOption(field: DynamicFormFieldInterface) {
    console.log('field', field);
  }
  formSubmitted() {
    const formValue = this.formBuilder.form.value;
    const formIsValid: boolean = this.formBuilder.form.valid;
    if (formIsValid) {
      console.log('form value:', formValue);
    } else {
      console.log('form is not valid !!');
    }
  }
}
