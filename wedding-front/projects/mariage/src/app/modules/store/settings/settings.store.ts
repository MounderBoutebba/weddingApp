import { ObservableStore } from '@codewithdan/observable-store';
import { SettingsState } from './settings.state';
import { SettingsAction, SettingsStoreInterface } from './settings.action';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SettingsStore extends ObservableStore<SettingsState> implements SettingsStoreInterface {
	private translateService: TranslateService;
	private readonly platformId: object;

	// tslint:disable-next-line:ban-types
	// @ts-ignore
	constructor(@Inject(PLATFORM_ID) platformId: object, translateService: TranslateService) {
		super({
			trackStateHistory: true,
			logStateChanges: !environment.production
		});
		this.platformId = platformId;
		this.translateService = translateService;
		this.init();
	}

	init(): void {
		let initialState = {
			dark: false,
			language: 'fr'
		};

		if (isPlatformBrowser(this.platformId)) {
			const data = JSON.parse(localStorage.getItem('settings'));
			initialState = {
				dark: data && data.dark ? data.dark : false,
				language: data && data.language ? data.language : 'fr'
			};
			if (data === null) {
				localStorage.setItem('settings', JSON.stringify(initialState));
			}
		}

		this.setState(initialState, SettingsAction.INIT_STATE);
		this.translateService.use(initialState.language);
	}

	SetDarkTheme(darkTheme: boolean): void {
		this.setState({ ...this.getState(), dark: darkTheme }, SettingsAction.SET_DARK_THEME);
		if (isPlatformBrowser(this.platformId)) {
			localStorage.setItem('settings', JSON.stringify(this.getState()));
		}
	}

	SetLanguage(language: string): void {
		this.setState({ ...this.getState(), language }, SettingsAction.SET_LANGUAGE);
		this.translateService.use(language);
		if (isPlatformBrowser(this.platformId)) {
			localStorage.setItem('settings', JSON.stringify(this.getState()));
		}
	}

	getCurrentLanguage(): string {
		return this.getState().language;
	}

	isDarkTheme(): boolean {
		return this.getState().dark;
	}
}
