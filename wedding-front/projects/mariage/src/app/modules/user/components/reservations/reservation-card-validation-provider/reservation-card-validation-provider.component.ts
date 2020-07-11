import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { ReservationsService } from '../../../services/reservations.service';

@Component({
  selector: 'app-reservation-card-validation-provider',
  templateUrl: './reservation-card-validation-provider.component.html',
  styleUrls: ['./reservation-card-validation-provider.component.scss']
})
export class ReservationCardValidationProviderComponent implements OnInit {

  @Input() public reservation:any;

  public additionalFeeTitle = '';
  public additionalFeePrice = 0;
  public additionalFees: { title: string; price: number }[] = [];

  public discountTitle = '';
  public discountPrice = 0;
  public discounts: { title: string; price: number }[] = [];

  public totalDiscounts=0;
  public totalAdditionalFees=0;


  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly toastrService: ToastrService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) { }

  ngOnInit(): void {
  }

  public reject(reservation: any) {
    if (isPlatformBrowser(this.platformId)) {
      const conf = confirm('Êtes-vous sûr de rejeter cette demande');
      if (conf) {
        this.reservationsService.rejectReservationRequestByProvider(reservation.id).subscribe(res => {
          this.reservationsService.emit('refresh');
        });
      }
    }
  }

  public validate(reservation: any) {
    if (isPlatformBrowser(this.platformId)) {
      const conf = confirm('Êtes-vous sûr de valider cette demande');
      if (conf) {
        this.reservationsService.validateReservationRequestByProvider(reservation.id, {
          discounts: this.discounts,
          additionalFees: this.additionalFees
        }).subscribe(res=>{
          this.reservationsService.emit('refresh');
        });
      }
    }
  }

  public incrementFeePrice(price: number) {
    this.additionalFeePrice = price;
  }

  public decrementFeePrice(price: number) {
    this.additionalFeePrice = price;
  }

  public incrementDiscountPrice(price: number) {
    this.discountPrice = price;
  }

  public decrementDiscountPrice(price: number) {
    this.discountPrice = price;
  }

  public addFeePrice() {
    if (this.additionalFeePrice > 0 && this.additionalFeeTitle.trim().length >= 3) {
      if(!this.additionalFees.find(res=>res.title===this.additionalFeeTitle)){
        this.additionalFees.push({
          price: this.additionalFeePrice,
          title: this.additionalFeeTitle
        });
        this.additionalFeePrice = 0;
        this.additionalFeeTitle = '';
        this.calculateTotalAdditionalFees();
      }else{
        this.toastrService.error(`Le titre doit être unique`);
      }
    }else{
      this.toastrService.error(`Le prix doit être supérieur à 0 et le titre ne doit pas être inférieur à 3 caractères`);
    }

  }

  public addDisount() {
    if (this.discountPrice > 0 && this.discountTitle.trim().length >= 3) {
      if(!this.discounts.find(res=>res.title===this.discountTitle)){
        this.discounts.push({
          price: this.discountPrice,
          title: this.discountTitle
        });
        this.discountPrice = 0;
        this.discountTitle = '';
        this.calculateTotalDiscount();
      }else{
        this.toastrService.error(`Le titre doit être unique`);
      }
    }else{
      this.toastrService.error(`Le prix doit être supérieur à 0 et le titre ne doit pas être inférieur à 3 caractères`);
    }
  }

  public removeDiscount(discount:{ title: string; price: number }) {
    if (isPlatformBrowser(this.platformId)) {
      const conf = confirm('Êtes-vous sûr de supprimer cette remise');
      if (conf) {
        this.discounts=this.discounts.filter(data=>{
          return data.title !== discount.title;
        });
        this.calculateTotalDiscount();
      }
    }
  }

  public removeAdditionalFee(additionalFee: { title: string; price: number }) {
    if (isPlatformBrowser(this.platformId)) {
      const conf = confirm('Êtes-vous sûr de supprimer ce frais');
      if (conf) {
        this.additionalFees=this.additionalFees.filter(data=>{
          return data.title !== additionalFee.title;
        });
        this.calculateTotalAdditionalFees();
      }
    }
  }


  public calculateTotalDiscount(){
    this.totalDiscounts = this.discounts.reduce((acc,val)=>{
      return acc + val.price;
    },0);
  }

  public calculateTotalAdditionalFees(){
    this.totalAdditionalFees = this.additionalFees.reduce((acc,val)=>{
      return acc + val.price;
    },0);
  }

}
