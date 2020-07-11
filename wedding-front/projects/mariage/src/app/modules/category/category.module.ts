import { NgModule } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { SearchResultWidgetComponent } from './components/search-result-widget/search-result-widget.component';
import { PhotographeVideasteFilterComponent } from './components/photographe-videaste-filter/photographe-videaste-filter.component';
import { DecorateurFleuristeFilterComponent } from './components/decorateur-fleuriste-filter/decorateur-fleuriste-filter.component';
import { VoitureBusFilterComponent } from './components/voiture-bus-filter/voiture-bus-filter.component';
import { AnimateurEnfantsAdultesFilterComponent } from './components/animateur-enfants-adultes-filter/animateur-enfants-adultes-filter.component';
import { LieuTraiteurGateauComponent } from './components/lieu-traiteur-gateau/lieu-traiteur-gateau.component';
import { DjGroupeMusicienFilterComponent } from './components/dj-groupe-musicien-filter/dj-groupe-musicien-filter.component';
import { LacherFeuArtificesFilterComponent } from './components/lacher-feu-artifices-filter/lacher-feu-artifices-filter.component';
import { CoachFilterComponent } from './components/coach-filter/coach-filter.component';
import { SoinsEstetiqueMaquillageCoiffureFilterComponent } from './components/soins-estetique-maquillage-coiffure-filter/soins-estetique-maquillage-coiffure-filter.component';
import { VoyageNocesFilterComponent } from './components/voyage-noces-filter/voyage-noces-filter.component';
import { HebergementFilterComponent } from './components/hebergement-filter/hebergement-filter.component';
import { FairePartFilterComponent } from './components/faire-part-filter/faire-part-filter.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatRippleModule } from '@angular/material/core';
import { WidgetModule } from '../widget/widget.module';


@NgModule({
  declarations: [
    SearchComponent,
    SearchResultWidgetComponent,
    PhotographeVideasteFilterComponent,
    DecorateurFleuristeFilterComponent,
    VoitureBusFilterComponent,
    AnimateurEnfantsAdultesFilterComponent,
    LieuTraiteurGateauComponent,
    DjGroupeMusicienFilterComponent,
    LacherFeuArtificesFilterComponent,
    CoachFilterComponent,
    SoinsEstetiqueMaquillageCoiffureFilterComponent,
    VoyageNocesFilterComponent,
    HebergementFilterComponent,
    FairePartFilterComponent
  ],
  imports: [
    SharedModule,
    CategoryRoutingModule,
    ScrollingModule,
    MatRippleModule,
    WidgetModule
  ],
  exports:[SearchResultWidgetComponent]
})
export class CategoryModule {
}
