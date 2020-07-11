import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { ServicesService } from '../../services/services.service';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'ng5-slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { distinctUntilChanged } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AgmMarker, LatLngBounds } from '@agm/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/fr';
import { LocaleConfig } from 'ngx-daterangepicker-material';
import { isPlatformBrowser } from '@angular/common';
import { PaginatorComponent } from '../../../widget/paginator/paginator.component';

declare var google: any;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit,AfterViewInit {

  @ViewChildren('agm-marker',{read:AgmMarker}) agmMarkers: ElementRef<AgmMarker>[];

  public isOpenInfo = Array(10).fill(false);

  public showMap = true;
  public date: Subject<any> = new BehaviorSubject<{ start: undefined, end: undefined }>({ start: undefined, end: undefined });

  public results$: Observable<any[]>;

  public cardOpen = false;

  public locales: LocaleConfig = {
    clearLabel: this.translateService.instant('Clear'),
    applyLabel: this.translateService.instant('Save'),
    separator: ' à ',
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: moment.localeData().firstDayOfWeek()
  };
  private breakpointSubscription: Subscription;

  public hideSearchBar = false;
  public seachMapAuto = true;

  @ViewChild('autocompleteaddr') autocompleteAddr: ElementRef<HTMLElement>;
  @ViewChild('pageElement', { static: false, read: PaginatorComponent }) pageElement: PaginatorComponent;

  public boudings: LatLngBounds;
  public templateBoudings: LatLngBounds;
  public lastAddress: string;

  private query: any = null;
  public moreFilter: boolean;
  public type: string;
  public page = 1;
  public searchForm: FormGroup;
  public priceFilter: Subject<any> = new Subject<any>();
  // @ts-ignore
  @ViewChild('datePicker', {static: true}) picker: MatMenuTrigger;

  public searchData = [
    //  Music
    { name: this.translateService.instant('Dj'), value: 'dj', group: this.translateService.instant('music') },
    { name: this.translateService.instant('musician'), value: 'musicien', group: this.translateService.instant('music') },
    { name: this.translateService.instant('band'), value: 'groupe', group: this.translateService.instant('music') },
    // Animator
    { name: this.translateService.instant('adult animator'), value: 'animateurAdultes', group: this.translateService.instant('animator') },
    { name: this.translateService.instant('kids animator'), value: 'animateurEnfants', group: this.translateService.instant('animator') },
    //  Visual
    { name: this.translateService.instant('fireworks'), value: 'feuArtifices', group: this.translateService.instant('visual') },
    { name: this.translateService.instant('release'), value: 'lacher', group: this.translateService.instant('visual') },
    //  Reception
    { name: this.translateService.instant('place'), value: 'lieu', group: this.translateService.instant('reception') },
    { name: this.translateService.instant('caterer'), value: 'traiteur', group: this.translateService.instant('reception') },
    { name: this.translateService.instant('cake'), value: 'gateaumariage', group: this.translateService.instant('reception') },
    //  Memories
    { name: this.translateService.instant('photographer'), value: 'photographe', group: this.translateService.instant('memories') },
    { name: this.translateService.instant('videographer'), value: 'videaliste', group: this.translateService.instant('memories') },
    //  Beauty
    { name: this.translateService.instant('barber'), value: 'coiffure', group: this.translateService.instant('beauty') },
    { name: this.translateService.instant('makeup'), value: 'maquillage', group: this.translateService.instant('beauty') },
    { name: this.translateService.instant('aesthetic'), value: 'estetique', group: this.translateService.instant('beauty') },
    { name: this.translateService.instant('care'), value: 'soins', group: this.translateService.instant('beauty') },
    //  Coach
    { name: this.translateService.instant('choreography'), value: 'choregrapheMariage', group: this.translateService.instant('coach') },
    { name: this.translateService.instant('sports coach'), value: 'coachSportif', group: this.translateService.instant('coach') },
    {
      name: this.translateService.instant('ceremonial officer'),
      value: 'officiantCeremonie',
      group: this.translateService.instant('coach')
    },
    //  Decoration
    { name: this.translateService.instant('decorator'), value: 'decorateur', group: this.translateService.instant('decoration') },
    { name: this.translateService.instant('florist'), value: 'fleuriste', group: this.translateService.instant('decoration') },
    //  Guests
    { name: this.translateService.instant('accommodation'), value: 'hebergement', group: this.translateService.instant('guests') },
    { name: this.translateService.instant('invitations'), value: 'faireparts', group: this.translateService.instant('guests') },
    //  Transport
    { name: this.translateService.instant('car'), value: 'voiture', group: this.translateService.instant('transport') },
    { name: this.translateService.instant('bus'), value: 'bus', group: this.translateService.instant('transport') },
    // Honeymoon
    { name: this.translateService.instant('honeymoons'), value: 'voyageNoces', group: this.translateService.instant('honeymoon') }





  ];


  public categoriesListFiltred = [];

  public latitude = 47;
  public longitude = 2.1;
  public zoom = 1;

  priceMin: any = 0;
  priceMax: any = 4000;
  options: Options = {
    animate:false,
    floor: 0,
    barDimension:397,
    ceil: 4000,
    showSelectionBar: true,
    translate: (value: number): string => {
      if (value >= 4000) {
        return `${value}€ +`;
      } else {
        return value + '€';
      }
    },
  };
  private mobile: boolean;
  minDate = moment();

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly servicesService: ServicesService,
              private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService,
              private readonly cd: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private readonly platformId,
              private readonly breakpointObserver: BreakpointObserver)
  {
    moment.locale('fr');
    this.moreFilter = false;
  }

   ngOnInit() {
     this.searchForm = this.fb.group({
       search: [this.activatedRoute.snapshot.queryParamMap.get('type') || null,
         Validators.compose([
           Validators.required,
           Validators.maxLength(255),
           Validators.minLength(1)])
       ],
       address: [null,
         Validators.compose([
           Validators.maxLength(255)])
       ]
     });
     this.activatedRoute.queryParamMap.subscribe(params => {
       this.type = params.get('type');
       this.getResults();
     });
     this.breakpointSubscription = this.breakpointObserver
       .observe('(max-width:960px)')
       .pipe(distinctUntilChanged())
       .subscribe((state: BreakpointState) => {
         if (state.matches) {
           this.showMap = true;
           this.mobile = true;
         } else {
           this.mobile = false;
         }
       });
   }

  private getResults() {
    if (!!this.boudings) {
      if (!!this.query) {
        this.results$ = this.servicesService.searchByQuery({ ...this.query, address: this.getQueryBoundings() }, this.page);
      } else {
        this.results$ = this.servicesService.searchByQuery({ categories: [this.type], address: this.getQueryBoundings() }, this.page);
      }
    } else {
      if (!!this.query) {
        this.results$ = this.servicesService.searchByQuery(this.query, this.page);
      } else {
        this.results$ = this.servicesService.searchByQuery({ categories: [this.type] }, this.page);
      }
    }

  }

  public toggleFilter() {
    this.moreFilter = !this.moreFilter;
  }

  public cancelEv(e) {
    this.toggleFilter();
    this.getResults();
  }

  public onSubmit() {
    if (this.searchForm.valid) {
      this.locationFocusOut();
      this.page = 1;
      this.pageElement.firstPage();
      const searchInput= this.searchForm.value;
      if(this.type !== searchInput.search){
        this.query = null;
        this.router.navigateByUrl(`/category?type=${this.searchForm.get('search').value}`);
      }
      this.getResults();
    }
  }

  public searchWithPrice() {
    this.priceFilter.next('search');
  }

  public search($event: any) {
    const price = this.priceMax < 4000 ? { gte: this.priceMin, lte: this.priceMax } : { gte: this.priceMin };
    this.query = { ...$event, ...{ [`${this.type}_tarif_horaire`]: JSON.stringify(price) } };
    this.page = 1;
    this.pageElement.firstPage();
    this.moreFilter = false;
    console.log(this.query)
    this.getResults();
  }

  public searchPaginated($event) {
    this.page = $event.pageIndex;
    if (this.page < 1) {
      this.page = 1;
    }
    this.getResults();
  }


  resetPrice() {
    this.priceMin = 0;
    this.priceMax = 2000;
  }

  choosedDate($event: { startDate: Moment, endDate: Moment }) {
    this.date.next({ start: $event.startDate?.toDate(), end: $event.endDate?.toDate() });
    this.picker.closeMenu();
  }


  public getPlaceAutocomplete() {


  }


  boundingChange($event: LatLngBounds) {

    if (isPlatformBrowser(this.platformId)) {
      if (this.showMap && !this.mobile) {
        this.boudings = $event;
      }

    }
  }

  public getQueryBoundings() {
    const data = this.boudings.toJSON();
    return {
      top: data.north,
      right: data.east,
      bottom: data.south,
      left: data.west
    };
  }

  public onIdle() {
    if (this.seachMapAuto) {
      if(!this.cardOpen){
        this.page = 1;
        if (!!this.pageElement) {
          this.pageElement.firstPage();
        }
        this.getResults();
      }
    }
  }

  locationFocusOut() {
    if (!this.searchForm.get('address').value?.length) {
      this.searchForm.get('address').reset();
      this.lastAddress = '';
      this.zoom = 2;
      this.cd.detectChanges();
      this.boudings = undefined;

    } else {
      if (!this.boudings) {
      this.searchForm.get('address').reset();
    } else {
      this.searchForm.get('address').setValue(this.lastAddress);
      }
    }
  }


  beforeOpen($event: void) {
    this.cardOpen = true;
  }

  afterClose($event: void) {
    this.cardOpen = false;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const autocomplete = new google.maps.places.Autocomplete(this.autocompleteAddr.nativeElement,
        { types: ['geocode'] }
      );
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        this.searchForm.get('address').setValue(place.formatted_address);
        this.lastAddress = place.formatted_address;
        if (!this.showMap || this.mobile || !this.seachMapAuto) {
          this.boudings = place?.geometry?.viewport;
          this.page = 1;
          if (!!this.pageElement) {
            this.pageElement.firstPage();
          }

          if (this.mobile || !this.showMap) {
            this.getResults();
          }

          if (!this.seachMapAuto && !this.mobile && this.showMap) {
            this.templateBoudings = place?.geometry?.viewport;
            this.getResults();
          }
        } else {
          this.templateBoudings = place?.geometry?.viewport;
        }
      });
    }

  }

}
