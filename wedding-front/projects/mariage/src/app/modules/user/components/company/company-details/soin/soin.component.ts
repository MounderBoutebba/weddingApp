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
import { newEsthetiqueCriteres } from '../esthetique/esthetique.interface';
import { CoiffureService } from '../coiffure/coiffure.service';
import { MaquillageService } from '../maquillage/maquillage.service';
import { EsthetiqueService } from '../esthetique/esthitique.service';
import { SoinService } from './soin.service';
import { newCoiffureCriteres } from '../coiffure/coiffure.interface';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-soin',
  templateUrl: './soin.component.html',
  styleUrls: ['./soin.component.scss']
})
export class SoinComponent implements OnInit, AfterViewInit {
  @Input() criteres: any;
  @Input() primaryComponent = true;
  @Input() categories: string[] = [];
  @ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
  @ViewChild('maquillageComponent') maquillageComponent: any;
  @ViewChild('esthetiqueComponent') esthetiqueComponent: any;
  @ViewChild('coiffureComponent') coiffureComponent: any;
  showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showMaquillageComponent = false;
  showEsthetiqueComponent = false;
  showCoiffureComponent = false;
  maquillageInitCriteres: any = newMaquillageCriteres;
  esthetiqueInitCriteres: any = newEsthetiqueCriteres;
  coiffureInitCriteres: any = newCoiffureCriteres;
  public form: FormGroup;
	public isMaquillage: boolean;
	public isEsthetique: boolean;
	public isCoiffure: boolean;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
  constructor(private readonly coiffureService: CoiffureService,
              private readonly maquillageService: MaquillageService,
              private readonly esthetiqueService: EsthetiqueService,
              private readonly soinService: SoinService,
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
  // afficher les input par type
  this.currentEmail = this.route.snapshot.paramMap.get('email');
  this.isMaquillage = this.categories.includes(CategoryLabelEnum.MAQUILLAGE);
  this.initMaquillageCriteres(this.isMaquillage);
  this.isEsthetique = this.categories.includes(CategoryLabelEnum.ESTHETIQUE);
  this.initEsthetiqueCriteres(this.isEsthetique);
  this.isCoiffure = this.categories.includes(CategoryLabelEnum.COIFFURE);
  this.initCoiffureCriteres(this.isCoiffure);
  this.criteres = this.soinService.selectCriteres(this.criteres, CategoryLabelEnum.SOIN);
  console.log('selected criteres', this.criteres);
  this.criteres = this.soinService.removePrefix(this.criteres, CategoryLabelEnum.SOIN);
  this.parsedCriteres = this.soinService.initFormValuesWithCriteria(this.criteres);
  this.buildForm();
  }
  initMaquillageCriteres(flag: boolean) {
    if (flag) {
      this.maquillageInitCriteres = this.criteres;
      this.showMaquillageComponent = true;
    }
  }
  initEsthetiqueCriteres(flag: boolean) {
    if (flag) {
      this.esthetiqueInitCriteres = this.criteres;
      this.showEsthetiqueComponent = true;
    }
  }
  initCoiffureCriteres(flag: boolean) {
    if (flag) {
      this.coiffureInitCriteres = this.criteres;
      this.showCoiffureComponent = true;
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
    this.parsedCriteres = await this.soinService.addOption(this.parsedCriteres, field);
    this.buildForm();
    this.formBuilder.ngOnInit();
    this.formBuilder.appFieldBuilderComponent.checkBoxChanged(field);
  }
  setFormIsValid(): boolean {
    let formIsValid: boolean = this.formBuilder.form.valid;
    // tslint:disable-next-line:max-line-length
    if (this.isMaquillage && this.showMaquillageComponent) { formIsValid = formIsValid && this.maquillageComponent.formBuilder.form.valid; }
    // tslint:disable-next-line:max-line-length
    if (this.isEsthetique && this.showEsthetiqueComponent) { formIsValid = formIsValid && this.esthetiqueComponent.formBuilder.form.valid; }
    // tslint:disable-next-line:max-line-length
    if (this.isCoiffure && this.showCoiffureComponent) { formIsValid = formIsValid && this.coiffureComponent.formBuilder.form.valid; }
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
  checkBoxChangesAreCheckedEsthetique(): boolean {
		let checkBoxIsRequired = true;
		this.esthetiqueComponent.parsedCriteres.forEach( field => {
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
  getMissingFieldEsthetique(): string {
    let missingField = '';
    if (this.showEsthetiqueComponent) {
      this.esthetiqueComponent.parsedCriteres.slice().reverse().forEach( field => {
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
  formSubmitted() {
    if (this.checkBoxChangesAreChecked()) {
      if (!!!this.getMissingField()) {
        if (!!!this.getMissingFieldCoiffure()) {
          if (!!!this.getMissingFieldMaquillage()) {
            if (!!!this.getMissingFieldEsthetique()) {
                  if (this.setFormIsValid()) {
                    this.formWasSubmitted = true;
                    this.patchService();
                    this.updateCurrentStep();
                  } else {
                    this.dialogService.openErrorDialog('form is not valid');
                  }
            } else {
              this.dialogService.openErrorDialog(this.getMissingFieldEsthetique(), true);
            }
          } else {
            this.dialogService.openErrorDialog(this.getMissingFieldMaquillage(), true);
          }
        } else {
          this.dialogService.openErrorDialog(this.getMissingField(), true);
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
  const soinFormValue = this.formBuilder.form.value;
  const dataObject = this.soinService.mapFormValueToCriteria(soinFormValue, this.criteres);
  console.log('soin data object', dataObject);
  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.SOIN,
    this.currentEmail,
    dataObject).subscribe(
      (data) => {
        if (!this.showMaquillageComponent && !this.showEsthetiqueComponent && !this.showCoiffureComponent) {
          // tslint:disable-next-line:max-line-length
          if (this.authStore.getUser().role === 'provider') {
            this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
          }
          if (this.authStore.getUser().role === 'admin') {
            this.router.navigate([`/administration/${this.authStore.getUser()
                      .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
          }
        }
        if (this.showMaquillageComponent && this.showEsthetiqueComponent && this.showCoiffureComponent) {
          // tslint:disable-next-line:max-line-length
          if (this.checkBoxChangesAreCheckedMaquillage() && this.checkBoxChangesAreCheckedEsthetique() && this.checkBoxChangesAreCheckedCoiffure()) {
            const maquillageFormValue = this.maquillageComponent.formBuilder.form.value;
            // tslint:disable-next-line:max-line-length
            const maquillageDataObject = this.maquillageService.mapFormValueToCriteria(maquillageFormValue, this.maquillageComponent.criteres);
            console.log('maquillage data object', maquillageDataObject);
            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.MAQUILLAGE,
              this.currentEmail,
              maquillageDataObject).subscribe(
                (maquillageData) => {
                  const esthetiqueFormValue = this.esthetiqueComponent.formBuilder.form.value;
                  // tslint:disable-next-line:max-line-length
                  const esthetiqueDataObject = this.esthetiqueService.mapFormValueToCriteria(esthetiqueFormValue, this.esthetiqueComponent.criteres);
                  console.log('esthetique data object', esthetiqueDataObject);
                  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.ESTHETIQUE,
                    this.currentEmail,
                    esthetiqueDataObject).subscribe(
                      (esthetiqueData) => {
                        this.submitSecondaryComp(this.coiffureComponent, CategoryLabelEnum.COIFFURE, this.coiffureService);
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
                  if (!this.showEsthetiqueComponent && !this.showCoiffureComponent) {
                    // tslint:disable-next-line:max-line-length
                    if (this.authStore.getUser().role === 'provider') {
                      this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
                    }
                    if (this.authStore.getUser().role === 'admin') {
                      this.router.navigate([`/administration/${this.authStore.getUser()
                        .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
                    }
                  }
                  if (this.showEsthetiqueComponent && this.showCoiffureComponent) {
                    if (this.checkBoxChangesAreCheckedEsthetique() && this.checkBoxChangesAreCheckedCoiffure()) {
                      const esthetiqueFormValue = this.esthetiqueComponent.formBuilder.form.value;
                      // tslint:disable-next-line:max-line-length
                      const esthetiqueDataObject = this.esthetiqueService.mapFormValueToCriteria(esthetiqueFormValue, this.esthetiqueComponent.criteres);
                      console.log('esthetique data object', esthetiqueDataObject);
                      this.companyService.putServiceByEmailAndService(CategoryLabelEnum.ESTHETIQUE,
                        this.currentEmail,
                        esthetiqueDataObject).subscribe(
                          (esthetiqueData) => {
                            this.submitSecondaryComp(this.coiffureComponent, CategoryLabelEnum.COIFFURE, this.coiffureService);
                          });
                    } else {
                      this.dialogService.openErrorDialog('please fill the missing information');
                    }

                  } else if (this.showEsthetiqueComponent) {
                    if (this.checkBoxChangesAreCheckedEsthetique()) {
                      this.submitSecondaryComp(this.esthetiqueComponent, CategoryLabelEnum.ESTHETIQUE, this.esthetiqueService);
                    } else {
                      this.dialogService.openErrorDialog('please fill the missing information');
                    }
                  } else if (this.showCoiffureComponent) {
                    if (this.checkBoxChangesAreCheckedCoiffure()) {
                      this.submitSecondaryComp(this.coiffureComponent, CategoryLabelEnum.COIFFURE, this.coiffureService);
                    } else {
                      this.dialogService.openErrorDialog('please fill the missing information');
                    }
                  }
                });
          } else {
            this.dialogService.openErrorDialog('please fill the missing information');
          }
        } else if (this.showEsthetiqueComponent) {
          if (this.checkBoxChangesAreCheckedEsthetique()) {
            const esthetiqueFormValue = this.esthetiqueComponent.formBuilder.form.value;
            // tslint:disable-next-line:max-line-length
            const esthetiqueDataObject = this.esthetiqueService.mapFormValueToCriteria(esthetiqueFormValue, this.esthetiqueComponent.criteres);
            console.log('esthetique data object', esthetiqueDataObject);
            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.ESTHETIQUE,
              this.currentEmail,
              esthetiqueDataObject).subscribe(
                (esthetiqueData) => {
                  // tslint:disable-next-line:max-line-length
                  if (!this.showMaquillageComponent && !this.showCoiffureComponent) {
                    // tslint:disable-next-line:max-line-length
                    if (this.authStore.getUser().role === 'provider') {
                      this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
                    }
                    if (this.authStore.getUser().role === 'admin') {
                      this.router.navigate([`/administration/${this.authStore.getUser()
                        .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
                    }
                  }
                  if (this.showMaquillageComponent && this.showCoiffureComponent) {
                    if (this.checkBoxChangesAreCheckedMaquillage() && this.checkBoxChangesAreCheckedCoiffure()) {
                      const maquillageFormValue = this.maquillageComponent.formBuilder.form.value;
                      // tslint:disable-next-line:max-line-length
                      const maquillageDataObject = this.maquillageService.mapFormValueToCriteria(maquillageFormValue, this.maquillageComponent.criteres);
                      console.log('maquillage data object', maquillageDataObject);
                      this.companyService.putServiceByEmailAndService(CategoryLabelEnum.MAQUILLAGE,
                        this.currentEmail,
                        maquillageDataObject).subscribe(
                          (maquillageData) => {
                            this.submitSecondaryComp(this.coiffureComponent, CategoryLabelEnum.COIFFURE, this.coiffureService);
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
                  } else if (this.showCoiffureComponent) {
                    if (this.checkBoxChangesAreCheckedCoiffure()) {
                      this.submitSecondaryComp(this.coiffureComponent, CategoryLabelEnum.COIFFURE, this.coiffureService);
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
                        // tslint:disable-next-line:max-line-length
                        const coiffureFormValue = this.coiffureComponent.formBuilder.form.value;
                        // tslint:disable-next-line:max-line-length
                        const coiffureDataObject = this.coiffureService.mapFormValueToCriteria(coiffureFormValue, this.coiffureComponent.criteres);
                        console.log('coiffure data object', coiffureDataObject);
                        this.companyService.putServiceByEmailAndService(CategoryLabelEnum.COIFFURE,
                            this.currentEmail,
                            coiffureDataObject).subscribe(
                                (coiffureData) => {
                                    // tslint:disable-next-line:max-line-length
                                    if (!this.showEsthetiqueComponent && !this.showMaquillageComponent) {
                                      // tslint:disable-next-line:max-line-length
                                      if (this.authStore.getUser().role === 'provider') {
                                        this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
                                      }
                                      if (this.authStore.getUser().role === 'admin') {
                                        this.router.navigate([`/administration/${this.authStore.getUser()
                                  .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
                                      }
                                    }
                                    if (this.showEsthetiqueComponent && this.showMaquillageComponent) {
                                      if (this.checkBoxChangesAreCheckedEsthetique() && this.checkBoxChangesAreCheckedMaquillage()) {
                                        const esthetiqueFormValue = this.esthetiqueComponent.formBuilder.form.value;
                                        // tslint:disable-next-line:max-line-length
                                        const esthetiqueDataObject = this.esthetiqueService.mapFormValueToCriteria(esthetiqueFormValue, this.esthetiqueComponent.criteres);
                                        console.log('esthetique data object', esthetiqueDataObject);
                                        this.companyService.putServiceByEmailAndService(CategoryLabelEnum.ESTHETIQUE,
                                          this.currentEmail,
                                          esthetiqueDataObject).subscribe(
                                            (esthetiqueData) => {
                                              // tslint:disable-next-line:max-line-length
                                              this.submitSecondaryComp(this.maquillageComponent, CategoryLabelEnum.MAQUILLAGE, this.maquillageService);
                                            });
                                      } else {
                                        this.dialogService.openErrorDialog('please fill the missing information');
                                      }
                                    } else if (this.showEsthetiqueComponent) {
                                      if (this.checkBoxChangesAreCheckedEsthetique()) {
                                        this.submitSecondaryComp(this.esthetiqueComponent, CategoryLabelEnum.ESTHETIQUE, this.esthetiqueService);
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
      this.maquillageInitCriteres = this.soinService.addPrefix(this.maquillageInitCriteres, CategoryLabelEnum.MAQUILLAGE);
    } else {
      this.maquillageInitCriteres = this.soinService.removePrefix(this.maquillageInitCriteres, CategoryLabelEnum.MAQUILLAGE);
    }
    this.showMaquillageComponent = checked;
  }
  esthetiqueIsChecked(checked: boolean) {
    if (checked) {
      this.esthetiqueInitCriteres = this.soinService.addPrefix(this.esthetiqueInitCriteres, CategoryLabelEnum.ESTHETIQUE);
    } else {
      this.esthetiqueInitCriteres = this.soinService.removePrefix(this.esthetiqueInitCriteres, CategoryLabelEnum.ESTHETIQUE);
    }
    this.showEsthetiqueComponent = checked;
  }
  coiffureIsChecked(checked: boolean) {
    if (checked) {
      this.coiffureInitCriteres = this.soinService.addPrefix(this.coiffureInitCriteres, CategoryLabelEnum.COIFFURE);
    } else {
      this.coiffureInitCriteres = this.soinService.removePrefix(this.coiffureInitCriteres, CategoryLabelEnum.COIFFURE);
    }
    this.showCoiffureComponent = checked;
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
