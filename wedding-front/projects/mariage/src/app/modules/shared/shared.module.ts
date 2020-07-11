import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from './ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CheckBoxComponent,
  DropDownComponent,
  DynamicFormBuilderComponent,
  FieldBuilderComponent,
  NumberComponent,
  RadioComponent,
  TextBoxComponent,
  ToggleComponent
} from './components/dynamic-form-builder';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { CompanyLabelPipe } from './pipes/company-label.pipe';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ToggleNumberResultComponent } from './components/dynamic-form-builder/atoms/toggle-number-result/toggle-number-result.component';
import { NumberLabelDisplayPipe } from './pipes/number-label-display.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { ToggleButtonComponent } from './components/button-toggle/button-toggle.component';
import { CapitalizeFirstLetterPipe } from './pipes/captilize-first-letter.pipe';
// tslint:disable-next-line:max-line-length
import { ToggleNumberRadioListComponent } from './components/dynamic-form-builder/atoms/toggle-number-radio-list/toggle-number-radio-list.component';
import { ToggleNumberListComponent } from './components/dynamic-form-builder/atoms/toggle-number-list/toggle-number-list.component';
import { CheckboxNumberListComponent } from './components/dynamic-form-builder/atoms/checkbox-number-list/checkbox-number-list.component';
import { PlusMinusComponent } from './components/plus-minus/plus-minus.component';
import { MatRippleModule } from '@angular/material/core';
import { ToggleVoituresListComponent } from './components/dynamic-form-builder/atoms/toggle-voitures-list/toggle-voitures-list.component';
import { NumberTimeComponent } from './components/dynamic-form-builder/atoms/number  time/number-time.component';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { ToggleProductsListComponent } from './components/dynamic-form-builder/atoms/toggle-products-list/toggle-products-list.component';
import { ToggleMajorationComponent } from './components/dynamic-form-builder/atoms/toggle-majoration/toggle-majoration.component';
import { ToggleProduitsAccessoiresComponent } from './components/dynamic-form-builder/atoms/toggle-produits-accessoires/toggle-produits-accessoires.component';
import { TogglePrestationInvitesComponent } from './components/dynamic-form-builder/atoms/toggle-prestation-invites/toggle-prestation-invites.component';
import { WidgetModule } from '../widget/widget.module';
import { TimeDisplayPipe } from './pipes/time-display.pipe';
import { AngularIbanModule } from 'angular-iban';
import { Section1Component } from './components/sections/section1/section1.component';
import { Section2Component } from './components/sections/section2/section2.component';
import { Section3Component } from './components/sections/section3/section3.component';
import { Section6Component } from './components/sections/section6/section6.component';
import { LoginSection1Component } from './components/sections/section1/login-section1/login-section1.component';
import { SignupSection1Component } from './components/sections/section1/signup-section1/signup-section1.component';
import { Section4Component } from './components/sections/section4/section4.component';
import { Section5Component } from './components/sections/section5/section5.component';
import { MarkdownModule } from 'ngx-markdown';
const formBuilderComponents = [
  DynamicFormBuilderComponent,
  FieldBuilderComponent,
  CheckBoxComponent,
  DropDownComponent,
  TextBoxComponent,
  RadioComponent,
  ToggleComponent,
  NumberComponent,
  NumberTimeComponent,
  ToggleNumberRadioListComponent,
  ToggleNumberListComponent,
  CheckboxNumberListComponent,
  ToggleVoituresListComponent,
  ToggleProductsListComponent,
  ToggleMajorationComponent,
  ToggleProduitsAccessoiresComponent,
  TogglePrestationInvitesComponent,
  ];
const pipes = [
    CompanyLabelPipe,
    NumberLabelDisplayPipe,
    CapitalizeFirstLetterPipe,
    TimeDisplayPipe,
];
const directives = [
  AutofocusDirective
];
const sections = [
  Section1Component,
  Section2Component,
  Section3Component,
  Section4Component,
  Section5Component,
  Section6Component,
  LoginSection1Component,
  SignupSection1Component,
];
@NgModule({
	declarations: [
    [...formBuilderComponents],
    [...pipes],
    [...directives],
    [...sections],
    ToggleNumberResultComponent,
    FooterComponent,
    ToggleButtonComponent,
    PlusMinusComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    TranslateModule.forChild({}),
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    AgmSnazzyInfoWindowModule,
    MatRippleModule,
    DigitOnlyModule,
    AngularIbanModule,
    MarkdownModule.forChild()
  ],
  exports: [
    PlusMinusComponent,
    ToggleButtonComponent,
    FooterComponent,
    CommonModule,
    UiModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormBuilderComponent,
    AgmCoreModule,
    MarkdownModule,
    AgmSnazzyInfoWindowModule,
    [...formBuilderComponents],
    [...pipes],
    [...sections],
    DigitOnlyModule,
    AngularIbanModule
  ]
})
export class SharedModule {}
