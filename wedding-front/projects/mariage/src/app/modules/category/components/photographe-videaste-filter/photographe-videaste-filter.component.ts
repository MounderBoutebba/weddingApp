import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-photographe-videaste-filter',
  templateUrl: './photographe-videaste-filter.component.html',
  styleUrls: ['./photographe-videaste-filter.component.scss']
})
export class PhotographeVideasteFilterComponent implements OnInit, OnDestroy {


  public filterForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public type: string;
  @Input() hiddenSearchbar: boolean;

  @Output() public cancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() public search: EventEmitter<any> = new EventEmitter<any>();
  @Input() priceFilter: Subject<any>;

  public showMore=false;

  public photographePhotoServicesMore=false;
  public videasteVideoServicesMore=false;

  constructor(private readonly fb: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService) {
  }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.initForm();

    if (this.type === 'videaliste') {
      this.videaste = true;
    } else {
      this.photographe = true;
    }

    this.filterForm.get('categories').get('videaliste').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetVideaste();
      }
    });

    this.filterForm.get('categories').get('photographe').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetPhotographe();
      }
    });

    this.priceFilter.pipe(takeUntil(this.destroy$)).subscribe((value => {
      this.submit();
    }));
  }

  private initForm(): void {

    this.filterForm = this.fb.group({
      verifiedProvider: [],
      securePayment: [],
      topRatedProviders:[],
      categories: this.fb.group({
        videaliste: [{ value: this.type === 'videaliste', disabled: this.type === 'videaliste' }],
        photographe: [{ value: this.type === 'photographe', disabled: this.type === 'photographe' }]
      }),

      photographe_styleDePhoto: this.fb.group({
        traditionnel: [],
        artistique: [],
        photojournalisme: []
      }),



      photographe_tiragePapier: [],
      photographe_creationAlbum: [],

      photographe_duoPhoto: [],
      photographe_photomaton: [],
      photographe_photocall: [],
      photographe_livraisonHauteResolution: [],
      photographe_retouchesPhoto: [],
      photographe_livraisonExpress: [],
      photographe_seanceEngagement: [],
      photographe_seanceBrunchOuDejeuner: [],
      photographe_seanceApresMariage: [],
      photographe_galeriePrive: [],
      photographe_remise: [],



      photographe_delaisDeLivraisonJours: this.fb.group({
        lt30: [],
        lt45gt30: [],
        lt70gt46: [],
        gt70: []
      }),

      videaliste_styleDeVideo: this.fb.group({
        traditionnel: [],
        artistique: [],
        videojournalisme: [],
        cinematographique: []
      }),

      videaliste_duoVideo: [],
      videaliste_livraisonExpress: [],
      videaliste_bandeAnnonce: [],
      videaliste_filmCourt: [],
      videaliste_filmLong: [],
      videaliste_courtMetrage: [],
      videaliste_etalonnageVideo: [],
      videaliste_videoAerienne: [],

      videaliste_livraisonOriginauxHauteResolution: [],
      videaliste_remisesDVDUSB: [],
      videaliste_delaisDeLivraisonJours: this.fb.group({
        lt30: [],
        lt45gt30: [],
        lt70gt46: [],
        gt70: []
      })

    });

  }

  public submit() {
    const form = this.filterForm.getRawValue();
    const nestedArray=['photographe_tiragePapier','photographe_creationAlbum'];
    if (!form.categories.photographe && !form.categories.videaliste) {
      this.toastrService.warning(this.translateService.instant('you have to select at least one category'));
    } else {
      const res = Object.entries(form)
        .map(([key, value]) => {

          if (key === 'categories' || key === 'photographe_styleDePhoto' || key === 'videaliste_styleDeVideo') {
            const reelValue = Object.entries(value)
              .map(([k, v]) => !!v ? k : null)
              .filter(v => !!v);
            if (reelValue.length > 0) {
              return { [key]: reelValue };
            }
          }else if (nestedArray.includes(key)){
            if(value){
              return { [`${key}.value`]: value };
            }
          } else if (key === 'photographe_delaisDeLivraisonJours' || key === 'videaliste_delaisDeLivraisonJours') {
            const delais = Object.entries(value)
              .map(([k, v]) => {
                if (!!v) {
                  if (k === 'lt30') {
                    return { lte: 30 };
                  } else if (k === 'lt45gt30') {
                    return { lte: 45, gt: 30 };
                  } else if (k === 'lt70gt46') {
                    return { lte: 70, gt: 45 };
                  } else if (k === 'gt70') {
                    return { gt: 70 };
                  }
                }
                return null;
              })
              .filter(v => !!v);
            if (delais.length === 0) {
              return null;
            }
            return { [key]: delais };
          } else {
            return !!value ? { [key]: value } : null;
          }

        })
        .filter(val => !!val)
        .reduce((acc, val) => ({ ...acc, ...val }), {});

      this.search.emit(res);
    }
  }

  public reset() {
    this.filterForm.reset();
    this.selectDefaultOptions();
  }

  private selectDefaultOptions() {
    if (this.type === 'photographe') {
      this.filterForm.get('categories').get('photographe').setValue(true);
    } else {
      this.filterForm.get('categories').get('videaliste').setValue(true);
    }
  }

  public cancelForm() {
    this.filterForm.reset();
    this.selectDefaultOptions();
    this.cancel.emit('cancel');
  }

  get videaste() {
    return this.filterForm.get('categories').get('videaliste').value;
  }

  set videaste(value: boolean) {
    this.filterForm.get('categories').get('videaliste').setValue(value);
  }

  get photographe() {
    return this.filterForm.get('categories').get('photographe').value;
  }

  set photographe(value: boolean) {
    this.filterForm.get('categories').get('photographe').setValue(value);
  }

  private resetVideaste() {
    this.filterForm.get('videaliste_styleDeVideo').reset();
    this.filterForm.get('videaliste_duoVideo').reset();
    this.filterForm.get('videaliste_livraisonExpress').reset();
    this.filterForm.get('videaliste_bandeAnnonce').reset();
    this.filterForm.get('videaliste_filmCourt').reset();
    this.filterForm.get('videaliste_filmLong').reset();
    this.filterForm.get('videaliste_courtMetrage').reset();
    this.filterForm.get('videaliste_etalonnageVideo').reset();
    this.filterForm.get('videaliste_videoAerienne').reset();
    this.filterForm.get('videaliste_livraisonOriginauxHauteResolution').reset();
    this.filterForm.get('videaliste_remisesDVDUSB').reset();
    this.filterForm.get('videaliste_delaisDeLivraisonJours').reset();
  }

  private resetPhotographe() {
    this.filterForm.get('photographe_styleDePhoto').reset();
    this.filterForm.get('photographe_tiragePapier').reset();
    this.filterForm.get('photographe_creationAlbum').reset();
    this.filterForm.get('photographe_duoPhoto').reset();
    this.filterForm.get('photographe_photomaton').reset();
    this.filterForm.get('photographe_photocall').reset();
    this.filterForm.get('photographe_livraisonHauteResolution').reset();
    this.filterForm.get('photographe_retouchesPhoto').reset();
    this.filterForm.get('photographe_livraisonExpress').reset();
    this.filterForm.get('photographe_seanceEngagement').reset();
    this.filterForm.get('photographe_seanceBrunchOuDejeuner').reset();
    this.filterForm.get('photographe_seanceApresMariage').reset();
    this.filterForm.get('photographe_galeriePrive').reset();
    this.filterForm.get('photographe_remise').reset();
    this.filterForm.get('photographe_delaisDeLivraisonJours').reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
