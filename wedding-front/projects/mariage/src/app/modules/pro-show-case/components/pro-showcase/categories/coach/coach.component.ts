import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { CoachBookingInterface, bookingObj } from './coach.booking.interface';
import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';
import { BookingStore } from 'projects/mariage/src/app/modules/store/booking';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
  @Input() searchedCategory: string;
  isCoach: boolean;
  coachIsChecked: boolean;
  bookingObject: CoachBookingInterface = bookingObj;
  optionDivers: any;
  feeType = FeeType;
  showMoreServices: boolean;
  showMoreTypesDeSport: boolean;
  servicesAssocies: {name: string, value: boolean, label: string}[] = [];
  constructor(private readonly bookingStore: BookingStore) { }

  ngOnInit(): void {
    console.log('criteres',this.companyDescriptionInfo.criteres);
    this.showMoreServices = false;
    this.showMoreTypesDeSport = false;
    this.isCoach = this.setIsCoach(this.companyDescriptionInfo.company.categories);
    this.initBookingObject(this.searchedCategory === CategoryLabelEnum.COACH);
  }
  setIsCoach(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.COACH).length;
  }
  checkboxChanged(key: string, option: string) {
    const include = this.bookingObject.coach[key].includes(option);
    if (include) {
      this.bookingObject.coach[key] = this.bookingObject.coach[key].filter( opt => opt !== option );
    } else {
      this.bookingObject.coach[key].push(option);
    }
    this.bookingObjectChanged();
  }
  numberInputChangeValue(prefix: string, action: string, key: string, step: number, decLimit?: number) {
    if (action === 'increment') {
			this.bookingObject[prefix][key] += step;
		} else if (action === 'decrement') {
			this.bookingObject[prefix][key] -= step;
			this.bookingObject[prefix][key] =
				this.bookingObject[prefix][key] < decLimit ? decLimit : this.bookingObject[prefix][key];
    }
    this.bookingObjectChanged();
  }
  toggleChangeService(opt: string, value: boolean) {
    this.servicesAssocies.find(o => o.name === opt).value = value;
    this.bookingObjectChanged();
  }
  initBookingObject(coachIsChecked: boolean) {
    this.coachIsChecked = coachIsChecked;
    if (this.isCoach && this.coachIsChecked) {
      this.bookingObject.coach.durreDeLaMission = this.companyDescriptionInfo?.criteres?.coachSportif_dureeMin;

      if (!!this.companyDescriptionInfo?.criteres?.coachSportif_servicesAssocies.options.length) {
        this.companyDescriptionInfo?.criteres?.coachSportif_servicesAssocies.options.forEach(option => {
          if (option.value) {
            this.servicesAssocies.push({name: option.name, value: false, label: `Obtenir ce service`});
          }
        });
        console.log('servicesAssocies', this.servicesAssocies);
      }
    } else {
      this.bookingObject = bookingObj;
    }
    if (this.companyDescriptionInfo?.company?.options?.length) {
			this.optionDivers = [];
			this.companyDescriptionInfo?.company?.options.forEach(opt => {
				const index = this.optionDivers?.findIndex(option => option.name === opt.name);
				if (index === -1) {
					if (opt.feeType === FeeType.UNIT_FEE) {
						this.optionDivers.push({
							id: opt.id,
							name: opt.name,
							description: opt.description,
							optionRate: opt.optionRate,
							feeType: opt.feeType,
							checked: false,
							examplaire: 1,
							categories: opt.categories,
						});
					} else {
						this.optionDivers.push({
							id: opt.id,
							name: opt.name,
							description: opt.description,
							optionRate: opt.optionRate,
							feeType: opt.feeType,
							checked: false,
							categories: opt.categories,
						});
					}
				}
			});
		}
    this.bookingObjectChanged();
  }
  numberInputChangeValueObjectComplex(
		prefix: string,
		action: string,
		key: string,
		step: number,
		index: number,
		decLimit?: number
	) {
		if (!!prefix) {
			if (action === 'increment') {
				this.bookingObject[prefix][key][index].nbrPieces += step;
			} else if (action === 'decrement') {
				this.bookingObject[prefix][key][index].nbrPieces -= step;
				// tslint:disable-next-line:max-line-length
				this.bookingObject[prefix][key][index].nbrPieces =
					this.bookingObject[prefix][key][index].nbrPieces < decLimit
						? decLimit
						: this.bookingObject[prefix][key][index].nbrPieces;
			}
		} else {
			// option divers

			if (action === 'increment') {
				this.optionDivers[index].examplaire += step;
			} else if (action === 'decrement') {
				this.optionDivers[index].examplaire -= step;
				this.optionDivers[index].examplaire =
					this.optionDivers[index].examplaire < decLimit
						? decLimit
						: this.optionDivers[index].examplaire;
			}
		}
		this.bookingObjectChanged();
  }
  toggleChange(key: string, value) {
    if (value) {
      this.bookingObject.coach[key] = value;
    } else {
      delete this.bookingObject.coach[key];
    }
    this.bookingObjectChanged();
  }
  optionContainCategory(optId: string, category: string): boolean {
		return this.optionDivers.find( opt => opt.id === optId).categories.includes(category);
  }
  toggleChangeOptionDivers(value: boolean, item: any) {
		const index = this.optionDivers.findIndex(opt => opt.id === item.id);
		this.optionDivers[index].checked = value;
		this.bookingObjectChanged();
	}
  stripUnnecessaryValues() {
    if (!!this.servicesAssocies.length) {
      this.bookingObject.coach.servicesAssocies = this.servicesAssocies.filter( opt => opt.value);
    }
    this.bookingObject.optionDivers = this.optionDivers?.filter(opt => opt.checked);
  }
  bookingObjectChanged() {
		this.stripUnnecessaryValues();
		this.bookingStore.setBookingObj(this.bookingObject);
  }
}
