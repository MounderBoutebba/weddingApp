import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';

@Component({
  selector: 'app-add-toggle-option-dialog',
  templateUrl: './add-toggle-option-dialog.component.html',
  styleUrls: ['./add-toggle-option-dialog.component.scss']
})
export class AddToggleOptionDialogComponent implements OnInit {
  public isHandset$: Observable<boolean>;
  public form: FormGroup;
  public description = 'Add a New Option';
  public fieldType;
  FieldTypeEnum = FieldTypeEnum;
  label = 'Indiquez le nom du nouveau format';
  toggleNumberListNameLabel = '';
  toggleNumberListDescriptionLabel = '';
  dialogContentHeight = '16vh';
  numberValue = 'Value';
  vehicleOptions: {name: string, value: number, unit: string, step: number}[] = [
    {name: `Tarif par jour`, value: 80, step: 10, unit: `€`},
    {name: `Kilométrage inclus`, value: 100, step: 100, unit: `KM`},
    {name: `Distance location max`, value: 900, step: 100, unit: `KM`},
    {name: `Tarif / Kilomètre sup`, value: 3, step: 1, unit: `€`},
  ];
  vehicleCategories: string [] = [];
  showMoreOptionsCategories = false;
  constructor(public dialogRef: MatDialogRef<AddToggleOptionDialogComponent>,
              @Optional()  @Inject(MAT_DIALOG_DATA) public data: any,
              private readonly fb: FormBuilder,
              private readonly breakpointObserver: BreakpointObserver) {
      this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(map(result => result.matches));
  }

  ngOnInit() {
    this.fieldType = this.data.type;
    this.description = this.data.description;
    this.buildForm();
    this.setToggleNumberListLabel();
  }
  setToggleNumberListLabel() {
    if (this.fieldType === FieldTypeEnum.TOGGLE_NUMBER_LIST) {
      this.dialogContentHeight = '35vh';
      if (this.description === 'Animations') {
        this.toggleNumberListNameLabel = `Indiquez le nom de l'animation`;
        this.toggleNumberListDescriptionLabel = `Renseignez une petite description de l'animation`;
      } else if (this.description === 'Matériels') {
        this.toggleNumberListNameLabel = `Indiquez le nom du matériel`;
        this.toggleNumberListDescriptionLabel = `Renseignez une petite description du matériel`;
      } else if (this.description === 'Lâchers') {
        this.toggleNumberListNameLabel = `Indiquez le nom du Lâcher`;
        this.toggleNumberListDescriptionLabel = `Tarif de l'option`;
      } else if (this.description === 'Produits Salés' || this.description === 'Produits Sucrés'
      || this.description === 'Entrées' || this.description === 'Plats' || this.description === 'Accompagnements'
      || this.description === 'Fromages' || this.description === 'Désserts' || this.description === 'Boissons Alcoolisés'
      || this.description === 'Boissons non-Alcoolisés') {
        this.toggleNumberListNameLabel = `Indiquez le nom du produit`;
        this.toggleNumberListDescriptionLabel = `Tarif unitaire`;
      }
    } else if (this.fieldType === FieldTypeEnum.TOGGLE_VIN_HONNEUR_COCKTAIL_BUFFET ||
                this.fieldType === FieldTypeEnum.TOGGLE_DINNER) {
      this.dialogContentHeight = '34vh';
      if (this.description === 'Produits salés' || this.description === 'Produits sucrés'
      || this.description === 'Entrées' || this.description === 'Plats' || this.description === 'Accompagnements'
      || this.description === 'Fromages' || this.description === 'Desserts') {
        this.toggleNumberListNameLabel = `Indiquez le nom du produit`;
        this.toggleNumberListDescriptionLabel = `Renseignez une petite description du produit`;
      }
    } else if (this.fieldType === FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES) {
      this.dialogContentHeight = '20vh';
      if (this.description === 'Produits et accessoires') {
        this.toggleNumberListNameLabel = `Indiquez le nom du produit`;
      } else if (this.description === 'Fleurs') {
        this.toggleNumberListNameLabel = `Indiquez le nom de la fleur`;
      } else if (this.description === 'Feuillages') {
        this.toggleNumberListNameLabel = `Indiquez le nom du feuillage`;
      } else if (this.description === 'Décorations') {
        this.toggleNumberListNameLabel = `Indiquez le nom de la décoration`;
      }
    } else if (this.fieldType === FieldTypeEnum.TOGGLE_PRESTATIONS) {
      this.dialogContentHeight = '34vh';
      if (this.description === 'Coiffure') {
        this.toggleNumberListNameLabel = `Ajouter une prestation coiffure`;
      } else if (this.description === 'Technique') {
        this.toggleNumberListNameLabel = `Ajouter une prestation technique`;
      } else if (this.description === 'Mains') {
        this.toggleNumberListNameLabel = `Ajouter une prestation ésthétique pour les mains`;
      } else if (this.description === 'Pieds') {
        this.toggleNumberListNameLabel = `Ajouter une prestation ésthétique pour les pieds`;
      } else if (this.description === 'Corps') {
        this.toggleNumberListNameLabel = `Ajouter une prestation ésthétique pour le corps`;
      } else if (this.description === 'corps') {
        this.toggleNumberListNameLabel = `Ajouter une prestation soins pour le corps`;
      } else if (this.description === 'visage') {
        this.toggleNumberListNameLabel = `Ajouter une prestation soins pour le visage`;
      } else if (this.description === 'jambes') {
        this.toggleNumberListNameLabel = `Ajouter une prestation soins pour les jambes`;
      }
    } else if (this.fieldType === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
      this.dialogContentHeight = '31vh';
      if (this.description === 'Retouches Photo' || this.description === 'Majoration type de cheveaux') {
        this.label = `Indiquez le nom de l'option`;
      } else if (this.description === 'Produits et accessoires') {
        this.label = `Indiquez le nom du produit`;
      } else if (this.description === 'Prestations coiffure et/ou technique pour les invités') {
        this.label = `Ajouter une prestations coiffure et/ou technique`;
      } else if (this.description === 'Esthétique' || this.description === 'Épilation') {
        this.label = `Ajouter une prestations esthétique`;
      } else if (this.description === 'Soins') {
        this.label = `Ajouter une prestations soins`;
      }
    } else if (this.fieldType === FieldTypeEnum.TOGGLE_NUMBER_LIST_OPTIONS) {
      this.dialogContentHeight = '35vh';
      if (this.description === 'Gâteaux') {
        this.toggleNumberListNameLabel = `Indiquez le nom du produit`;
        this.toggleNumberListDescriptionLabel = `Renseignez une petite description du produit`;
      }
    } else if (this.fieldType === FieldTypeEnum.TOGGLE_VOITURE_LIST) {
      this.dialogContentHeight = '65vh';
      if (this.description === 'Voitures') {
        this.toggleNumberListNameLabel = `Indiquez la marque et modèle du véhicule`;
        this.toggleNumberListDescriptionLabel = `Renseignez une petite description du véhicule`;
      } else if (this.description === 'Bus') {
        this.toggleNumberListNameLabel = `Indiquez la marque et modèle du bus`;
        this.toggleNumberListDescriptionLabel = `Renseignez une petite description du véhicule`;
      }
    } else if (this.fieldType === FieldTypeEnum.TOGGLE_LIST) {
      this.dialogContentHeight = '15vh';
      if (this.description === 'Équipements') {
        this.label = `Indiquez le nom de l'équipement`;
      }
    } else if (this.fieldType === FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST) {
      this.dialogContentHeight = '27vh';
      if (this.description === 'Effets') {
        this.label = `Indiquez le nom de l'effet`;
        this.numberValue = `Tarif de l'option`;
      } else if (this.description === 'Services' || this.description === 'Services associés') {
        this.label = `Indiquez le nom du service`;
      } else if (this.description === 'Activités') {
        this.label = `Indiquez le nom de l'activité`;
      } else if (this.description === 'Décorations associées') {
        this.label = `Indiquez le nom de la décoration`;
      } else if (this.description === 'Programmes') {
        this.label = `Indiquez le nom du programme`;
        this.numberValue = `Tarif de l'option`;
      } else if (this.description === 'Compléments') {
        this.label = `Indiquez le nom du complément`;
        this.numberValue = `Tarif de l'option`;
      }
    }
  }
  buildForm() {
    if (this.fieldType === FieldTypeEnum.TOGGLE_LIST || this.fieldType === FieldTypeEnum.CHECKBOX_NUMBER_LIST
        || this.fieldType === FieldTypeEnum.TOGGLE_FORMATS_LIST
        ) {
      const value = this.fieldType === FieldTypeEnum.CHECKBOX_NUMBER_LIST && this.description === 'Modèle de pages' ? '1' : '';
      const validators = this.fieldType === FieldTypeEnum.CHECKBOX_NUMBER_LIST && this.description === 'Modèle de pages' ?
      [Validators.required, Validators.maxLength(255)] : [Validators.required, Validators.maxLength(255), Validators.minLength(3)];
      this.form = this.fb.group({
        label: [value, Validators.compose(validators)],
      });
    } else if (this.fieldType === FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST) {
      this.form = this.fb.group({
        label: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(3)
        ])],
        inclusDansPrix: [false, Validators.compose([Validators.required])],
        value: ['2', Validators.compose([
          Validators.required,
        ])]
      });
    } else if (this.fieldType === FieldTypeEnum.TOGGLE_NUMBER_LIST
              || this.fieldType === FieldTypeEnum.TOGGLE_VIN_HONNEUR_COCKTAIL_BUFFET
              || this.fieldType === FieldTypeEnum.TOGGLE_DINNER) {
      this.form = this.fb.group({
        label: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(3)
        ])],
        description: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(3)
        ])],
        value: ['2', Validators.compose([
          Validators.required,
        ])]
      });
    } else if (this.fieldType === FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES
              || this.fieldType === FieldTypeEnum.TOGGLE_PRESTATIONS) {
      this.form = this.fb.group({
        label: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(3)
        ])],
        value: ['2', Validators.compose([
          Validators.required,
        ])]
      });
    } else if (this.fieldType === FieldTypeEnum.TOGGLE_NUMBER_LIST_OPTIONS) {
      this.form = this.fb.group({
        label: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(3)
        ])],
        description: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(3)
        ])],
      });
    } else if (this.fieldType === FieldTypeEnum.TOGGLE_VOITURE_LIST) {
      this.vehicleCategories = this.description === `Voitures` ?
      [
        `Haute de gamme`,
        `Voiture de collection`,
        `Limousine`,
        `Sportive`,
        `Calèche`,
      ]
      : [
        `Van`,
        `Microbus`,
        `Minimus`,
        `Midimus`,
      ];
      const categorie = this.vehicleCategories[0];
      this.form = this.fb.group({
        label: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(3)
        ])],
        description: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(3)
        ])],
        categorie: [categorie, Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(3)
        ])],
        tarifParJour: ['80', Validators.compose([
          Validators.required,
        ])],
        kilometrageInclus: ['100', Validators.compose([
          Validators.required,
        ])],
        distance: ['900', Validators.compose([
          Validators.required,
        ])],
        tarifParKilometre: ['3', Validators.compose([
          Validators.required,
        ])],
      });
    } else {
      this.form = this.fb.group({
        label: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(3)
        ])],
        value: ['', Validators.compose([
          Validators.required,
        ])]
      });
    }
  }
  cancel() {
    this.data = {cancel: true};
    this.dialogRef.close(this.data);
  }
  save() {
    if (this.form.valid) {
      if (this.fieldType === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
          const tarifUnitaire = +this.form.controls['value'].value;
          let name = String(this.form.controls['label'].value).replace(/ /g, '_');
          name = name.replace(/(é|è)/g, 'e');
          name = name.replace(/(')/g, '');
          const option = {name, tarifUnitaire};
          this.data = {save: true, option};
          this.dialogRef.close(this.data);
      } else if (this.fieldType === FieldTypeEnum.CHECK_BOX_NUMBER) {
          const tarif = +this.form.controls['value'].value;
          const label = String(this.form.controls['label'].value);
          let key = String(this.form.controls['label'].value).replace(/ /g, '_');
          key = key.replace(/(é|è)/g, 'e');
          key = key.replace(/(')/g, '');
          const option = {key, tarif, label};
          this.data = {save: true, option};
          this.dialogRef.close(this.data);
      } else if (this.fieldType === FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST) {
        const name = String(this.form.controls['label'].value);
        const value = +this.form.controls['value'].value;
        const inclusDansPrix = this.form.controls['inclusDansPrix'].value;
        const option = {name, value, inclusDansPrix};
        this.data = {save: true, option};
        this.dialogRef.close(this.data);
      } else if (this.fieldType === FieldTypeEnum.TOGGLE_NUMBER_LIST
        || this.fieldType === FieldTypeEnum.TOGGLE_VIN_HONNEUR_COCKTAIL_BUFFET
        || this.fieldType === FieldTypeEnum.TOGGLE_DINNER) {
        const tarif = +this.form.controls['value'].value;
        const name = String(this.form.controls['label'].value);
        const description = String(this.form.controls['description'].value);
        const option = {tarif, name, description};
        this.data = {save: true, option};
        this.dialogRef.close(this.data);
      } else if (this.fieldType === FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES
                 || this.fieldType === FieldTypeEnum.TOGGLE_PRESTATIONS) {
        const tarif = +this.form.controls['value'].value;
        const name = String(this.form.controls['label'].value);
        const option = {tarif, name};
        this.data = {save: true, option};
        this.dialogRef.close(this.data);
      } else if (this.fieldType === FieldTypeEnum.TOGGLE_NUMBER_LIST_OPTIONS) {
        const name = String(this.form.controls['label'].value);
        const description = String(this.form.controls['description'].value);
        const option = {name, description};
        this.data = {save: true, option};
        this.dialogRef.close(this.data);
      } else if (this.fieldType === FieldTypeEnum.TOGGLE_VOITURE_LIST) {
        const name = String(this.form.controls['label'].value);
        const description = String(this.form.controls['description'].value);
        const categorie = String(this.form.controls['categorie'].value);
        const numberOptions = {
          tarifParJour: +this.form.controls['tarifParJour'].value,
          kilometrageInclus: +this.form.controls['kilometrageInclus'].value,
          distance: +this.form.controls['distance'].value,
          tarifParKilometre: +this.form.controls['tarifParKilometre'].value,
        };
        const option = {name, description, numberOptions, categorie};
        this.data = {save: true, option};
        this.dialogRef.close(this.data);
      } else if (this.fieldType === FieldTypeEnum.TOGGLE_LIST
        || this.fieldType === FieldTypeEnum.TOGGLE_FORMATS_LIST) {
        const name = String(this.form.controls['label'].value);
        const option = {name};
        this.data = {save: true, option};
        this.dialogRef.close(this.data);
      } else if (this.fieldType === FieldTypeEnum.CHECKBOX_NUMBER_LIST) {
        let name = '';
        if (this.description === 'Modèle de pages') {
          name = String(this.form.controls['label'].value);
          name = `${name} pages`;
        } else {
          name = String(this.form.controls['label'].value);
        }
        const option = {name};
        this.data = {save: true, option};
        this.dialogRef.close(this.data);
      }
    }
  }
}
