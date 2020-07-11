import { ObservableStore } from '@codewithdan/observable-store';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments';
import { AuthState } from './auth.state';
import { AuthAction, AuthStoreInterface } from './auth.action';
import { JwtHelperService } from '@auth0/angular-jwt';
import SimpleCrypto from 'simple-crypto-js';

const simpleCrypto = new SimpleCrypto(environment.key);

@Injectable({
	providedIn: 'root'
})
export class AuthStore extends ObservableStore<AuthState> implements AuthStoreInterface {
	private readonly platformId: object;

	// tslint:disable-next-line:ban-types
	// @ts-ignore
	constructor(@Inject(PLATFORM_ID) platformId: object, private jwtHelperService: JwtHelperService) {
		super({ trackStateHistory: true, logStateChanges: !environment.production });
		this.platformId = platformId;

		this.init();
	}

	public setToken(token: string, role: string = null, category: string = null): void {
		if (!!token) {
			this.setState({
				token,
				user: !!category
					? { ...this.jwtHelperService.decodeToken(token), role, category }
					: { ...this.jwtHelperService.decodeToken(token), role }
			});
			if (isPlatformBrowser(this.platformId)) {
				localStorage.setItem('token', token);
				if (category) {
					localStorage.setItem('category', category);
				}
				localStorage.setItem('ur', simpleCrypto.encrypt(role));
			}
		} else {
			this.setState({ token: null, user: null });
			if (isPlatformBrowser(this.platformId)) {
				localStorage.removeItem('token');
				localStorage.removeItem('ur');
				localStorage.removeItem('category');
				localStorage.removeItem('isReloaded');
			}
		}
	}

	public getToken(): string {
		return this.getState().token;
	}

	public getUser(): any {
		return this.getState().user;
	}

	public getPhoto(): any {
		return this.getState().user.picture;
	}

	public setPhoto(photo: string): void {
		this.setState({
			...this.getState(),
			user: { ...this.getState().user, picture: photo }
		});
	}
	public getCategory(): any {
		return this.getState().user.category;
	}

	public setCategory(category: string): void {
		localStorage.setItem('category', category);
		this.setState({
			...this.getState(),
			user: { ...this.getState().user, category }
		});
	}

	public isAuthenticated(): boolean {
		return !!this.getToken();
	}

	private init(): void {
		let initialState = {
			token: null,
			user: null
		};
		if (isPlatformBrowser(this.platformId)) {
			const data = localStorage.getItem('token');
			const category = localStorage.getItem('category');
			let role: any;
			try {
				if (data) {
					role = simpleCrypto.decrypt(localStorage.getItem('ur'));
				}
			} catch (e) {
				console.log(e);
			}

			initialState = {
				token: data,
				user: !!data
					? !!category
						? { ...this.jwtHelperService.decodeToken(data), role, category }
						: { ...this.jwtHelperService.decodeToken(data), role }
					: null
			};
		}
		this.setState(initialState, AuthAction.INIT_STATE);
	}
}
