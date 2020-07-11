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
import { newMaquillageCriteres } from '../maquillage/maquillage.interface';
import { newSoinCriteres } from '../soin/soin.interface';
import { CoiffureService } from '../coiffure/coiffure.service';
import { MaquillageService } from '../maquillage/maquillage.service';
import { EsthetiqueService } from './esthitique.service';
import { SoinService } from '../soin/soin.service';
import { newCoiffureCriteres } from '../coiffure/coiffure.interface';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-esthetique',
  templateUrl: './esthetique.component.html',
  styleUrls: ['./esthetique.component.scss']
})
export class EsthetiqueComponent implements OnInit, AfterViewInit {
  @Input() criteres: any;
  @Input() primaryComponent = true;
  @Input() categories: string[] = [];
  @ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
  @ViewChild('maquillageComponent') maquillageComponent: any;
  @ViewChild('coiffureComponent') coiffureComponent: any;
  @ViewChild('soinComponent') soinComponent: any;
  showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showMaquillageComponent = false;
	showCoiffureComponent = false;
  showSoinComponent = false;
  maquillageInitCriteres: any = newMaquillageCriteres;
  coiffureInitCriteres: any = newCoiffureCriteres;
  soinInitCriteres: any = newSoinCriteres;
  public form: FormGroup;
	public isMaquillage: boolean;
	public isCoiffure: boolean;
	public isSoin: boolean;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
  constructor(private readonly coiffureService: CoiffureService,
              private readonly maquillageService: MaquillageService,
              private readonly esthetiqueService: EsthetiqueService,
              private readonly authService: AuthService,
              private readonly soinService: SoinService,
              private readonly dialogService: DialogService,
              private readonly authStore: AuthStore,
              @Inject(PLATFORM_ID) private readonly platformId: object,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService,
              private readonly router: Router,
              private readonly companyService: CompanyService,
              private readonly route: ActivatedRoute) {
}
  ngOnInit() {
  // afficher les input par type
  this.currentEmail = this.route.snapshot.paramMap.get('email');
  this.isMaquillage = this.categories.includes(CategoryLabelEnum.MAQUILLAGE);
  this.initMaquillageCriteres(this.isMaquillage);
  this.isCoiffure = this.categories.includes(CategoryLabelEnum.COIFFURE);
  this.initCoiffureCriteres(this.isCoiffure);
  this.isSoin = this.categories.includes(CategoryLabelEnum.SOIN);
  this.initSoinCriteres(this.isSoin);
  this.criteres = this.esthetiqueService.selectCriteres(this.criteres, CategoryLabelEnum.ESTHETIQUE);
  console.log('selected criteres', this.criteres);
  this.criteres = this.esthetiqueService.removePrefix(this.criteres, CategoryLabelEnum.ESTHETIQUE);
  this.parsedCriteres = this.esthetiqueService.initFormValuesWithCriteria(this.criteres);
  this.buildForm();
  }
  initMaquillageCriteres(flag: boolean) {
    if (flag) {
      this.maquillageInitCriteres = this.criteres;
      this.showMaquillageComponent = true;
    }
  }
  initCoiffureCriteres(flag: boolean) {
    if (flag) {
      this.coiffureInitCriteres = this.criteres;
      this.showCoiffureComponent = true;
    }
  }
  initSoinCriteres(flag: boolean) {
    if (flag) {
      this.soinInitCriteres = this.criteres;
      this.showSoinComponent = true;
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
    this.parsedCriteres = await this.esthetiqueService.addOption(this.parsedCriteres, field);
    this.buildForm();
    this.formBuilder.ngOnInit();
    this.formBuilder.appFieldBuilderComponent.checkBoxChanged(field);
  }
  setFormIsValid(): boolean {
    let formIsValid: boolean = this.formBuilder.form.valid;
    // tslint:disable-next-line:max-line-length
    if (this.isMaquillage && this.showMaquillageComponent) { formIsValid = formIsValid && this.maquillageComponent.formBuilder.form.valid; }
    // tslint:disable-next-line:max-line-length
    if (this.isCoiffure && this.showCoiffureComponent) { formIsValid = formIsValid && this.coiffureComponent.formBuilder.form.valid; }
    // tslint:disable-next-line:max-line-length
    if (this.isSoin && this.showSoinComponent) { formIsValid = formIsValid && this.soinComponent.formBuilder.form.valid; }
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
  checkBoxChangesAreCheckedCoiffure(): boolean {
		let checkBoxIsRequired = true;
		this.coiffureComponent.parsedCriteres.forEach( field => {
			if (field.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
				checkBoxIsRequired = checkBoxIsRequired
										  && !!field.options.filter( opt => opt.value === true ).length;
			}
		});
		return checkBoxIsRequired;
  }
  checkBoxChangesAreCheckedMaquillage(): boolean {
		let checkBoxIsRequired = true;
		this.maquillageComponent.parsedCriteres.forEach( field => {
			if (field.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
				checkBoxIsRequired = checkBoxIsRequired
										  && !!field.options.filter( opt => opt.value === true ).length;
			}
		});
		return checkBoxIsRequired;
  }
  checkBoxChangesAreCheckedSoin(): boolean {
		let checkBoxIsRequired = true;
		this.soinComponent.parsedCriteres.forEach( field => {
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
  getMissingFieldMaquillage(): string {
    let missingField = '';
    if (this.showMaquillageComponent) {
      this.maquillageComponent.parsedCriteres.slice().reverse().forEach( field => {
        const hasCheckedOpt = !!field.options.filter( opt => opt.value === true ).length;
        if (field.type === FieldTypeEnum.CHECK_BOX && !hasCheckedOpt) {
          missingField = field.displayName;
        }
      });
    }
    return missingField;
  }
  getMissingFieldCoiffure(): string {
    let missingField = '';
    if (this.showCoiffureComponent) {
      this.coiffureComponent.parsedCriteres.slice().reverse().forEach( field => {
        const hasCheckedOpt = !!field.options.filter( opt => opt.value === true ).length;
        if (field.type === FieldTypeEnum.CHECK_BOX && !hasCheckedOpt) {
          missingField = field.displayName;
        }
      });
    }
    return missingField;
  }
  getMissingFieldSoin(): string {
    let missingField = '';
    if (this.soinComponent) {
      this.soinComponent.parsedCriteres.slice().reverse().forEach( field => {
        const hasCheckedOpt = !!field.options.filter( opt => opt.value === true ).length;
        if (field.type === FieldTypeEnum.CHECK_BOX && !hasCheckedOpt) {
          missingField = field.displayName;
        }
      });
    }
    return missingField;
  }
  formSubmitted() {
    if (this.checkBoxChangesAreChecked()) {
      if (!!!this.getMissingField()) {
        if (!!!this.getMissingFieldCoiffure()) {
          if (!!!this.getMissingFieldMaquillage()) {
            if (!!!this.getMissingFieldSoin()) {
                  if (this.setFormIsValid()) {
                    this.formWasSubmitted = true;
                    this.patchService();
                    this.updateCurrentStep();
                  } else {
                    this.dialogService.openErrorDialog('form is not valid');
                  }
            } else {
              this.dialogService.openErrorDialog(this.getMissingFieldSoin(), true);
            }
          } else {
            this.dialogService.openErrorDialog(this.getMissingFieldMaquillage(), true);
          }
        } else {
          this.dialogService.openErrorDialog(this.getMissingFieldCoiffure(), true);
        }
      } else {
        this.dialogService.openErrorDialog(this.getMissingField(), true);
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
  patchService() {
  const esthetiqueFormValue = this.formBuilder.form.value;
  const dataObject = this.esthetiqueService.mapFormValueToCriteria(esthetiqueFormValue, this.criteres);
  console.log('esthetique data object', dataObject);
  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.ESTHETIQUE,
    this.currentEmail,
    dataObject).subscribe(
      (data) => {
        if (!this.showMaquillageComponent && !this.showCoiffureComponent && !this.showSoinComponent) {
          // tslint:disable-next-line:max-line-length
          if (this.authStore.getUser().role === 'provider') {
            this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
          }
          if (this.authStore.getUser().role === 'admin') {
            this.router.navigate([`/administration/${this.authStore.getUser()
              .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
          }
        }
        if (this.showMaquillageComponent && this.showCoiffureComponent && this.showSoinComponent) {
          // tslint:disable-next-line:max-line-length
          if (this.checkBoxChangesAreCheckedMaquillage() && this.checkBoxChangesAreCheckedCoiffure() && this.checkBoxChangesAreCheckedSoin()) {
            const maquillageFormValue = this.maquillageComponent.formBuilder.form.value;
            // tslint:disable-next-line:max-line-length
            const maquillageDataObject = this.maquillageService.mapFormValueToCriteria(maquillageFormValue, this.maquillageComponent.criteres);
            console.log('maquillage data object', maquillageDataObject);
            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.MAQUILLAGE,
              this.currentEmail,
              maquillageDataObject).subscribe(
                (maquillageData) => {
                  const coiffureFormValue = this.coiffureComponent.formBuilder.form.value;
                  // tslint:disable-next-line:max-line-length
                  const coiffureDataObject = this.coiffureService.mapFormValueToCriteria(coiffureFormValue, this.coiffureComponent.criteres);
                  console.log('coiffure data object', coiffureDataObject);
                  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.COIFFURE,
                    this.currentEmail,
                    coiffureDataObject).subscribe(
                      (coiffureData) => {
                        this.submitSecondaryComp(this.soinComponent, CategoryLabelEnum.SOIN, this.soinService);
                      });
                });
          } else {
            this.dialogService.openErrorDialog('please fill the missing information');
          }
        } else if (this.showMaquillageComponent) {
          if (this.checkBoxChangesAreCheckedMaquillage()) {
            const maquillageFormValue = this.maquillageComponent.formBuilder.form.value;
            // tslint:disable-next-line:max-line-length
            const maquillageDataObject = this.maquillageService.mapFormValueToCriteria(maquillageFormValue, this.maquillageComponent.criteres);
            console.log('maquillage data object', maquillageDataObject);
            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.MAQUILLAGE,
              this.currentEmail,
              maquillageDataObject).subscribe(
                (maquillageData) => {
                  // tslint:disable-next-line:max-line-length
                  if (!this.showCoiffureComponent && !this.showSoinComponent) {
                    // tslint:disable-next-line:max-line-length
                    if (this.authStore.getUser().role === 'provider') {
                      this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
                    }
                    if (this.authStore.getUser().role === 'admin') {
                      this.router.navigate([`/administration/${this.authStore.getUser()
                        .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
                    }
                  }
                  if (this.showCoiffureComponent && this.showSoinComponent) {
                    if (this.checkBoxChangesAreCheckedCoiffure() && this.checkBoxChangesAreCheckedSoin()) {
                      const coiffureFormValue = this.coiffureComponent.formBuilder.form.value;
                      // tslint:disable-next-line:max-line-length
                      const coiffureDataObject = this.coiffureService.mapFormValueToCriteria(coiffureFormValue, this.coiffureComponent.criteres);
                      console.log('coiffure data object', coiffureDataObject);
                      this.companyService.putServiceByEmailAndService(CategoryLabelEnum.COIFFURE,
                        this.currentEmail,
                        coiffureDataObject).subscribe(
                          (coiffureData) => {
                            this.submitSecondaryComp(this.soinComponent, CategoryLabelEnum.SOIN, this.soinService);
                          });
                    } else {
                      this.dialogService.openErrorDialog('please fill the missing information');
                    }
                  } else if (this.showCoiffureComponent) {
                    if (this.checkBoxChangesAreCheckedCoiffure()) {
                      this.submitSecondaryComp(this.coiffureComponent, CategoryLabelEnum.COIFFURE, this.coiffureService);
                    } else {
                      this.dialogService.openErrorDialog('please fill the missing information');
                    }
                  } else if (this.showSoinComponent) {
                    if (this.checkBoxChangesAreCheckedSoin()) {
                      this.submitSecondaryComp(this.soinComponent, CategoryLabelEnum.SOIN, this.soinService);
                    } else {
                      this.dialogService.openErrorDialog('please fill the missing information');
                    }
                  }
                });
          } else {
            this.dialogService.openErrorDialog('please fill the missing information');
          }
        } else if (this.showCoiffureComponent) {
          if (this.checkBoxChangesAreCheckedCoiffure()) {
            const coiffureFormValue = this.coiffureComponent.formBuilder.form.value;
            // tslint:disable-next-line:max-line-length
            const coiffureDataObject = this.coiffureService.mapFormValueToCriteria(coiffureFormValue, this.coiffureComponent.criteres);
            console.log('coiffure data object', coiffureDataObject);
            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.COIFFURE,
              this.currentEmail,
              coiffureDataObject).subscribe(
                (coiffureData) => {
                  // tslint:disable-next-line:max-line-length
                  if (!this.showMaquillageComponent && !this.showSoinComponent) {
                    // tslint:disable-next-line:max-line-length
                    if (this.authStore.getUser().role === 'provider') {
                      this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
                    }
                    if (this.authStore.getUser().role === 'admin') {
                      this.router.navigate([`/administration/${this.authStore.getUser()
                        .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
                    }
                  }
                  if (this.showMaquillageComponent && this.showSoinComponent) {
                    if (this.checkBoxChangesAreCheckedMaquillage() && this.checkBoxChangesAreCheckedSoin()) {
                      const maquillageFormValue = this.maquillageComponent.formBuilder.form.value;
                      // tslint:disable-next-line:max-line-length
                      const maquillageDataObject = this.maquillageService.mapFormValueToCriteria(maquillageFormValue, this.maquillageComponent.criteres);
                      console.log('maquillage data object', maquillageDataObject);
                      this.companyService.putServiceByEmailAndService(CategoryLabelEnum.MAQUILLAGE,
                        this.currentEmail,
                        maquillageDataObject).subscribe(
                          (maquillageData) => {
                            this.submitSecondaryComp(this.soinComponent, CategoryLabelEnum.SOIN, this.soinService);
                          });
                    } else {
                      this.dialogService.openErrorDialog('please fill the missing information');
                    }
                  } else if (this.showMaquillageComponent) {
                    if (this.checkBoxChangesAreCheckedMaquillage()) {
                      this.submitSecondaryComp(this.maquillageComponent, CategoryLabelEnum.MAQUILLAGE, this.maquillageService);
                    } else {
                      this.dialogService.openErrorDialog('please fill the missing information');
                    }
                  } else if (this.showSoinComponent) {
                    if (this.checkBoxChangesAreCheckedSoin()) {
                      this.submitSecondaryComp(this.soinComponent, CategoryLabelEnum.SOIN, this.soinService);
                    } else {
                      this.dialogService.openErrorDialog('please fill the missing information');
                    }
                  }
                });
          } else {
            this.dialogService.openErrorDialog('please fill the missing information');
          }
        } else if (this.showSoinComponent) {
          if (this.checkBoxChangesAreCheckedSoin()) {
            // tslint:disable-next-line:max-line-length
            const soinFormValue = this.soinComponent.formBuilder.form.value;
            // tslint:disable-next-line:max-line-length
            const soinDataObject = this.soinService.mapFormValueToCriteria(soinFormValue, this.soinComponent.criteres);
            console.log('soin data object', soinDataObject);
            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.SOIN,
                this.currentEmail,
                soinDataObject).subscribe(
                    (soinData) => {
                        // tslint:disable-next-line:max-line-length
                        if (!this.showCoiffureComponent && !this.showMaquillageComponent) {
                          // tslint:disable-next-line:max-line-length
                          if (this.authStore.getUser().role === 'provider') {
                            this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
                          }
                          if (this.authStore.getUser().role === 'admin') {
                            this.router.navigate([`/administration/${this.authStore.getUser()
                              .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
                          }
                        }
                        if (this.showCoiffureComponent && this.showMaquillageComponent) {
                          if (this.checkBoxChangesAreCheckedCoiffure() && this.checkBoxChangesAreCheckedMaquillage()) {
                            const coiffureFormValue = this.coiffureComponent.formBuilder.form.value;
                            // tslint:disable-next-line:max-line-length
                            const coiffureDataObject = this.coiffureService.mapFormValueToCriteria(coiffureFormValue, this.coiffureComponent.criteres);
                            console.log('coiffure data object', coiffureDataObject);
                            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.COIFFURE,
                              this.currentEmail,
                              coiffureDataObject).subscribe(
                                (coiffureData) => {
                                  // tslint:disable-next-line:max-line-length
                                  this.submitSecondaryComp(this.maquillageComponent, CategoryLabelEnum.MAQUILLAGE, this.maquillageService);
                                });
                          } else {
                            this.dialogService.openErrorDialog('please fill the missing information');
                          }
                        } else if (this.showCoiffureComponent) {
                          if (this.checkBoxChangesAreCheckedCoiffure()) {
                            this.submitSecondaryComp(this.coiffureComponent, CategoryLabelEnum.COIFFURE, this.coiffureService);
                          } else {
                            this.dialogService.openErrorDialog('please fill the missing information');
                          }
                        } else if (this.showMaquillageComponent) {
                          if (this.checkBoxChangesAreCheckedMaquillage()) {
                            this.submitSecondaryComp(this.maquillageComponent, CategoryLabelEnum.MAQUILLAGE, this.maquillageService);
                          } else {
                            this.dialogService.openErrorDialog('please fill the missing information');
                          }
                        }
                });
          } else {
            this.dialogService.openErrorDialog('please fill the missing information');
          }
        }
      });
  }
  submitSecondaryComp(comp: any, categoryLabel: string, service: any) {
    const formValue = comp.formBuilder.form.value;
    // tslint:disable-next-line:max-line-length
    const dataObject = service.mapFormValueToCriteria(formValue, comp.criteres);
    console.log(`${categoryLabel} data object`, dataObject);
    this.companyService.putServiceByEmailAndService(categoryLabel,
      this.currentEmail,
      dataObject).subscribe(
        (data) => {
          // tslint:disable-next-line:max-line-length
          if (this.authStore.getUser().role === 'provider') {
            this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
          }
          if (this.authStore.getUser().role === 'admin') {
            this.router.navigate([`/administration/${this.authStore.getUser()
              .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
          }
        });
  }
  maquillageIsChecked(checked: boolean) {
    if (checked) {
      this.maquillageInitCriteres = this.esthetiqueService.addPrefix(this.maquillageInitCriteres, CategoryLabelEnum.MAQUILLAGE);
    } else {
      this.maquillageInitCriteres = this.esthetiqueService.removePrefix(this.maquillageInitCriteres, CategoryLabelEnum.MAQUILLAGE);
    }
    this.showMaquillageComponent = checked;
  }
  coiffureIsChecked(checked: boolean) {
    if (checked) {
      this.coiffureInitCriteres = this.esthetiqueService.addPrefix(this.coiffureInitCriteres, CategoryLabelEnum.COIFFURE);
    } else {
      this.coiffureInitCriteres = this.esthetiqueService.removePrefix(this.coiffureInitCriteres, CategoryLabelEnum.COIFFURE);
    }
    this.showCoiffureComponent = checked;
  }
  soinIsChecked(checked: boolean) {
    if (checked) {
      this.soinInitCriteres = this.esthetiqueService.addPrefix(this.soinInitCriteres, CategoryLabelEnum.SOIN);
    } else {
      this.soinInitCriteres = this.esthetiqueService.removePrefix(this.soinInitCriteres, CategoryLabelEnum.SOIN);
    }
    this.showSoinComponent = checked;
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
