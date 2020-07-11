import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { AuthStore } from '../../../../../store/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { CategoryLabelEnum } from '../category-label.enum';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { BusService } from './bus.service';
import { newVoitureCriteres } from '../voiture/voiture.interface';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss']
})
export class BusComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	@ViewChild('voitureComponent') voitureComponent: any;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
  showVoitureComponent = false;
  voitureInitCriteres: any = newVoitureCriteres;
  public form: FormGroup;
	public isVoiture: boolean;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
	constructor(private readonly busService: BusService,
             private readonly authStore: AuthStore,
             private readonly authService: AuthService,
             @Inject(PLATFORM_ID) private readonly platformId: object,
             private readonly toastrService: ToastrService,
             private readonly translateService: TranslateService,
             private readonly router: Router,
             private readonly dialogService: DialogService,
             private readonly route: ActivatedRoute,
             private readonly companyService: CompanyService) {
}

  ngOnInit() {
    this.currentEmail = this.route.snapshot.paramMap.get('email');
    // afficher les input par type
    this.isVoiture = this.categories.includes(CategoryLabelEnum.VOITURE);
    this.initVoitureCriteres(this.isVoiture);
    this.criteres = this.busService.selectCriteres(this.criteres, CategoryLabelEnum.BUS);
    console.log('selected criteres', this.criteres);
    this.criteres = this.busService.removePrefix(this.criteres, CategoryLabelEnum.BUS);
    this.parsedCriteres = this.busService.initFormValuesWithBusCriteria(this.criteres);
    this.buildForm();
  }
  initVoitureCriteres(isVoiture: boolean) {
    if (isVoiture) {
      this.voitureInitCriteres = this.criteres;
      this.showVoitureComponent = true;
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
    this.parsedCriteres = await this.busService.addOption(this.parsedCriteres, field);
    this.buildForm();
    this.formBuilder.ngOnInit();
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
    const dataObject = this.busService.mapFormValueToVoitureCriteria(formValue, this.criteres);
    console.log('data object', dataObject);
    switch (purpose) {
      case 'primary':
        //#region
        this.companyService.putServiceByEmailAndService(CategoryLabelEnum.BUS,
        this.currentEmail,
        dataObject).subscribe(
          (data) => {
            this.formWasSubmitted = true;
            if (this.showVoitureComponent) {
              this.voitureComponent.formSubmitted();
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
      this.companyService.putServiceByEmailAndService(CategoryLabelEnum.BUS,
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
  voitureIsChecked(checked: boolean) {
    if (checked) {
      this.voitureInitCriteres = this.busService.addPrefix(this.voitureInitCriteres, CategoryLabelEnum.VOITURE);
    } else {
      this.voitureInitCriteres = this.busService.removePrefix(this.voitureInitCriteres, CategoryLabelEnum.VOITURE);
    }
    this.showVoitureComponent = checked;
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
