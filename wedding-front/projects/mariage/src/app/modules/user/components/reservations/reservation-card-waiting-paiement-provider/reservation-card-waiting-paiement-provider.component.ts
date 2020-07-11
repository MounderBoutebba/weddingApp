import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ReservationsService } from '../../../services/reservations.service';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-reservation-card-waiting-paiement-provider',
  templateUrl: './reservation-card-waiting-paiement-provider.component.html',
  styleUrls: ['./reservation-card-waiting-paiement-provider.component.scss']
})
export class ReservationCardWaitingPaiementProviderComponent implements OnInit {

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
        this.reservationsService.cancelRequestByProvider(reservation.id).subscribe(res => {
          this.toastrService.success(`La reservation est annulée avec succès`);
          this.reservationsService.emit('refresh');
        });
      }
    }
  }

  public notifyClient(reservation: any) {
    if (isPlatformBrowser(this.platformId)) {
      const conf = confirm('Êtes-vous sûr de relancer cette demande au client');
      if (conf) {
        this.reservationsService.remindClient(reservation.id).subscribe(res => {
          this.toastrService.success(`Le client a bien été notifié`);
          reservation.notifyClientCount = (reservation.notifyClientCount || 0) + 1;
          //   this.reservationsService.emit('refresh');
        });
      }
    }
  }

}
