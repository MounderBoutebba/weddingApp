import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ReservationsService } from '../../../services/reservations.service';
import { ToastrService } from 'ngx-toastr';
import { CommentsService } from '../../../services/comments.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-reservation-card-avis-pro',
  templateUrl: './reservation-card-avis-pro.component.html',
  styleUrls: ['./reservation-card-avis-pro.component.scss']
})
export class ReservationCardAvisProComponent implements OnInit {

  @Input() public reservation:any;
  public response = '';
  public edit=false;


  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly toastrService: ToastrService,
    private readonly commentsService:CommentsService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) { }

  ngOnInit(): void {
  }

  public postResponseComment() {
    if(this.response.trim().length >5){
      this.commentsService.postResponse(this.reservation.comment.id,this.response)
        .subscribe((res: any) => {
          this.toastrService.success(`La réponse a été envoyée avec succès`);
          this.reservation.comment.response = res.data;
          this.reservation.comment.response.updatedAt = (new Date(this.reservation.comment.response.updatedAt)).toLocaleDateString();
          this.response='';
        })
    }else{
      this.toastrService.error(`La réponse doit être plus que 5 characteres`);
    }
  }

  public clickEdit(){
    this.edit=true;
    this.response = this.reservation?.comment?.response.content;
  }

  public cancelEdit(){
    this.response='';
    this.edit=false
  }

  public EditResponseComment() {
    if(this.response.trim().length >5){
      this.commentsService.updateResponse(this.reservation?.comment?.id, this.reservation?.comment?.response?.id,this.response)
        .subscribe((res: any) => {
          this.toastrService.success(`La réponse a été modifiée avec succès`);
          this.reservation.comment.response = res.data;
          this.reservation.comment.response.updatedAt = (new Date(this.reservation.comment.response.updatedAt)).toLocaleDateString();
          this.response='';
          this.edit=false;
        })
    }else{
      this.toastrService.error(`La réponse doit être plus que 5 characteres`);
    }
  }

  public deleteResponse() {
    if (isPlatformBrowser(this.platformId)) {
      const conf = confirm(`Êtes-vous sûr de supprimer votre réponse`);
      if (conf) {
        this.commentsService.deleteResponse(this.reservation?.comment?.id, this.reservation?.comment?.response?.id).subscribe(res => {
          this.toastrService.success(`Votre réponse a bien été supprimée`);
          this.reservation.comment.response = null;
        });
      }
    }
  }

}
