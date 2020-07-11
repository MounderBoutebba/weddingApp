import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ReservationsService } from '../../../services/reservations.service';
import { ToastrService } from 'ngx-toastr';
import { CommentsService } from '../../../services/comments.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-reservation-card-avis-client',
  templateUrl: './reservation-card-avis-client.component.html',
  styleUrls: ['./reservation-card-avis-client.component.scss']
})
export class ReservationCardAvisClientComponent implements OnInit {

  @Input() public reservation:any;
  public comment = '';
  public professionnalisme = 0;
  public rapportQualitePrix = 0;
  public flexibilite = 0;
  public qualiteService = 0;
  public totalVote = 0;
  public edit=false;


  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly toastrService: ToastrService,
    private readonly commentsService:CommentsService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) { }

  public ngOnInit(): void {
  }

  public postComment() {
    if (this.comment.trim().length > 5) {
      this.commentsService.addComment({
        qualiteService: this.qualiteService,
        professionnalisme: this.professionnalisme,
        flexibilite: this.flexibilite,
        rapportQualitePrix: this.rapportQualitePrix,
        content: this.comment,
        reservationId: this.reservation.id
      })
            .subscribe((res: any) => {
              this.toastrService.success(`Le commentaire a été envoyée avec succès`);
              this.reservation.comment = res.data;
              this.reservation.comment.updatedAt = (new Date(this.reservation.comment.updatedAt)).toLocaleDateString();
              this.comment='';
            })
        }else{
          this.toastrService.error(`Le commentaire doit être plus que 5 characteres`);
    }
  }

  public clickEdit(){
    this.edit=true;
    this.comment = this.reservation?.comment?.content;
    this.professionnalisme = this.reservation?.comment?.professionnalisme;
    this.qualiteService = this.reservation?.comment?.qualiteService;
    this.rapportQualitePrix = this.reservation?.comment?.rapportQualitePrix;
    this.flexibilite = this.reservation?.comment?.flexibilite;
    this.updateTotalVote();
  }

  public cancelEdit(){
    this.edit=false
  }

  public EditComment() {
        if(this.comment.trim().length >5){
          this.commentsService.updateComment(this.reservation.comment.id, {
              qualiteService: this.qualiteService,
              professionnalisme: this.professionnalisme,
              flexibilite: this.flexibilite,
              rapportQualitePrix: this.rapportQualitePrix,
              content: this.comment,
              reservationId: this.reservation.id
            })
            .subscribe((res: any) => {
              this.toastrService.success(`Le commentaire a été modifié avec succès`);
              this.reservation.comment = res.data;
              this.reservation.comment.updatedAt = (new Date(this.reservation.comment.updatedAt)).toLocaleDateString();
              this.rapportQualitePrix = 0;
              this.flexibilite = 0;
              this.professionnalisme = 0;
              this.qualiteService = 0;
              this.updateTotalVote();
              this.edit=false;
            })
        }else{
          this.toastrService.error(`Le commentaire doit être plus que 5 characteres`);
        }
  }

  public deleteComment() {
    if (isPlatformBrowser(this.platformId)) {
      const conf = confirm(`Êtes-vous sûr de supprimer votre Commentaire`);
      if (conf) {
        if (!this.reservation.comment.response) {
          this.commentsService.deleteComment(this.reservation.comment.id).subscribe(res => {
            this.toastrService.success(`Votre commentaire a bien été supprimée`);
            this.reservation.comment = null;
            this.rapportQualitePrix = 0;
            this.flexibilite = 0;
            this.professionnalisme = 0;
            this.qualiteService = 0;
            this.updateTotalVote();
          });
        }
      }
    }
  }

  public onProfessionnalismeSet($event: number) {
    this.professionnalisme = $event;
    this.updateTotalVote();
  }

  public onRapportQualitePrixSet($event: number) {
    this.rapportQualitePrix = $event;
    this.updateTotalVote();
  }

  public onFlexibiliteSet($event: number) {
    this.flexibilite = $event;
    this.updateTotalVote();
  }

  public onQualiteServiceSet($event: number) {
    this.qualiteService = $event;
    this.updateTotalVote();
  }

  public updateTotalVote() {
    this.totalVote = (this.professionnalisme + this.flexibilite + this.qualiteService + this.rapportQualitePrix) / 4;
  }


}
