import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReservationsService } from '../../../services/reservations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

@Component({
  selector: 'app-waiting-paiement-provider',
  templateUrl: './waiting-paiement-provider.component.html',
  styleUrls: ['./waiting-paiement-provider.component.scss']
})
export class WaitingPaiementProviderComponent implements OnInit, OnDestroy {

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

  ngOnInit(): void {
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
    this.reservationsService.getReservationRequestsValidatedByProvider(this.currentPage).subscribe((res: any) => {
      this.totalPage = res.total;
      this.reservations = res.data.map(data => {
        const date = new Date(data.createdAt);
        data.createdAt = (new Date(data.createdAt)).toLocaleDateString();
        data.since = formatDistanceToNow(date, { locale: fr });
        data.start = (new Date(data.start)).toLocaleDateString();
        data.end = (new Date(data.end)).toLocaleDateString();
        data.providerConfirmationDate = (new Date(data.providerConfirmationDate)).toLocaleDateString();
        return data;
      });
      this.loading = false;
    });
  }


  public refresh(){
    if(this.currentPage===1){
      this.getReservations()
    }else{
      this.router.navigateByUrl(`/user/reservation/payment`);
    }
  }

  public searchPaginated($event) {
    this.router.navigateByUrl(`/user/reservation/payment?page=${$event.pageIndex}`);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }



}
