import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ReservationsService } from '../../../services/reservations.service';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-reservation-card-payed-confirmed-provider',
  templateUrl: './reservation-card-payed-confirmed-provider.component.html',
  styleUrls: ['./reservation-card-payed-confirmed-provider.component.scss']
})
export class ReservationCardPayedConfirmedProviderComponent implements OnInit {

  @Input() public reservation:any;


  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly toastrService: ToastrService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) { }

  ngOnInit(): void {
  }

  public cancel(reservation: any) {
    if (isPlatformBrowser(this.platformId)) {
      const conf = confirm(`Êtes-vous sûr d'annuler cette demande`);
      if (conf) {
        this.reservationsService.cancelReservationByProvider(reservation.id).subscribe(res => {
          this.toastrService.success(`La reservation est annulée avec succès`);
          this.reservationsService.emit('refresh');
        });
      }
    }
  }


}
