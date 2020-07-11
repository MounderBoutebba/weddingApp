import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ReservationsService } from '../../../services/reservations.service';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-reservation-card-waiting-validation-of-provider',
  templateUrl: './reservation-card-waiting-validation-of-provider.component.html',
  styleUrls: ['./reservation-card-waiting-validation-of-provider.component.scss']
})
export class ReservationCardWaitingValidationOfProviderComponent implements OnInit {

  @Input() public reservation: any;

  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly toastrService: ToastrService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {
  }

  ngOnInit(): void {
  }

  public cancel(reservation: any) {
    if (isPlatformBrowser(this.platformId)) {
      const conf = confirm(`Êtes-vous sûr d'annuler cette demande`);
      if (conf) {
        this.reservationsService.cancelPendingRequestByClient(reservation.id).subscribe(res => {
          this.reservationsService.emit('refresh');
        });
      }
    }
  }

}
