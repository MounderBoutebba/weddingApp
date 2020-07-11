import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReservationsService } from '../../../services/reservations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-waiting-validation-of-provider',
  templateUrl: './waiting-validation-of-provider.component.html',
  styleUrls: ['./waiting-validation-of-provider.component.scss']
})
export class WaitingValidationOfProviderComponent implements OnInit, OnDestroy {

  public loading = true;
  public reservations: any[] = [];
  public totalPage = 0;
  public currentPage: number;
  public routeSubscription: Subscription;


  constructor(private readonly reservationsService: ReservationsService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly toastrService: ToastrService,
              @Inject(PLATFORM_ID) private readonly platformId: object,
              private readonly router: Router) {
  }

  public ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.queryParams.subscribe((query) => {
      this.currentPage = query.page || 1;
      this.getReservations();
    });

    this.reservationsService.getEmittedValues().subscribe(res=>{
      if(Math.ceil((this.totalPage - 1)/10)<this.currentPage ){
        this.currentPage --;
      }
      this.getReservations();
    })
  }

  public getReservations() {
    this.loading = true;
    this.reservationsService.getReservationRequestsClient(this.currentPage).subscribe((res: any) => {
      this.totalPage = res.total;
      this.reservations = res.data.map(data => {
        data.createdAt = (new Date(data.createdAt)).toLocaleDateString();
        data.start = (new Date(data.start)).toLocaleDateString();
        data.end = (new Date(data.end)).toLocaleDateString();
        return data;
      });
      this.loading = false;
    });
  }


  public refresh(){
    if(this.currentPage===1){
      this.getReservations()
    }else{
      this.router.navigateByUrl(`/user/reservation/awaiting-validation-provider`);
    }
  }

  public searchPaginated($event) {
    this.router.navigateByUrl(`/user/reservation/awaiting-validation-provider?page=${$event.pageIndex}`);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }


}

