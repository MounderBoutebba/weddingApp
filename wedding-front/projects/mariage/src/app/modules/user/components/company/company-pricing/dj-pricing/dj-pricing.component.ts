import { Component, OnInit, Input, ViewChild, PLATFORM_ID, Inject, AfterViewInit, HostListener } from '@angular/core';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { FormGroup, FormControl } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { AuthStore } from '../../../../../store/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { newGroupeCriteres } from '../../company-details/groupe/groupe.interface';
import { newMusicienCriteres } from '../../company-details/musicien/musicien.interface';
import { DjPricingService } from './dj-pricing.service';
import { GroupePricingService } from '../groupe-pricing/groupe-pricing.service';
import { MusicienPricingService } from '../musicien-pricing/musicien-pricing.service';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';


@Component({
  selector: 'app-dj-pricing',
  templateUrl: './dj-pricing.component.html',
  styleUrls: ['./dj-pricing.component.scss']
})
export class DjPricingComponent implements OnInit, AfterViewInit {
  @Input() criteres: any;
  @Input() primaryComponent = true;
  @Input() categories: string[] = [];
  @ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
  @ViewChild('groupeComponent') groupeComponent: any;
  @ViewChild('musicienComponent') musicienComponent: any;
  showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showGroupeComponent = false;
  showMusicienComponent = false;
  groupeInitCriteres: any = newGroupeCriteres;
  musicienInitCriteres: any = newMusicienCriteres;
  public form: FormGroup;
	public isGroupe: boolean;
	public isMusicien: boolean;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
  constructor(private readonly djService: DjPricingService,
              private readonly groupeService: GroupePricingService,
              private readonly musicienService: MusicienPricingService,
              private readonly authStore: AuthStore,
              @Inject(PLATFORM_ID) private readonly platformId: object,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService,
              private readonly dialogService: DialogService,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly authService: AuthService,
              private readonly companyService: CompanyService) {
}
ngOnInit() {
  // afficher les input par type
  this.currentEmail = this.route.snapshot.paramMap.get('email');
  this.isGroupe = this.categories.includes(CategoryLabelEnum.GROUPE);
  this.initGroupeCriteres(this.isGroupe);
  this.isMusicien = this.categories.includes(CategoryLabelEnum.MUSICIEN);
  this.initMusicienCriteres(this.isMusicien);
  this.criteres = this.djService.selectCriteres(this.criteres, CategoryLabelEnum.DJ);
  console.log('selected criteres', this.criteres);
  this.criteres = this.djService.removePrefix(this.criteres, CategoryLabelEnum.DJ);
  this.parsedCriteres = this.djService.initFormValuesWithCriteria(this.criteres);
  this.buildForm();
}
initGroupeCriteres(isGroupe: boolean) {
  if (isGroupe) {
    this.groupeInitCriteres = this.criteres;
    this.showGroupeComponent = true;
  }
}
initMusicienCriteres(isMusicien: boolean) {
  if (isMusicien) {
    this.musicienInitCriteres = this.criteres;
    this.showMusicienComponent = true;
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
  this.parsedCriteres = await this.djService.addOption(this.parsedCriteres, field);
  this.buildForm();
  this.formBuilder.ngOnInit();
  this.formBuilder.appFieldBuilderComponent.checkBoxChanged(field);
}
setFormIsValid(): boolean {
  let formIsValid: boolean = this.formBuilder.form.valid;
  if (this.isGroupe && this.showGroupeComponent) { formIsValid = formIsValid && this.groupeComponent.formBuilder.form.valid; }
  // tslint:disable-next-line:max-line-length
  if (this.isMusicien && this.showMusicienComponent) { formIsValid = formIsValid && this.musicienComponent.formBuilder.form.valid; }
  return formIsValid;
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
  if (this.checkBoxChangesAreChecked()) {
    if (this.setFormIsValid()) {
      this.formWasSubmitted = true;
      this.patchService();
      this.updateCurrentStep();
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
    company.currentStep = 'company-settings';
    this.companyService.updateCurrentStep(company.id, currentEmail, company).subscribe( res => {
    });
  });
  }
patchService() {
  const djFormValue = this.formBuilder.form.value;
  const dataObject = this.djService.mapFormValueToCriteria(djFormValue, this.criteres);
  console.log('dj data object', dataObject);
  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.DJ,
    this.currentEmail,
    dataObject).subscribe(
      (data) => {
        if (!this.showGroupeComponent && !this.showMusicienComponent) {
          // tslint:disable-next-line:max-line-length
          if (this.authStore.getUser().role === 'provider') {
            this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
          }
          if (this.authStore.getUser().role === 'admin') {
            this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
          }
        }
        if (this.showGroupeComponent && this.showMusicienComponent) {
          const groupeFormValue = this.groupeComponent.formBuilder.form.value;
          // tslint:disable-next-line:max-line-length
          const groupeDataObject = this.groupeService.mapFormValueToCriteria(groupeFormValue, this.groupeComponent.criteres);
          console.log('groupe data object', groupeDataObject);
          this.companyService.putServiceByEmailAndService(CategoryLabelEnum.GROUPE,
            this.currentEmail,
            groupeDataObject).subscribe(
              (groupeData) => {
                const musicienFormValue = this.musicienComponent.formBuilder.form.value;
                // tslint:disable-next-line:max-line-length
                const musicienDataObject = this.musicienService.mapFormValueToCriteria(musicienFormValue, this.musicienComponent.criteres);
                console.log('musicien data object', musicienDataObject);
                this.companyService.putServiceByEmailAndService(CategoryLabelEnum.MUSICIEN,
                  this.currentEmail,
                  musicienDataObject).subscribe(
                    (musicienData) => {
                      // tslint:disable-next-line:max-line-length
                      if (this.authStore.getUser().role === 'provider') {
                        this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
                      }
                      if (this.authStore.getUser().role === 'admin') {
                        this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
                      }
                    });
              });
        } else if (this.showGroupeComponent) {
          const groupeFormValue = this.groupeComponent.formBuilder.form.value;
          // tslint:disable-next-line:max-line-length
          const groupeDataObject = this.groupeService.mapFormValueToCriteria(groupeFormValue, this.groupeComponent.criteres);
          console.log('groupe data object', groupeDataObject);
          this.companyService.putServiceByEmailAndService(CategoryLabelEnum.GROUPE,
            this.currentEmail,
            groupeDataObject).subscribe(
              (groupeData) => {
                // tslint:disable-next-line:max-line-length
                if (this.authStore.getUser().role === 'provider') {
                  this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
                }
                if (this.authStore.getUser().role === 'admin') {
                  this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
                }
              });

        } else if (this.showMusicienComponent) {
          const musicienFormValue = this.musicienComponent.formBuilder.form.value;
          // tslint:disable-next-line:max-line-length
          const musicienDataObject = this.musicienService.mapFormValueToCriteria(musicienFormValue, this.musicienComponent.criteres);
          console.log('musicien data object', musicienDataObject);
          this.companyService.putServiceByEmailAndService(CategoryLabelEnum.MUSICIEN,
            this.currentEmail,
            musicienDataObject).subscribe(
              (musicienData) => {
                // tslint:disable-next-line:max-line-length
                if (this.authStore.getUser().role === 'provider') {
                  this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
                }
                if (this.authStore.getUser().role === 'admin') {
                  this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
                }
              });

        }
      });
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
