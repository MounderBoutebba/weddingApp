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
import { newEsthetiqueCriteres } from '../esthetique/esthetique.interface';
import { newSoinCriteres } from '../soin/soin.interface';
import { CoiffureService } from '../coiffure/coiffure.service';
import { MaquillageService } from './maquillage.service';
import { EsthetiqueService } from '../esthetique/esthitique.service';
import { newCoiffureCriteres } from '../coiffure/coiffure.interface';
import { SoinService } from '../soin/soin.service';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-maquillage',
  templateUrl: './maquillage.component.html',
  styleUrls: ['./maquillage.component.scss']
})
export class MaquillageComponent implements OnInit, AfterViewInit {
  @Input() criteres: any;
  @Input() primaryComponent = true;
  @Input() categories: string[] = [];
  @ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
  @ViewChild('coiffureComponent') coiffureComponent: any;
  @ViewChild('esthetiqueComponent') esthetiqueComponent: any;
  @ViewChild('soinComponent') soinComponent: any;
  showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showCoiffureComponent = false;
  showEsthetiqueComponent = false;
  showSoinComponent = false;
  coiffureInitCriteres: any = newCoiffureCriteres;
  esthetiqueInitCriteres: any = newEsthetiqueCriteres;
  soinInitCriteres: any = newSoinCriteres;
  public form: FormGroup;
	public isCoiffure: boolean;
	public isEsthetique: boolean;
	public isSoin: boolean;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
  constructor(private readonly coiffureService: CoiffureService,
              private readonly maquillageService: MaquillageService,
              private readonly esthetiqueService: EsthetiqueService,
              private readonly soinService: SoinService,
              private readonly authStore: AuthStore,
              @Inject(PLATFORM_ID) private readonly platformId: object,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly dialogService: DialogService,
              private readonly authService: AuthService,
              private readonly companyService: CompanyService) {
}
  ngOnInit() {
  // afficher les input par type
  this.currentEmail = this.route.snapshot.paramMap.get('email');
  this.isCoiffure = this.categories.includes(CategoryLabelEnum.COIFFURE);
  this.initCoiffureCriteres(this.isCoiffure);
  this.isEsthetique = this.categories.includes(CategoryLabelEnum.ESTHETIQUE);
  this.initEsthetiqueCriteres(this.isEsthetique);
  this.isSoin = this.categories.includes(CategoryLabelEnum.SOIN);
  this.initSoinCriteres(this.isSoin);
  this.criteres = this.maquillageService.selectCriteres(this.criteres, CategoryLabelEnum.MAQUILLAGE);
  console.log('selected criteres', this.criteres);
  this.criteres = this.maquillageService.removePrefix(this.criteres, CategoryLabelEnum.MAQUILLAGE);
  this.parsedCriteres = this.maquillageService.initFormValuesWithCriteria(this.criteres);
  this.buildForm();
  }
  initCoiffureCriteres(flag: boolean) {
    if (flag) {
      this.coiffureInitCriteres = this.criteres;
      this.showCoiffureComponent = true;
    }
  }
  initEsthetiqueCriteres(flag: boolean) {
    if (flag) {
      this.esthetiqueInitCriteres = this.criteres;
      this.showEsthetiqueComponent = true;
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
    this.parsedCriteres = await this.maquillageService.addOption(this.parsedCriteres, field);
    this.buildForm();
    this.formBuilder.ngOnInit();
    this.formBuilder.appFieldBuilderComponent.checkBoxChanged(field);
  }
  setFormIsValid(): boolean {
    let formIsValid: boolean = this.formBuilder.form.valid;
    // tslint:disable-next-line:max-line-length
    if (this.isCoiffure && this.showCoiffureComponent) { formIsValid = formIsValid && this.coiffureComponent.formBuilder.form.valid; }
    // tslint:disable-next-line:max-line-length
    if (this.isEsthetique && this.showEsthetiqueComponent) { formIsValid = formIsValid && this.esthetiqueComponent.formBuilder.form.valid; }
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
          if (!!!this.getMissingFieldEsthetique()) {
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
            this.dialogService.openErrorDialog(this.getMissingFieldEsthetique(), true);
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
  const maquillageFormValue = this.formBuilder.form.value;
  const dataObject = this.maquillageService.mapFormValueToCriteria(maquillageFormValue, this.criteres);
  console.log('maquillage data object', dataObject);
  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.MAQUILLAGE,
    this.currentEmail,
    dataObject).subscribe(
      (data) => {
        if (!this.showCoiffureComponent && !this.showEsthetiqueComponent && !this.showSoinComponent) {
          // tslint:disable-next-line:max-line-length
          if (this.authStore.getUser().role === 'provider') {
            this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
          }
          if (this.authStore.getUser().role === 'admin') {
            this.router.navigate([`/administration/${this.authStore.getUser()
                      .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
          }
        }
        if (this.showCoiffureComponent && this.showEsthetiqueComponent && this.showSoinComponent) {
          // tslint:disable-next-line:max-line-length
          if (this.checkBoxChangesAreCheckedCoiffure() && this.checkBoxChangesAreCheckedEsthetique() && this.checkBoxChangesAreCheckedSoin()) {
            const coiffureFormValue = this.coiffureComponent.formBuilder.form.value;
            // tslint:disable-next-line:max-line-length
            const coiffureDataObject = this.coiffureService.mapFormValueToCriteria(coiffureFormValue, this.coiffureComponent.criteres);
            console.log('coiffure data object', coiffureDataObject);
            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.COIFFURE,
              this.currentEmail,
              coiffureDataObject).subscribe(
                (coiffureData) => {
                  const esthetiqueFormValue = this.esthetiqueComponent.formBuilder.form.value;
                  // tslint:disable-next-line:max-line-length
                  const esthetiqueDataObject = this.esthetiqueService.mapFormValueToCriteria(esthetiqueFormValue, this.esthetiqueComponent.criteres);
                  console.log('esthetique data object', esthetiqueDataObject);
                  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.ESTHETIQUE,
                    this.currentEmail,
                    esthetiqueDataObject).subscribe(
                      (esthetiqueData) => {
                        this.submitSecondaryComp(this.soinComponent, CategoryLabelEnum.SOIN, this.soinService);
                      });
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
                  if (!this.showEsthetiqueComponent && !this.showSoinComponent) {
                    // tslint:disable-next-line:max-line-length
                    if (this.authStore.getUser().role === 'provider') {
                      this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
                    }
                    if (this.authStore.getUser().role === 'admin') {
                      this.router.navigate([`/administration/${this.authStore.getUser()
                        .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
                    }
                  }
                  if (this.showEsthetiqueComponent && this.showSoinComponent) {
                    if (this.checkBoxChangesAreCheckedEsthetique() && this.checkBoxChangesAreCheckedSoin()) {
                      const esthetiqueFormValue = this.esthetiqueComponent.formBuilder.form.value;
                      // tslint:disable-next-line:max-line-length
                      const esthetiqueDataObject = this.esthetiqueService.mapFormValueToCriteria(esthetiqueFormValue, this.esthetiqueComponent.criteres);
                      console.log('esthetique data object', esthetiqueDataObject);
                      this.companyService.putServiceByEmailAndService(CategoryLabelEnum.ESTHETIQUE,
                        this.currentEmail,
                        esthetiqueDataObject).subscribe(
                          (esthetiqueData) => {
                            this.submitSecondaryComp(this.soinComponent, CategoryLabelEnum.SOIN, this.soinService);
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
coiffureIsChecked(checked: boolean) {
  if (checked) {
    this.coiffureInitCriteres = this.maquillageService.addPrefix(this.coiffureInitCriteres, CategoryLabelEnum.COIFFURE);
  } else {
    this.coiffureInitCriteres = this.maquillageService.removePrefix(this.coiffureInitCriteres, CategoryLabelEnum.COIFFURE);
  }
  this.showCoiffureComponent = checked;
}
esthetiqueIsChecked(checked: boolean) {
  if (checked) {
    this.esthetiqueInitCriteres = this.maquillageService.addPrefix(this.esthetiqueInitCriteres, CategoryLabelEnum.ESTHETIQUE);
  } else {
    this.esthetiqueInitCriteres = this.maquillageService.removePrefix(this.esthetiqueInitCriteres, CategoryLabelEnum.ESTHETIQUE);
  }
  this.showEsthetiqueComponent = checked;
}
soinIsChecked(checked: boolean) {
  if (checked) {
    this.soinInitCriteres = this.maquillageService.addPrefix(this.soinInitCriteres, CategoryLabelEnum.SOIN);
  } else {
    this.soinInitCriteres = this.maquillageService.removePrefix(this.soinInitCriteres, CategoryLabelEnum.SOIN);
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
