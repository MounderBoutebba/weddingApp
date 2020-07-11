import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { WeddingInfoComponent } from './components/wedding-info/wedding-info.component';
import { CompanyInfoComponent } from './components/company/company-info/company-info.component';
import { StepperServicesComponent } from './components/company/stepper-services/stepper-services.component';
import { MaterialModule } from '../shared/material.module';
import { FirstStepComponent } from './components/company/stepper-services/first-step/first-step.component';
import { CompanyDetailsComponent } from './components/company/company-details/company-details.component';
import { PhotographeComponent } from './components/company/company-details/photographe/photographe.component';
import { VideasteComponent } from './components/company/company-details/videaste/videaste.component';
import { CompanyPricingComponent } from './components/company/company-pricing/company-pricing.component';
import { CompanySettingsComponent } from './components/company/company-settings/company-settings.component';
import { PhotographePricingComponent } from './components/company/company-pricing/photographe-pricing/photographe-pricing.component';
import { VideastePricingComponent } from './components/company/company-pricing/videaste-pricing/videaste-pricing.component';
import { AddCheckboxOptionDialogComponent } from './components/company/mat-dialogs/add-checkbox-option-dialog/add-checkbox-option-dialog.component';
import { AddRadioOptionDialogComponent } from './components/company/mat-dialogs/add-radio-option-dialog/add-radio-option-dialog.component';
import { CompanyBillingComponent } from './components/company/company-billing/company-billing.component';
import { FleuristeComponent } from './components/company/company-details/fleuriste/fleuriste.component';
import { DecorateurComponent } from './components/company/company-details/decorateur/decorateur.component';
import { DecorateurPricingComponent } from './components/company/company-pricing/decorateur-pricing/decorateur-pricing.component';
import { FleuristePricingComponent } from './components/company/company-pricing/fleuriste-pricing/fleuriste-pricing.component';
import { VoitureComponent } from './components/company/company-details/voiture/voiture.component';
import { BusComponent } from './components/company/company-details/bus/bus.component';
import { BusPricingComponent } from './components/company/company-pricing/bus-pricing/bus-pricing.component';
import { VoiturePricingComponent } from './components/company/company-pricing/voiture-pricing/voiture-pricing.component';
import { LieuComponent } from './components/company/company-details/lieu/lieu.component';
import { TraiteurComponent } from './components/company/company-details/traiteur/traiteur.component';
import { GateauMariageComponent } from './components/company/company-details/gateau-mariage/gateau-mariage.component';
// tslint:disable-next-line:max-line-length
import { GateauMariagePricingComponent } from './components/company/company-pricing/gateau-mariage-pricing/gateau-mariage-pricing.component';
import { LieuPricingComponent } from './components/company/company-pricing/lieu-pricing/lieu-pricing.component';
import { TraiteurPricingComponent } from './components/company/company-pricing/traiteur-pricing/traiteur-pricing.component';
import { DjComponent } from './components/company/company-details/dj/dj.component';
import { GroupeComponent } from './components/company/company-details/groupe/groupe.component';
import { MusicienComponent } from './components/company/company-details/musicien/musicien.component';
import { MusicienPricingComponent } from './components/company/company-pricing/musicien-pricing/musicien-pricing.component';
import { DjPricingComponent } from './components/company/company-pricing/dj-pricing/dj-pricing.component';
import { GroupePricingComponent } from './components/company/company-pricing/groupe-pricing/groupe-pricing.component';
import { AnimateurAdultsComponent } from './components/company/company-details/animateur-adults/animateur-adults.component';
import { AnimateurEnfantsComponent } from './components/company/company-details/animateur-enfants/animateur-enfants.component';
import { AnimateurEnfantsPricingComponent } from './components/company/company-pricing/animateur-enfants-pricing/animateur-enfants-pricing.component';
import { AnimateurAdultsPricingComponent } from './components/company/company-pricing/animateur-adults-pricing/animateur-adults-pricing.component';
import { FeuArtificesComponent } from './components/company/company-details/feu-artifices/feu-artifices.component';
import { LachersComponent } from './components/company/company-details/lachers/lachers.component';
import { LachersPricingComponent } from './components/company/company-pricing/lachers-pricing/lachers-pricing.component';
import { FeuArtificesPricingComponent } from './components/company/company-pricing/feu-artifices-pricing/feu-artifices-pricing.component';
import { ChoregrapheComponent } from './components/company/company-details/choregraphe/choregraphe.component';
import { CoachComponent } from './components/company/company-details/coach/coach.component';
import { OfficiantComponent } from './components/company/company-details/officiant/officiant.component';
import { OfficiantPricingComponent } from './components/company/company-pricing/officiant-pricing/officiant-pricing.component';
import { CoachPricingComponent } from './components/company/company-pricing/coach-pricing/coach-pricing.component';
import { ChoregraphePricingComponent } from './components/company/company-pricing/choregraphe-pricing/choregraphe-pricing.component';
import { CoiffureComponent } from './components/company/company-details/coiffure/coiffure.component';
import { SoinComponent } from './components/company/company-details/soin/soin.component';
import { MaquillageComponent } from './components/company/company-details/maquillage/maquillage.component';
import { EsthetiqueComponent } from './components/company/company-details/esthetique/esthetique.component';
import { EsthetiquePricingComponent } from './components/company/company-pricing/esthetique-pricing/esthetique-pricing.component';
import { SoinPricingComponent } from './components/company/company-pricing/soin-pricing/soin-pricing.component';
import { MaquillagePricingComponent } from './components/company/company-pricing/maquillage-pricing/maquillage-pricing.component';
import { CoiffurePricingComponent } from './components/company/company-pricing/coiffure-pricing/coiffure-pricing.component';
import { HebergementComponent } from './components/company/company-details/hebergement/hebergement.component';
import { FairePartComponent } from './components/company/company-details/faire-part/faire-part.component';
import { FairePartPricingComponent } from './components/company/company-pricing/faire-part-pricing/faire-part-pricing.component';
import { HebergementPricingComponent } from './components/company/company-pricing/hebergement-pricing/hebergement-pricing.component';
import { VoyageNocesPricingComponent } from './components/company/company-pricing/voyage-noces-pricing/voyage-noces-pricing.component';
import { VoyageNocesComponent } from './components/company/company-details/voyage-noces/voyage-noces.component';
import { AddToggleOptionDialogComponent } from './components/company/mat-dialogs/add-toggle-option-dialog/add-toggle-option-dialog.component';
import { CompanyStepGuard } from '../../guards/company-step-guard';
import { SucessCompanyCreationComponent } from './components/company/sucess-company-creation/sucess-company-creation.component';
import { ConfirmDialogComponent } from './components/company/mat-dialogs/confirm-dialog/confirm-dialog.component';
import { ConnectionDialogComponent } from './components/company/mat-dialogs/connection-dialog/connection-dialog.component';
import { ErreurDialogComponent } from './components/company/mat-dialogs/erreur-dialog/erreur-dialog.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { WidgetModule } from '../widget/widget.module';
import { RequestValidationProviderComponent } from './components/reservations/request-validation-provider/request-validation-provider.component';
import { ReservationCardValidationProviderComponent } from './components/reservations/reservation-card-validation-provider/reservation-card-validation-provider.component';
import { WaitingPaiementProviderComponent } from './components/reservations/waiting-paiement-provider/waiting-paiement-provider.component';
import { ReservationCardWaitingPaiementProviderComponent } from './components/reservations/reservation-card-waiting-paiement-provider/reservation-card-waiting-paiement-provider.component';
import { PayedConfirmedProviderComponent } from './components/reservations/payed-confirmed-provider/payed-confirmed-provider.component';
import { ReservationCardPayedConfirmedProviderComponent } from './components/reservations/reservation-card-payed-confirmed-provider/reservation-card-payed-confirmed-provider.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AvisProComponent } from './components/avis/avis-pro/avis-pro.component';
import { ReservationCardAvisProComponent } from './components/avis/reservation-card-avis-pro/reservation-card-avis-pro.component';
import { WaitingValidationOfProviderComponent } from './components/reservations/waiting-validation-of-provider/waiting-validation-of-provider.component';
import { ReservationCardWaitingValidationOfProviderComponent } from './components/reservations/reservation-card-waiting-validation-of-provider/reservation-card-waiting-validation-of-provider.component';
import { AvisClientComponent } from './components/avis/avis-client/avis-client.component';
import { ReservationCardAvisClientComponent } from './components/avis/reservation-card-avis-client/reservation-card-avis-client.component';
import { FavorisComponent } from './components/favoris/favoris.component';
import { CategoryModule } from '../category/category.module';
import { PaymentInfoDialogComponent } from './components/company/mat-dialogs/payment-info-dialog/payment-info-dialog.component';

const dialogsComponents = [
	AddCheckboxOptionDialogComponent,
	AddRadioOptionDialogComponent,
	AddToggleOptionDialogComponent,
	ConfirmDialogComponent,
	ConnectionDialogComponent,
	ErreurDialogComponent,
	PaymentInfoDialogComponent,
];
@NgModule({
	declarations: [
		ProfileComponent,
		SidenavComponent,
		PersonalInfoComponent,
		WeddingInfoComponent,
		CompanyInfoComponent,
		StepperServicesComponent,
		FirstStepComponent,
		CompanyDetailsComponent,
		PhotographeComponent,
		VideasteComponent,
		CompanyPricingComponent,
		CompanySettingsComponent,
		PhotographePricingComponent,
		VideastePricingComponent,
		[...dialogsComponents],
		CompanyBillingComponent,
		FleuristeComponent,
		DecorateurComponent,
		DecorateurPricingComponent,
		FleuristePricingComponent,
		VoitureComponent,
		BusComponent,
		BusPricingComponent,
		VoiturePricingComponent,
		LieuComponent,
		TraiteurComponent,
		GateauMariageComponent,
		GateauMariagePricingComponent,
		LieuPricingComponent,
		TraiteurPricingComponent,
		DjComponent,
		GroupeComponent,
		MusicienComponent,
		MusicienPricingComponent,
		DjPricingComponent,
		GroupePricingComponent,
		AnimateurAdultsComponent,
		AnimateurEnfantsComponent,
		AnimateurEnfantsPricingComponent,
		AnimateurAdultsPricingComponent,
		FeuArtificesComponent,
		LachersComponent,
		LachersPricingComponent,
		FeuArtificesPricingComponent,
		ChoregrapheComponent,
		CoachComponent,
		OfficiantComponent,
		OfficiantPricingComponent,
		CoachPricingComponent,
		ChoregraphePricingComponent,
		CoiffureComponent,
		SoinComponent,
		MaquillageComponent,
		EsthetiqueComponent,
		EsthetiquePricingComponent,
		SoinPricingComponent,
		MaquillagePricingComponent,
		CoiffurePricingComponent,
		HebergementComponent,
		FairePartComponent,
		FairePartPricingComponent,
		HebergementPricingComponent,
		VoyageNocesPricingComponent,
		VoyageNocesComponent,
		AddToggleOptionDialogComponent,
		SucessCompanyCreationComponent,
		ConfirmDialogComponent,
		ConnectionDialogComponent,
    ErreurDialogComponent,
    NotificationsComponent,
    RequestValidationProviderComponent,
    ReservationCardValidationProviderComponent,
    WaitingPaiementProviderComponent,
    ReservationCardWaitingPaiementProviderComponent,
    PayedConfirmedProviderComponent,
    ReservationCardPayedConfirmedProviderComponent,
    CalendarComponent,
    AvisProComponent,
    ReservationCardAvisProComponent,
    WaitingValidationOfProviderComponent,
    ReservationCardWaitingValidationOfProviderComponent,
    AvisClientComponent,
    ReservationCardAvisClientComponent,
	FavorisComponent
	],
  imports: [SharedModule, UserRoutingModule, MaterialModule, WidgetModule,CategoryModule],
	entryComponents: [...dialogsComponents],
	providers: [CompanyStepGuard],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]

})
export class UserModule {}
