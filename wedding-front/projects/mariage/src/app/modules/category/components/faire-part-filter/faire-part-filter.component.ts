import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-faire-part-filter',
  templateUrl: './faire-part-filter.component.html',
  styleUrls: ['./faire-part-filter.component.scss']
})
export class FairePartFilterComponent implements OnInit, OnDestroy {


  public filterForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public type: string;
  @Output() public cancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() public search: EventEmitter<any> = new EventEmitter<any>();
  @Input() priceFilter: Subject<any>;
  @Input() hiddenSearchbar: boolean;

  public showMore=false;

  public fairepartsFormatsMore = false;

  constructor(private readonly fb: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService) {
  }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.initForm();

    this.priceFilter.pipe(takeUntil(this.destroy$)).subscribe((value => {
      this.submit();
    }));
  }

  private initForm(): void {
    this.filterForm = this.fb.group({
      verifiedProvider: [],
      securePayment: [],
      topRatedProviders:[],
      categories: [['faire-part']],
      faireparts_formats: this.fb.group({
        carre_plie: [],
        grand_a5_plie: [],
        petit_a6_plie: [],
        grand_a5_plat: [],

        petit_a6_plat:[],
        carre_plat:[]

      }),
      faireparts_finition: this.fb.group({
        mate: [],
        brillante: []
      }),
      faireparts_colories: this.fb.group({
        blanc: [],
        belge: [],
        noir: [],
        rouge: []
      }),
      faireparts_dorures: this.fb.group({
        golden: [],
        silver: [],
        rouge: []
      }),
      livraison: []

    });
  }

  public submit() {
    const form = this.filterForm.getRawValue();
    const listArray = ['faireparts_finition', 'faireparts_colories'];
    const listNested = ['faireparts_dorures', 'faireparts_formats'];

    const res = Object.entries(form)
      .map(([key, value]) => {
        if (listArray.includes(key)) {
          const reelValue = Object.entries(value)
            .map(([k, v]) => !!v ? k : null)
            .filter(v => !!v);
          if (reelValue.length > 0) {
            return { [key]: reelValue };
          }
        } else if (key === 'faireparts_dorures') {
          const reelValue = Object.entries(value)
            .map(([k, v]) => !!v ? k : null)
            .filter(v => !!v);
          if (reelValue.length > 0) {
            return { [`${key}.options.search`]: reelValue };
          }
        }else if(key === 'faireparts_formats'){
          const reelValue = Object.entries(value)
            .map(([k, v]) => !!v ? k : null)
            .filter(v => !!v);
          if (reelValue.length > 0) {
            return { [`${key}.fields.search`]: reelValue };
          }
        } else {
          return !!value ? { [key]: value } : null;
        }

      })
      .filter(val => !!val)
      .reduce((acc, val) => ({ ...acc, ...val }), {});

    this.search.emit(res);

  }

  public reset() {
    this.filterForm.reset();
  }



  public cancelForm() {
    this.filterForm.reset();
    this.cancel.emit('cancel');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
