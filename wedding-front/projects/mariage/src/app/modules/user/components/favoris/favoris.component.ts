import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from '../../../category/services/favorites.service';
import { AuthStore } from '../../../store/auth';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.scss']
})
export class FavorisComponent implements OnInit, OnDestroy {

  public loading = true;
  public favorites: any[] = [];
  public totalPage = 0;
  public currentPage: number;
  public routeSubscription: Subscription;


  constructor(private readonly favoritesService: FavoritesService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly authStore: AuthStore,
              private readonly toastrService: ToastrService,
              @Inject(PLATFORM_ID) private readonly platformId: object,
              private readonly router: Router) {
  }

  public ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.queryParams.subscribe((query) => {
      this.currentPage = query.page || 1;
      this.getFavorites();
    });
  }

  public getFavorites() {
    this.loading = true;
    this.favoritesService.getFavories(this.authStore.getUser().email).subscribe((res: any) => {
      this.totalPage = res.totalItems;
      this.favorites = res.items;
      this.loading = false;
    });
  }

  public onFavorisChange($event){
    console.log($event)
    if($event ==='delete'){
      this.refresh();
    }
  }



  public refresh(){
    if(this.currentPage===1){
      this.getFavorites()
    }else{
      this.router.navigateByUrl(`/user/favorites`);
    }
  }

  public searchPaginated($event) {
    this.router.navigateByUrl(`/user/favorites?page=${$event.pageIndex}`);
  }

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }


}
