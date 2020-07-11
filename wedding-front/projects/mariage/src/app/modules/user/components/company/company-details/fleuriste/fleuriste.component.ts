import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { newDecorateurCriteres } from '../decorateur/decorateur.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { FleuristeService } from './fleuriste.service';
import { AuthStore } from '../../../../../store/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { CategoryLabelEnum } from '../category-label.enum';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-fleuriste',
  templateUrl: './fleuriste.component.html',
  styleUrls: ['./fleuriste.component.scss']
})
export class FleuristeComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	@ViewChild('decorateurComponent') decorateurComponent: any;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
  showDecorateurComponent = false;
  decorateurInitCriteres: any = newDecorateurCriteres;
  public form: FormGroup;
	public isDecorateur: boolean;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
	constructor(private readonly fleuristeService: FleuristeService,
             private readonly authStore: AuthStore,
             private readonly authService: AuthService,
             @Inject(PLATFORM_ID) private readonly platformId: object,
             private readonly toastrService: ToastrService,
             private readonly translateService: TranslateService,
             private readonly router: Router,
             private readonly dialogService: DialogService,
             private readonly companyService: CompanyService,
             private readonly route: ActivatedRoute) {
}

ngOnInit() {
  // afficher les input par type
  this.currentEmail = this.route.snapshot.paramMap.get('email');
  this.isDecorateur = this.categories.includes(CategoryLabelEnum.DECORATUER);
  this.initDecorateurCriteres(this.isDecorateur);
  this.criteres = this.fleuristeService.selectCriteres(this.criteres, CategoryLabelEnum.FLEURISTE);
  console.log('selected criteres', this.criteres);
  this.criteres = this.fleuristeService.removePrefix(this.criteres, CategoryLabelEnum.FLEURISTE);
  this.parsedCriteres = this.fleuristeService.initFormValuesWithFleuristeCriteria(this.criteres);
  this.buildForm();
}
initDecorateurCriteres(isDecorateur: boolean) {
  if (isDecorateur) {
    this.decorateurInitCriteres = this.criteres;
    this.showDecorateurComponent = true;
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
  this.parsedCriteres = await this.fleuristeService.addOption(this.parsedCriteres, field);
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
  const dataObject = this.fleuristeService.mapFormValueToFleuristeCriteria(formValue, this.criteres);
  console.log('data object', dataObject);
  switch (purpose) {
    case 'primary':
      //#region
      this.companyService.putServiceByEmailAndService(CategoryLabelEnum.FLEURISTE,
      this.currentEmail,
      dataObject).subscribe(
        (data) => {
          this.formWasSubmitted = true;
          if (this.showDecorateurComponent) {
            this.decorateurComponent.formSubmitted();
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
    this.companyService.putServiceByEmailAndService(CategoryLabelEnum.FLEURISTE,
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
decorateurIsChecked(checked: boolean) {
  if (checked) {
    this.decorateurInitCriteres = this.fleuristeService.addPrefix(this.decorateurInitCriteres, CategoryLabelEnum.DECORATUER);
  } else {
    this.decorateurInitCriteres = this.fleuristeService.removePrefix(this.decorateurInitCriteres, CategoryLabelEnum.DECORATUER);
  }
  this.showDecorateurComponent = checked;
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
