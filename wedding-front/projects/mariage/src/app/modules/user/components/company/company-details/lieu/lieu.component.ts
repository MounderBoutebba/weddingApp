import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { AuthStore } from '../../../../../store/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { LieuService } from './lieu.service';
import { CategoryLabelEnum } from '../category-label.enum';
import { TraiteurService } from '../traiteur/traiteur.service';
import { GateauMariageService } from '../gateau-mariage/gateau-mariage.service';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { newTraiteurCriteres } from '../traiteur/traiteur.interface';
import { newGateauMariageCriteres } from '../gateau-mariage/gateau-mariage.interface';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';
import { FormMapperService } from '../../../../services/form-mapper.service';

@Component({
  selector: 'app-lieu',
  templateUrl: './lieu.component.html',
  styleUrls: ['./lieu.component.scss']
})
export class LieuComponent implements OnInit, AfterViewInit {
  @Input() criteres: any;
  @Input() primaryComponent = true;
  @Input() categories: string[] = [];
  @ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
  @ViewChild('traiteurComponent') traiteurComponent: any;
  @ViewChild('gateauMariageComponent') gateauMariageComponent: any;
  showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showTraiteurComponent = false;
  showGateauMariageComponent = false;
  traiteurInitCriteres: any = newTraiteurCriteres;
  gateauMariageInitCriteres: any = newGateauMariageCriteres;
  public form: FormGroup;
	public isTraiteur: boolean;
	public isGateauMariage: boolean;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
  constructor(private readonly lieuService: LieuService,
              private readonly traiteurService: TraiteurService,
              private readonly gateauMariageService: GateauMariageService,
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
		this.isTraiteur = this.categories.includes(CategoryLabelEnum.TRAITEUR);
		this.initTraiteurCriteres(this.isTraiteur);
		this.isGateauMariage = this.categories.includes(CategoryLabelEnum.GATEAU_MARIAGE);
    this.initGateauMariageCriteres(this.isGateauMariage);
    this.criteres = this.lieuService.selectCriteres(this.criteres, CategoryLabelEnum.LIEU);
		console.log('selected criteres', this.criteres);
		this.criteres = this.lieuService.removePrefix(this.criteres, CategoryLabelEnum.LIEU);
		this.parsedCriteres = this.lieuService.initFormValuesWithLieuCriteria(this.criteres);
		this.buildForm();
  }
  initTraiteurCriteres(isTraiteur: boolean) {
		if (isTraiteur) {
			this.traiteurInitCriteres = this.criteres;
			this.showTraiteurComponent = true;
		}
	}
  initGateauMariageCriteres(isGateauMariag: boolean) {
		if (isGateauMariag) {
			this.gateauMariageInitCriteres = this.criteres;
			this.showGateauMariageComponent = true;
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
		this.parsedCriteres = await this.lieuService.addOption(this.parsedCriteres, field);
		this.buildForm();
    this.formBuilder.ngOnInit();
    this.formBuilder.appFieldBuilderComponent.checkBoxChanged(field);
  }
  setFormIsValid(): boolean {
    let formIsValid: boolean = this.formBuilder.form.valid;
    if (this.isTraiteur && this.showTraiteurComponent) { formIsValid = formIsValid && this.traiteurComponent.formBuilder.form.valid; }
    // tslint:disable-next-line:max-line-length
    if (this.isGateauMariage && this.showGateauMariageComponent) { formIsValid = formIsValid && this.gateauMariageComponent.formBuilder.form.valid; }
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
  checkBoxChangesAreCheckedTraiteur(): boolean {
		let checkBoxIsRequired = true;
		this.traiteurComponent.parsedCriteres.forEach( field => {
			if (field.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
				checkBoxIsRequired = checkBoxIsRequired
										  && !!field.options.filter( opt => opt.value === true ).length;
			}
		});
		return checkBoxIsRequired;
  }
  checkBoxChangesAreCheckedGateau(): boolean {
		let checkBoxIsRequired = true;
		this.gateauMariageComponent.parsedCriteres.forEach( field => {
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
  getMissingFieldTraiteur(): string {
    let missingField = '';
    if (this.showTraiteurComponent) {
      console.log('traiteur criteres', this.traiteurComponent.parsedCriteres);
      this.traiteurComponent.parsedCriteres.slice().reverse().forEach( field => {
        const hasCheckedOpt = !!field.options.filter( opt => opt.value === true ).length;
        if (field.type === FieldTypeEnum.CHECK_BOX && !hasCheckedOpt) {
          missingField = field.displayName;
        }
      });
    }
    console.log('missingField traiteur', missingField);
    return missingField;
  }
  getMissingFieldGateau(): string {
    let missingField = '';
    if (this.showGateauMariageComponent) {
      console.log('gateaux criteres', this.gateauMariageComponent.parsedCriteres);
      this.gateauMariageComponent.parsedCriteres.slice().reverse().forEach( field => {
        const hasCheckedOpt = !!field.options.filter( opt => opt.value === true ).length;
        if (field.type === FieldTypeEnum.CHECK_BOX && !hasCheckedOpt) {
          missingField = field.displayName;
        }
      });
    }
    return missingField;
  }
  formSubmitted() {
    if (!!!this.getMissingField()) {
      if (!!!this.getMissingFieldTraiteur()) {
        if (!!!this.getMissingFieldGateau()) {
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
          this.dialogService.openErrorDialog(this.getMissingFieldGateau(), true);
        }
      } else {
        this.dialogService.openErrorDialog(this.getMissingFieldTraiteur(), true);
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
		const lieuFormValue = this.formBuilder.form.value;
		const dataObject = this.lieuService.mapFormValueToLieuCriteria(lieuFormValue, this.criteres);
  console.log('lieu data object', dataObject);
  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.LIEU,
      this.currentEmail,
      dataObject).subscribe(
        (data) => {
          if (!this.showTraiteurComponent && !this.showGateauMariageComponent) {
            // tslint:disable-next-line:max-line-length
            if (this.authStore.getUser().role === 'provider') {
              this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
            }
            if (this.authStore.getUser().role === 'admin') {
              this.router.navigate([`/administration/${this.authStore.getUser()
                      .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
            }
          }
          if (this.showTraiteurComponent && this.showGateauMariageComponent) {
            if (this.checkBoxChangesAreCheckedTraiteur() && this.checkBoxChangesAreCheckedGateau()) {
              const traiteurFormValue = this.traiteurComponent.formBuilder.form.value;
              // tslint:disable-next-line:max-line-length
              const traiteurDataObject = this.traiteurService.mapFormValueToTraiteurCriteria(traiteurFormValue, this.traiteurComponent.criteres);
              console.log('traiteur data object', traiteurDataObject);
              this.companyService.putServiceByEmailAndService(CategoryLabelEnum.TRAITEUR,
                this.currentEmail,
                traiteurDataObject).subscribe(
                  (traiteurData) => {
                    const gateauFormValue = this.gateauMariageComponent.formBuilder.form.value;
                    // tslint:disable-next-line:max-line-length
                    const gateauDataObject = this.gateauMariageService.mapFormValueToGateauMariageCriteria(gateauFormValue, this.gateauMariageComponent.criteres);
                    console.log('gateau data object', gateauDataObject);
                    this.companyService.putServiceByEmailAndService(CategoryLabelEnum.GATEAU_MARIAGE,
                      this.currentEmail,
                      gateauDataObject).subscribe(
                        (gateauData) => {
                          // tslint:disable-next-line:max-line-length
                          if (this.authStore.getUser().role === 'provider') {
                            this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${gateauData.company.categories[0]}`]);
                          }
                          if (this.authStore.getUser().role === 'admin') {
                            this.router.navigate([`/administration/${this.authStore.getUser()
                        .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
                          }
                        });
                  });
            } else {
              this.dialogService.openErrorDialog('please fill the missing information');
            }
          } else if (this.showTraiteurComponent) {
            if (this.checkBoxChangesAreCheckedTraiteur()) {
              const traiteurFormValue = this.traiteurComponent.formBuilder.form.value;
              // tslint:disable-next-line:max-line-length
              const traiteurDataObject = this.traiteurService.mapFormValueToTraiteurCriteria(traiteurFormValue, this.traiteurComponent.criteres);
              console.log('traiteur data object', traiteurDataObject);
              this.companyService.putServiceByEmailAndService(CategoryLabelEnum.TRAITEUR,
                this.currentEmail,
                traiteurDataObject).subscribe(
                  (traiteurData) => {
                    // tslint:disable-next-line:max-line-length
                    if (this.authStore.getUser().role === 'provider') {
                      this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${traiteurData.company.categories[0]}`]);
                    }
                    if (this.authStore.getUser().role === 'admin') {
                      this.router.navigate([`/administration/${this.authStore.getUser()
                        .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
                    }
                  });
            } else {
              this.dialogService.openErrorDialog('please fill the missing information');
            }


          } else if (this.showGateauMariageComponent) {
            if (this.checkBoxChangesAreCheckedGateau()) {
              const gateauFormValue = this.gateauMariageComponent.formBuilder.form.value;
              // tslint:disable-next-line:max-line-length
              const gateauDataObject = this.gateauMariageService.mapFormValueToGateauMariageCriteria(gateauFormValue, this.gateauMariageComponent.criteres);
              console.log('gateau data object', gateauDataObject);
              this.companyService.putServiceByEmailAndService(CategoryLabelEnum.GATEAU_MARIAGE,
                this.currentEmail,
                gateauDataObject).subscribe(
                  (gateauData) => {
                    // tslint:disable-next-line:max-line-length
                    if (this.authStore.getUser().role === 'provider') {
                      this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${gateauData.company.categories[0]}`]);
                    }
                    if (this.authStore.getUser().role === 'admin') {
                      this.router.navigate([`/administration/${this.authStore.getUser()
                        .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
                    }
                  });
            } else {
              this.dialogService.openErrorDialog('please fill the missing information');
            }


          }
        });
  }
  traiteurIsChecked(checked: boolean) {
    if (checked) {
      this.traiteurInitCriteres = this.lieuService.addPrefix(this.traiteurInitCriteres, CategoryLabelEnum.TRAITEUR);
    } else {
      this.traiteurInitCriteres = this.lieuService.removePrefix(this.traiteurInitCriteres, CategoryLabelEnum.TRAITEUR);
    }
    this.showTraiteurComponent = checked;
	}
  gateauMariageIsChecked(checked: boolean) {
    if (checked) {
      this.gateauMariageInitCriteres = this.lieuService.addPrefix(this.gateauMariageInitCriteres, CategoryLabelEnum.GATEAU_MARIAGE);
    } else {
      this.gateauMariageInitCriteres = this.lieuService.removePrefix(this.gateauMariageInitCriteres, CategoryLabelEnum.GATEAU_MARIAGE);
    }
		  this.showGateauMariageComponent = checked;
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
