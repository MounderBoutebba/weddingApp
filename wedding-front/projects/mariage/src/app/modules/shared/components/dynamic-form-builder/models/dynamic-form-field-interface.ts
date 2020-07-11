export interface DynamicFormFieldInterface {
    type: string;
    name: string;
    displayName: string;
    secondaryLabel?: string;
    secondaryDisplayName?: string;
    radioCriteriaName?: string;
    radioCriteriaLabel?: string;
    radioCriteria?: any;
    label: string;
    value?: any;
    placeholder?: string;
    radioValue?: string;
    required: boolean;
    multiline?: boolean;
    showAddFieldBtn?: boolean;
    // tslint:disable-next-line:max-line-length
    products?: {name: string, options: {field?: string,search?: string,value: boolean,name: string,label: string,tarif: number,step?: number,unit?: string}[]}[],
    quantity?: number;
    dinerCapacite?: number;
    capacite?: number;
    convivesMin?: number;
    tarifs?: {label: string, step: number, value: number, unit: string}[];
    finitions?: {key: string, value: boolean}[];
    checkbox?: {name: string, label: string};
    livraison?: {value: boolean, tarif: number, displayName: string, label: string};
    // tslint:disable-next-line:max-line-length
    prestations?: {name: string, field?: string, search?: string, options: {name: string, label?: string, tarif: number, step?: number, unit?: string}[]}[];
    // tslint:disable-next-line:max-line-length
    formats?: {name: string, label: string, modeles: {name: string, tarif: number, label: string, unit: string, step: number, checked?: boolean}[], value?: boolean}[];
    // tslint:disable-next-line:max-line-length
    voitures?: {value: boolean, name: string, label: string, categorie: string, options: {name: string, value: number, unit: string, step: number}[], nbrPlace?: number}[];
    // tslint:disable-next-line:max-line-length
    optionsToggleFormatsList?: {value: boolean, name: string, label: string, numberOption: {name: string, value: number, label: string, unit: string, step: number}[]}[];
    // tslint:disable-next-line:max-line-length
    optionsToggleNumberListOptions?: {value: boolean, name: string, label: string, opts: {name: string, value: number, step: number, unit: string}[]}[];

    // tslint:disable-next-line:max-line-length
    optionsToggleNumberRadioList?: {value: boolean, name: string, label: string, inclusDansPrix: boolean, tarif: number, numberOption: {value: number, label: string, unit: string, step: number}}[];
    // tslint:disable-next-line:max-line-length
    optionsToggleNumberList?: {value: boolean, name: string, label: string, tarif: number, numberOption: {value: number, label: string, unit: string, step: number}}[];
    optionsToggleList?: {value: boolean, name: string, label: string}[];
    options?: {key: string, label: string, value?: any}[];
    majOptions?: {name: string; majoration: number, label: string, step?: number, unit?: string}[];
    // tslint:disable-next-line:max-line-length
    produitsOptions?: {name: string; tarif: number, label: string, field: string, search: string, checked: boolean, step?: number, unit?: string}[];
    checkboxNumberOptions?: {key: string, label: string, value?: any, tarif: number,
        numberOpt: {value?: number, label: string, unit: string, step: number}}[];
    numberOptions?: {value: number, label: string, unit: string, step: number}[];
    numberOptionsTime?: {label: string, hourValue: number, minValue: number, step: number, value?: boolean}[];
    radioNumberOptions?: {value: number, label: string, unit: string, step: number}[];
    numberCheckBoxOptions?: {name: string, displayName: string, label: string, options: {key: string, label: string, value?: any}[]};
    // tslint:disable-next-line:max-line-length
    numberCheckBoxOptionsNumber?: {name: string, displayName: string, label: string, options: {value: number, label: string, unit: string, step: number}[]};
    // tslint:disable-next-line:max-line-length
    numberCheckBoxOptionsNumber2?: {name: string, displayName: string, label: string, options: {value: number, label: string, unit: string, step: number}[]};
    nbrOpt?: {value: number, label: string, unit: string, step: number};
    // tslint:disable-next-line:max-line-length
    numberCheckBoxOptionsNumber3?: {name: string, displayName: string, label: string, options: {value: number, label: string, unit: string, step: number}[]};
    // tslint:disable-next-line:max-line-length
    numberCheckBoxOptionsNumber4?: {name: string, displayName: string, label: string, options: {value: number, label: string, unit: string, step: number}[]};
}
