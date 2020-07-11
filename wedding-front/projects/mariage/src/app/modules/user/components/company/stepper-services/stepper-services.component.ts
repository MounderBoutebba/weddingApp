import { Component, OnInit, ViewChild } from '@angular/core';
import { FirstStepComponent } from './first-step/first-step.component';

@Component({
	selector: 'app-stepper-services',
	templateUrl: './stepper-services.component.html',
	styleUrls: ['./stepper-services.component.scss']
})
export class StepperServicesComponent implements OnInit {
	@ViewChild('FirstStepComponent') firstStepComponent: FirstStepComponent;
	constructor() {}

	ngOnInit() {}
	get firstStepFrm() {
		return this.firstStepComponent ? this.firstStepComponent.form : null;
	}
	onFirstStepFormSubmitted(form: any) {}
}
