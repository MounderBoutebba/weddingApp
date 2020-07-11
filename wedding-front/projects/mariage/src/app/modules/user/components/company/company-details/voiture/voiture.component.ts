import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { AuthStore } from '../../../../../store/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { CategoryLabelEnum } from '../category-label.enum';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { VoitureService } from './voiture.service';
import { newBusCriteres } from '../bus/bus.interface';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.scss']
})
export class VoitureComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	@ViewChild('busComponent') busComponent: any;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
  showBusComponent = false;
  busInitCriteres: any = newBusCriteres;
  public form: FormGroup;
	public isBus: boolean;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
	constructor(private readonly voitureService: VoitureService,
             private readonly authStore: AuthStore,
             @Inject(PLATFORM_ID) private readonly platformId: object,
             private readonly toastrService: ToastrService,
             private readonly authService: AuthService,
             private readonly translateService: TranslateService,
             private readonly router: Router,
             private readonly dialogService: DialogService,
             private readonly route: ActivatedRoute,
             private readonly companyService: CompanyService) {
}

  ngOnInit() {
    // afficher les input par type
    this.currentEmail = this.route.snapshot.paramMap.get('email');
    this.isBus = this.categories.includes(CategoryLabelEnum.BUS);
    this.initBusCriteres(this.isBus);
    this.criteres = this.voitureService.selectCriteres(this.criteres, CategoryLabelEnum.VOITURE);
    console.log('selected criteres', this.criteres);
    this.criteres = this.voitureService.removePrefix(this.criteres, CategoryLabelEnum.VOITURE);
    this.parsedCriteres = this.voitureService.initFormValuesWithVoitureCriteria(this.criteres);
    this.buildForm();
  }
  initBusCriteres(isBus: boolean) {
    if (isBus) {
      this.busInitCriteres = this.criteres;
      this.showBusComponent = true;
    }
  }
  ngAfterViewInit() {
    this.showSubmitBtn = true;
  }
  buildForm() {
    this.showForm = false;
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.parsedCriteres))
    });
    this.showForm = true;
  }
  async onAddOption(field: DynamicFormFieldInterface) {
    this.parsedCriteres = await this.voitureService.addOption(this.parsedCriteres, field);
    this.buildForm();
    this.formBuilder.ngOnInit();
    this.formBuilder.appFieldBuilderComponent.checkBoxChanged(field);
  }
  checkBoxChangesAreChecked(): boolean {
    let checkBoxIsRequired = true;
    this.parsedCriteres.forEach( field => {
      if (field.type === FieldTypeEnum.CHECK_BOX || field.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
        checkBoxIsRequired = checkBoxIsRequired
                      && !!field.options.filter( opt => opt.value === true ).length;
      }
    });
    return checkBoxIsRequired;
  }
  formSubmitted() {
    const formIsValid: boolean = this.formBuilder.form.valid;
    if (this.checkBoxChangesAreChecked()) {
      if (formIsValid) {
        this.formWasSubmitted = true;
        this.updateCurrentStep();
        if (this.primaryComponent) {
          this.patchService('primary');
        } else {
          this.patchService('secondary');
        }
      } else {
        this.dialogService.openErrorDialog('form is not valid');
      }
    } else {
      this.dialogService.openErrorDialog('please fill the missing information');
    }
  }
  updateCurrentStep() {
    const currentEmail = this.route.snapshot.paramMap.get('email');
    this.companyService.findCompanyByEmail(currentEmail).subscribe( company => {
      company.currentStep = 'company-pricing';
      this.companyService.updateCurrentStep(company.id, currentEmail, company).subscribe( res => {
      });
    });
  }
  patchService(purpose: string) {
    const formValue = this.formBuilder.form.value;
    const dataObject = this.voitureService.mapFormValueToVoitureCriteria(formValue, this.criteres);
    console.log('data object', dataObject);
    switch (purpose) {
      case 'primary':
        //#region
        this.companyService.putServiceByEmailAndService(CategoryLabelEnum.VOITURE,
        this.currentEmail,
        dataObject).subscribe(
          (data) => {
            this.formWasSubmitted = true;
            if (this.showBusComponent) {
              this.busComponent.formSubmitted();
            } else {
              if (this.authStore.getUser().role === 'provider') {
                this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
              }
              if (this.authStore.getUser().role === 'admin') {
                this.router.navigate([`/administration/${this.authStore.getUser()
                      .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
              }

            }
          },
          (err) => {
            this.toastrService.error(this.translateService.instant('error'));
          }
      );
        break;
      //#endregion
      case 'secondary':
      //#region
      this.companyService.putServiceByEmailAndService(CategoryLabelEnum.VOITURE,
      this.currentEmail,
      dataObject).subscribe(
        (data) => {
          this.formWasSubmitted = true;
          if (this.authStore.getUser().role === 'provider') {
            this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
          }
          if (this.authStore.getUser().role === 'admin') {
            this.router.navigate([`/administration/${this.authStore.getUser()
                      .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
          }
        },
        (err) => {
          this.toastrService.error(this.translateService.instant('error'));
        }
    );
      break;
    //#endregion
      default:
        break;
    }
  }
  busIsChecked(checked: boolean) {
    if (checked) {
      this.busInitCriteres = this.voitureService.addPrefix(this.busInitCriteres, CategoryLabelEnum.BUS);
    } else {
      this.busInitCriteres = this.voitureService.removePrefix(this.busInitCriteres, CategoryLabelEnum.BUS);
    }
    this.showBusComponent = checked;
  }
  public canDeactivate(): Observable<boolean> | boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.formWasSubmitted) {
        return this.dialogService.openConfirmDialog();
      }
    }
    return of(true);
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHander(event) {
    return this.formWasSubmitted;
  }

/*  @HostListener('window:unload', ['$event'])
  public unloadHander(event) {
    if (!this.formWasSubmitted) {
      // this.authService.logout();
    }
  }*/

}
