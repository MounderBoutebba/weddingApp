import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DisponibilityService } from '../../services/disponibility.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/fr';
import { LocaleConfig } from 'ngx-daterangepicker-material';
import { compareAsc, isWithinInterval } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

export enum DiponibilityType {
  RESERVED = 'reserved',
  ABSENT = 'absent',
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  public static disponibilities = [];
  public company: any;
  public calendarForm: FormGroup;
  public routerSubscription: Subscription;

  public locales: LocaleConfig = {
    clearLabel: this.translateService.instant('Clear'),
    applyLabel: this.translateService.instant('Save'),
    separator: ' à ',
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: moment.localeData().firstDayOfWeek()
  };
  public minDate = moment();
  public range: any;

  constructor(
    private route: ActivatedRoute,
    private disponibilityService: DisponibilityService,
    private fb: FormBuilder,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {
    moment.locale('fr');
  }

  public ngOnInit(): void {
    this.calendarForm = this.fb.group({
      start: ['', Validators.compose([Validators.required])],
      end: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])]
    });
    this.routerSubscription = this.route.data.pipe(map(data => data.company)).subscribe(data => {
      this.company = data;
      this.company.disponibility = this.company.disponibility.map(res => {
        res.start = new Date(res.start);
        res.end = new Date(res.end);
        return res;
      });
      CalendarComponent.disponibilities=this.company.disponibility;
      console.log(this.company)
    });
  }

  public deleteIndisponibility(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      const conf = confirm(`Êtes-vous sûr d'annuler cette demande`);
      if (conf) {
        this.disponibilityService.deleteAbsence(this.company.user.email, this.company.id, id)
          .subscribe(res => {
            this.toastrService.success(`La reservation est annulée avec succès`);
            this.company.disponibility = this.company.disponibility.filter(data => data.id !== id);
            CalendarComponent.disponibilities = this.company.disponibility;
          });
      }
    }
  }

  public addIndisponibility() {
    if (this.calendarForm.valid) {
      this.disponibilityService.createAbsence(this.company.user.email, this.company.id, this.calendarForm.value).subscribe((res: any) => {
        res.data.start = new Date(res.data.start);
        res.data.end = new Date(res.data.end);
        this.company.disponibility.push(res.data);
        this.company.disponibility.sort((a, b) => {
          return compareAsc(a.start, b.start);
        });
        CalendarComponent.disponibilities = this.company.disponibility;
        this.toastrService.success('Ajouté avec succès');
        this.range = null;
        this.calendarForm.reset();
      });
    } else {
      this.toastrService.error('Formulaire invalid');
    }
  }

  public choosedDate($event: { startDate: Moment, endDate: Moment }) {
    if (!$event.startDate) {
      this.calendarForm.get('start').reset();
      this.calendarForm.get('end').reset();
    }else{
      this.calendarForm.patchValue({
        start: $event.startDate?.toDate(),
        end: $event.endDate?.toDate()
      });
    }
  }

  public filterDays(calendarDate: Moment): boolean {
    const date = calendarDate.toDate();
    const results = CalendarComponent.disponibilities.map((ranges) => {
      return isWithinInterval(
        date,
        { start: new Date(ranges.start), end: new Date(ranges.end) }
      );
    }).filter(value => !!value);
    return results.length > 0;
  }

  public ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.routerSubscription.unsubscribe();
    }
  }

}
