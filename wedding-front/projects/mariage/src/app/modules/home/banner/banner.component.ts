import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

	public isHandset$: Observable<boolean>;
	public searchForm: FormGroup;
  public searchData = [
    //  Music
    { name: this.translateService.instant('Dj'), value: 'dj', group: this.translateService.instant('music') },
    { name: this.translateService.instant('musician'), value: 'musicien', group: this.translateService.instant('music') },
    { name: this.translateService.instant('band'), value: 'groupe', group: this.translateService.instant('music') },
    // Animator
    { name: this.translateService.instant('adult animator'), value: 'animateurAdultes', group: this.translateService.instant('animator') },
    { name: this.translateService.instant('kids animator'), value: 'animateurEnfants', group: this.translateService.instant('animator') },
    //  Visual
    { name: this.translateService.instant('fireworks'), value: 'feuArtifices', group: this.translateService.instant('visual') },
    { name: this.translateService.instant('release'), value: 'lacher', group: this.translateService.instant('visual') },
    //  Reception
    { name: this.translateService.instant('place'), value: 'lieu', group: this.translateService.instant('reception') },
    { name: this.translateService.instant('caterer'), value: 'traiteur', group: this.translateService.instant('reception') },
    { name: this.translateService.instant('cake'), value: 'gateaumariage', group: this.translateService.instant('reception') },
    //  Memories
    { name: this.translateService.instant('photographer'), value: 'photographe', group: this.translateService.instant('memories') },
    { name: this.translateService.instant('videographer'), value: 'videaliste', group: this.translateService.instant('memories') },
    //  Beauty
    { name: this.translateService.instant('barber'), value: 'coiffure', group: this.translateService.instant('beauty') },
    { name: this.translateService.instant('makeup'), value: 'maquillage', group: this.translateService.instant('beauty') },
    { name: this.translateService.instant('aesthetic'), value: 'estetique', group: this.translateService.instant('beauty') },
    { name: this.translateService.instant('care'), value: 'soins', group: this.translateService.instant('beauty') },
    //  Coach
    { name: this.translateService.instant('choreography'), value: 'choregrapheMariage', group: this.translateService.instant('coach') },
    { name: this.translateService.instant('sports coach'), value: 'coachSportif', group: this.translateService.instant('coach') },
    {
      name: this.translateService.instant('ceremonial officer'),
      value: 'officiantCeremonie',
      group: this.translateService.instant('coach')
    },
    //  Decoration
    { name: this.translateService.instant('decorator'), value: 'decorateur', group: this.translateService.instant('decoration') },
    { name: this.translateService.instant('florist'), value: 'fleuriste', group: this.translateService.instant('decoration') },
    //  Guests
    { name: this.translateService.instant('accommodation'), value: 'hebergement', group: this.translateService.instant('guests') },
    { name: this.translateService.instant('invitations'), value: 'faireparts', group: this.translateService.instant('guests') },
    //  Transport
    { name: this.translateService.instant('car'), value: 'voiture', group: this.translateService.instant('transport') },
    { name: this.translateService.instant('bus'), value: 'bus', group: this.translateService.instant('transport') },
    // Honeymoon
    { name: this.translateService.instant('honeymoons'), value: 'voyageNoces', group: this.translateService.instant('honeymoon') }





  ];

	constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly translateService: TranslateService
	) {
		this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
	}

	ngOnInit() {
		this.searchForm = this.fb.group({
      search: [null, Validators.compose([Validators.required, Validators.maxLength(255), Validators.minLength(1)])]
		});
	}

	public onSubmit() {
		if (this.searchForm.valid) {
			this.router.navigateByUrl(`/category?type=${this.searchForm.get('search').value}`);
		}
	}


}
