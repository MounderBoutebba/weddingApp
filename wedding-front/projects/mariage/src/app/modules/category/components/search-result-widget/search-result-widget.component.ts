import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStore } from '../../../store/auth';
import { FavoritesService } from '../../services/favorites.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { differenceInDays, getOverlappingDaysInIntervals } from 'date-fns';

@Component({
  selector: 'app-search-result-widget',
  templateUrl: './search-result-widget.component.html',
  styleUrls: ['./search-result-widget.component.scss']
})
export class SearchResultWidgetComponent implements OnInit, OnDestroy {

  @Input() public data;
  @Input() public favorite;
  @Input() public date: BehaviorSubject<{ start: undefined, end: undefined }>;
  public showInDispoTag = false;
  @Input() public mapWidget = false;
  @Input() public mapOff = false;
  @Output() favorisChange=new EventEmitter();
  public showMore=false;

  // @ts-ignore
  @ViewChild('scrollable', { read: DragScrollComponent }) ds: DragScrollComponent;
  public type: string;
  public authenticated: boolean;

  public galleryVisible = false;

  private subscription: Subscription;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly authStore:AuthStore,
              private readonly router: Router,
              private readonly favoritesService: FavoritesService,
              private readonly translateService: TranslateService,
              private readonly toastrService:ToastrService) {
  }

  ngOnInit() {
    if(this.date){
      this.subscription = this.date.subscribe(dates => {
        if (!dates.start) {
          this.showInDispoTag = false;
        } else {
          const nbrDays = differenceInDays(dates.end, dates.start) + 1;
          const count = this.data.company.disponibility.map(res => {
            return getOverlappingDaysInIntervals(
              { start: new Date(res.start), end: new Date(res.end) }, dates);
          })
            .reduce((acc, val) => acc + val, 0);
          this.showInDispoTag = count === nbrDays;
        }

      });
    }
    this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.authenticated = this.authStore.isAuthenticated();
  }


  public moveRight() {
    console.log(this.data)
    this.ds.moveRight();
  }

  public moveLeft() {
    this.ds.moveLeft();
  }

  public clickHeart() {

    if (this.authenticated) {
      if(this.authStore.getUser().role === 'provider'){
        this.toastrService.error(this.translateService.instant('Les prestataires ne peuvent pas ajouter des favoris '))
      }else{

        const email = this.authStore.getUser().email;
        const companyId = this.data.company.id;
        const companyEmail = this.data.email;

        if (!this.data.favorite && !this.favorite) {
          this.favoritesService.addFavorites(email, { companyId, companyEmail }).subscribe(res => {
            this.data.favorite = true;
          });
        } else {
          this.favoritesService.deleteFavorites(email, companyId).subscribe(res => {
            this.data.favorite = false;
            this.favorisChange.emit('delete');
          });
        }

      }

    } else {
      this.router.navigateByUrl('/auth/login');
    }

  }

  public showGallery() {
    if(!this.mapWidget){
      this.galleryVisible = true
    }
  }

  ngOnDestroy(): void {
    if(this.date){
      this.subscription.unsubscribe();
    }
  }

}
