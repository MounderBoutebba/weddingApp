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
import { newDjCriteres } from '../dj/dj.interface';
import { newMusicienCriteres } from '../musicien/musicien.interface';
import { DjService } from '../dj/dj.service';
import { GroupeService } from './groupe.service';
import { MusicienService } from '../musicien/musicien.service';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.scss']
})
export class GroupeComponent implements OnInit, AfterViewInit {
  @Input() criteres: any;
  @Input() primaryComponent = true;
  @Input() categories: string[] = [];
  @ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
  @ViewChild('djComponent') djComponent: any;
  @ViewChild('musicienComponent') musicienComponent: any;
  showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
  showDjComponent = false;
  showMusicienComponent = false;
  DjInitCriteres: any = newDjCriteres;
  musicienInitCriteres: any = newMusicienCriteres;
  public form: FormGroup;
	public isDj: boolean;
	public isMusicien: boolean;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
  constructor(private readonly djService: DjService,
              private readonly groupeService: GroupeService,
              private readonly musicienService: MusicienService,
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
  this.isDj = this.categories.includes(CategoryLabelEnum.DJ);
  this.initDjCriteres(this.isDj);
  this.isMusicien = this.categories.includes(CategoryLabelEnum.MUSICIEN);
  this.initMusicienCriteres(this.isMusicien);
  this.criteres = this.groupeService.selectCriteres(this.criteres, CategoryLabelEnum.GROUPE);
  console.log('selected criteres', this.criteres);
  this.criteres = this.groupeService.removePrefix(this.criteres, CategoryLabelEnum.GROUPE);
  this.parsedCriteres = this.groupeService.initFormValuesWithCriteria(this.criteres);
  this.buildForm();
}
initDjCriteres(isDj: boolean) {
  if (isDj) {
    this.DjInitCriteres = this.criteres;
    this.showDjComponent = true;
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
  this.parsedCriteres = await this.groupeService.addOption(this.parsedCriteres, field);
  this.buildForm();
  this.formBuilder.ngOnInit();
  this.formBuilder.appFieldBuilderComponent.checkBoxChanged(field);

}
setFormIsValid(): boolean {
  let formIsValid: boolean = this.formBuilder.form.valid;
  if (this.isDj && this.showDjComponent) { formIsValid = formIsValid && this.djComponent.formBuilder.form.valid; }
  // tslint:disable-next-line:max-line-length
  if (this.isMusicien && this.showMusicienComponent) { formIsValid = formIsValid && this.musicienComponent.formBuilder.form.valid; }
  return formIsValid;
}
checkBoxChangesAreChecked(): boolean {
  let checkBoxIsRequired = true;
  this.parsedCriteres.forEach( field => {
    if (field.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
      checkBoxIsRequired = checkBoxIsRequired
                    && !!field.options.filter( opt => opt.value === true ).length;
    }
  });
  return checkBoxIsRequired;
}
getMissingField(): string {
  let missingField = '';
  this.parsedCriteres.slice().reverse().forEach( field => {
    const hasCheckedOpt = !!field.options.filter( opt => opt.value === true ).length;
    if (field.type === FieldTypeEnum.CHECK_BOX && !hasCheckedOpt) {
      missingField = field.displayName;
    }
  });
  return missingField;
}
formSubmitted() {
  if (!!!this.getMissingField()) {
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
  } else {
    this.dialogService.openErrorDialog(this.getMissingField(), true);
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
patchService() {
  const groupeFormValue = this.formBuilder.form.value;
  const dataObject = this.groupeService.mapFormValueToCriteria(groupeFormValue, this.criteres);
  console.log('groupe data object', dataObject);
  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.GROUPE,
    this.currentEmail,
    dataObject).subscribe(
      (data) => {
        if (!this.showDjComponent && !this.showMusicienComponent) {
          // tslint:disable-next-line:max-line-length
          console.log('no dj no musicien');
          if (this.authStore.getUser().role === 'provider') {
            this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
          }
          if (this.authStore.getUser().role === 'admin') {
            this.router.navigate([`/administration/${this.authStore.getUser()
                      .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
          }
        }
        if (this.showDjComponent && this.showMusicienComponent) {
          console.log('dj musicien');
          const djFormValue = this.djComponent.formBuilder.form.value;
          // tslint:disable-next-line:max-line-length
          const djDataObject = this.djService.mapFormValueToCriteria(djFormValue, this.djComponent.criteres);
          console.log('dj data object', djDataObject);
          this.companyService.putServiceByEmailAndService(CategoryLabelEnum.DJ,
            this.currentEmail,
            djDataObject).subscribe(
              (djData) => {
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
                        this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${musicienData.company.categories[0]}`]);
                      }
                      if (this.authStore.getUser().role === 'admin') {
                        this.router.navigate([`/administration/${this.authStore.getUser()
                      .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
                      }
                    });
              });
        } else if (this.showDjComponent) {
          console.log('just dj');
          const djFormValue = this.djComponent.formBuilder.form.value;
          // tslint:disable-next-line:max-line-length
          const djDataObject = this.djService.mapFormValueToCriteria(djFormValue, this.djComponent.criteres);
          console.log('dj data object', djDataObject);
          this.companyService.putServiceByEmailAndService(CategoryLabelEnum.DJ,
            this.currentEmail,
            djDataObject).subscribe(
              (djData) => {
                // tslint:disable-next-line:max-line-length
                if (this.authStore.getUser().role === 'provider') {
                  this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${djData.company.categories[0]}`]);
                }
                if (this.authStore.getUser().role === 'admin') {
                  this.router.navigate([`/administration/${this.authStore.getUser()
                      .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
                }
              });

        } else if (this.showMusicienComponent) {
          console.log('just musicien');
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
                  this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${musicienData.company.categories[0]}`]);
                }
                if (this.authStore.getUser().role === 'admin') {
                  this.router.navigate([`/administration/${this.authStore.getUser()
                      .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
                }
              });

        }
      });
}
djIsChecked(checked: boolean) {
  if (checked) {
    this.DjInitCriteres = this.djService.addPrefix(this.DjInitCriteres, CategoryLabelEnum.DJ);
  } else {
    this.DjInitCriteres = this.djService.removePrefix(this.DjInitCriteres, CategoryLabelEnum.DJ);
  }
  this.showDjComponent = checked;
}
musicienIsChecked(checked: boolean) {
  if (checked) {
    this.musicienInitCriteres = this.djService.addPrefix(this.musicienInitCriteres, CategoryLabelEnum.MUSICIEN);
  } else {
    this.musicienInitCriteres = this.djService.removePrefix(this.musicienInitCriteres, CategoryLabelEnum.MUSICIEN);
  }
  this.showMusicienComponent = checked;
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

  /*
    @HostListener('window:unload', ['$event'])
    public unloadHander(event) {
      if (!this.formWasSubmitted) {
        // this.authService.logout();
      }
    }
  */

}
