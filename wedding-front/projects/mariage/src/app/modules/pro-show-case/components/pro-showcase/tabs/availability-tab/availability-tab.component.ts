import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../../../../user/models/company.model';
import { CategoryLabelEnum } from '../../../../../user/components/company/company-details/category-label.enum';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/fr';
import { LocaleConfig } from 'ngx-daterangepicker-material';
import { isWithinInterval } from 'date-fns';

@Component({
  selector: 'app-availability-tab',
  templateUrl: './availability-tab.component.html',
  styleUrls: ['./availability-tab.component.scss']
})
export class AvailabilityTabComponent implements OnInit {

  constructor() {
    moment.locale('fr');
  }

  public static disponibilities = [];

  @Input() companyDescriptionInfo: Company;

  public categoryLabelEnum = CategoryLabelEnum;
  public locales: LocaleConfig = {
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: moment.localeData().firstDayOfWeek()
  };
  public minDate = moment();

  ngOnInit(): void {
    // @ts-ignore
    AvailabilityTabComponent.disponibilities = this.companyDescriptionInfo.company.disponibility;
  }

  public filterDays(calendarDate: Moment): boolean {
    const date = calendarDate.toDate();
    const results = AvailabilityTabComponent.disponibilities.map((ranges) => {
      return isWithinInterval(
        date,
        { start: new Date(ranges.start), end: new Date(ranges.end) }
      );
    }).filter(value => !!value);
    return results.length > 0;
  }

}
