import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProShowcaseComponent } from './components/pro-showcase/pro-showcase.component';
import { proShowCaseRoutingModule } from './pro-show-case-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReservationCardComponent } from './components/pro-showcase/reservation-card/reservation-card.component';
import { DescriptionTabComponent } from './components/pro-showcase/tabs/description-tab/description-tab.component';
import { DetailsTabComponent } from './components/pro-showcase/tabs/details-tab/details-tab.component';
import { CommentsTabComponent } from './components/pro-showcase/tabs/comments-tab/comments-tab.component';
import { AvailabilityTabComponent } from './components/pro-showcase/tabs/availability-tab/availability-tab.component';
import { ImagesContainerComponent } from './components/pro-showcase/tabs/description-tab/images-container/images-container.component';
import { PhotographeVideasteDescriptionComponent } from './components/pro-showcase/categories/photographe-videaste-description/photographe-videaste-description.component';
import { ProGeneralInfosComponent } from './components/pro-showcase/pro-general-infos/pro-general-infos.component';
import { DjComponent } from './components/pro-showcase/categories/dj/dj.component';
import { PhotographeVideasteReservationComponent } from './components/pro-showcase/reservation-card/photographe-videaste-reservation/photographe-videaste-reservation.component';
import { LieuTraiteurGateauComponent } from './components/pro-showcase/categories/lieu-traiteur-gateau/lieu-traiteur-gateau.component';
import { CoiffureMaquillageEsthetiqueSoinsComponent } from './components/pro-showcase/categories/coiffure-maquillage-esthetique-soins/coiffure-maquillage-esthetique-soins.component';
import { HebergementComponent } from './components/pro-showcase/categories/hebergement/hebergement.component';
import { VoitureBusComponent } from './components/pro-showcase/categories/voiture-bus/voiture-bus.component';
import { VoyageDeNoceComponent } from './components/pro-showcase/categories/voyage-de-noce/voyage-de-noce.component';
import { CoiffureMaquillageEsthetiqueSoinsReservationComponent } from './components/pro-showcase/reservation-card/coiffure-maquillage-esthetique-soins-reservation/coiffure-maquillage-esthetique-soins-reservation.component';
import { PhotographeVideasteDetailsComponent } from './components/pro-showcase/tabs/details-tab/categories/photographe-videaste-details/photographe-videaste-details.component';
import { WidgetModule } from '../widget/widget.module';
import { LieuTraiteurGateauxReservationComponent } from './components/pro-showcase/reservation-card/lieu-traiteur-gateaux-reservation/lieu-traiteur-gateaux-reservation.component';
import { AnimateurEnfantsComponent } from './components/pro-showcase/categories/animateur-enfants/animateur-enfants.component';
import { CoachComponent } from './components/pro-showcase/categories/coach/coach.component';
import { CoachReservationComponent } from './components/pro-showcase/reservation-card/coach-reservation/coach-reservation.component';
import { AnimateurEnfantReservationComponent } from './components/pro-showcase/reservation-card/animateur-enfant-reservation/animateur-enfant-reservation.component';
import { OfficiantComponent } from './components/pro-showcase/categories/officiant/officiant.component';
import { OfficiantReservationComponent } from './components/pro-showcase/reservation-card/officiant-reservation/officiant-reservation.component';
import { DecorateurFleuristeComponent } from './components/pro-showcase/categories/decorateur-fleuriste/decorateur-fleuriste.component';
import { DecorateurFleuristeReservationComponent } from './components/pro-showcase/reservation-card/decorateur-fleuriste-reservation/decorateur-fleuriste-reservation.component';
import { DjReservationComponent } from './components/pro-showcase/reservation-card/dj-reservation/dj-reservation.component';

const detailsTabComponents = [PhotographeVideasteDetailsComponent];
const tabsComponents = [DescriptionTabComponent, DetailsTabComponent, CommentsTabComponent, AvailabilityTabComponent];
const categoriesComponents = [
	PhotographeVideasteDescriptionComponent,
	DjComponent,
	LieuTraiteurGateauComponent,
	CoiffureMaquillageEsthetiqueSoinsComponent,
	HebergementComponent,
	VoitureBusComponent,
	VoyageDeNoceComponent,
	AnimateurEnfantsComponent,
	CoachComponent,
	OfficiantComponent,
	DecorateurFleuristeComponent
];
const DescriptionTabComponents = [ImagesContainerComponent];
const ReservationComponents = [
	PhotographeVideasteReservationComponent,
	CoiffureMaquillageEsthetiqueSoinsReservationComponent,
	LieuTraiteurGateauxReservationComponent,
	CoachReservationComponent,
	AnimateurEnfantReservationComponent,
	OfficiantReservationComponent,
	DecorateurFleuristeReservationComponent,
	DjReservationComponent
];
@NgModule({
	declarations: [
		ProShowcaseComponent,
		ReservationCardComponent,
		ProGeneralInfosComponent,
		[...categoriesComponents],
		[...tabsComponents],
		[...DescriptionTabComponents],
		[...ReservationComponents],
		[...detailsTabComponents]
	],
	imports: [CommonModule, proShowCaseRoutingModule, SharedModule, WidgetModule]
})
export class ProShowCaseModule {}
