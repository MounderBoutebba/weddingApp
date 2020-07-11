import { Inject, Injectable } from '@angular/core';
import auth0 from 'auth0-js';
import { bindNodeCallback, Observable, of, throwError } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { environment } from '../../environments';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthStore } from '../modules/store/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ConnectionType } from '../modules/auth/models/connectionType.model';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CompanyService } from '../modules/user/services/company.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	requestedScopes = 'openid profile email';

	auth0 = new auth0.WebAuth({
		clientID: environment.authConfig.clientID,
		domain: environment.authConfig.domain,
		redirectUri: this.document.location.origin,
		responseType: 'token id_token',
		scope: this.requestedScopes,
		returnTo: this.document.location.origin
	});

	private parseHash$ = bindNodeCallback(this.auth0.parseHash.bind(this.auth0));
	checkSession$ = bindNodeCallback(this.auth0.checkSession.bind(this.auth0));

	onAuthSuccessUrl = '/';
	onAuthFailureUrl = '/auth/login';

	constructor(
		private router: Router,
		@Inject(DOCUMENT) private document: Document,
		private readonly toastrService: ToastrService,
		private readonly route: ActivatedRoute,
		private readonly authStore: AuthStore,
		private readonly companyService: CompanyService,
		private readonly http: HttpClient,
		private readonly translateService: TranslateService,
		public dialog: MatDialog
	) {}

	public login(username: string, password: string): void {
		this.auth0.login({ realm: 'Username-Password-Authentication', username, password }, err => {
			if (err) {
				this.toastrService.error(`${err.description}`);
			} else {
				this.toastrService.success(this.translateService.instant('successfully logged'));
			}
		});
	}

	public loginAuthorize(socialtype: string) {
		const auth0Authorize = new auth0.WebAuth({
			clientID: environment.authConfig.clientID,
			domain: environment.authConfig.domain,
			redirect_uri: this.document.location.origin
		});
		auth0Authorize.authorize({
			responseType: 'token id_token',
			connection: socialtype,
			scope: this.requestedScopes,
			redirect_uri: this.document.location.origin + `?type=${socialtype}`
		});
	}

	public handleLoginCallback() {
		const urlParams = new URLSearchParams(this.document.location.search);
		const type = urlParams.get('type');
		if (this.document.location.hash && !this.isAuthenticated()) {
			this.parseHash$().subscribe(
				authResult => {
					this._setAuth(authResult, { type });
				},
				err => this._handleError(err)
			);
		}
	}

	public isAuthenticated(): boolean {
		return this.authStore.isAuthenticated();
	}

	private _setAuth(authResult, params: any = {}) {
		this.document.location.hash = '';
		if (authResult.idTokenPayload.email_verified) {
			this.http
				.get(`${environment.apiUrl}/users/${authResult.idTokenPayload.email}`)
				.pipe(
					catchError(err => {
						if (err instanceof HttpErrorResponse && err.status === 404) {
							return of('social');
						}
						return throwError(err);
					})
				)
				.subscribe(async (res: any) => {
					if (res === 'social') {
						this.socialInscription(authResult, params);
					} else {
						if (!res.emailVerified) {
							this.http
								.patch(`${environment.apiUrl}/users/${authResult.idTokenPayload.email}`, {
									emailVerified: true
								})
								.subscribe(result => {
									this.authStore.setToken(authResult.idToken, res.role);
									if (!!res.photo) {
										this.authStore.setPhoto('/api/' + res.photo);
									}
									this.toastrService.success(this.translateService.instant('successfully logged'));
								});
						} else {
							try {
								const company = await this.companyService.findCompanyByEmail(res.email).toPromise();
								const category = !!company ? company.categories[0] : null;
								this.authStore.setToken(authResult.idToken, res.role, category);
							} catch (error) {
								this.authStore.setToken(authResult.idToken, res.role);
							}
							if (!!res.photo) {
								this.authStore.setPhoto('/api/' + res.photo);
							}
							this.toastrService.success(this.translateService.instant('successfully logged'));
						}
						if (res.role === 'admin') {
							this.router.navigate(['/administration', res.email]);
							return;
						}
						if (res.role === 'provider') {
							this.router.navigate(['/user', res.email]);
							return;
						}
						if (
							res.firstname &&
							res.lastname &&
							res.phoneVerified &&
							(res.location && res.location.address)
						) {
							this.router.navigate([this.onAuthSuccessUrl]);
						} else {
							this.router.navigate(['/user', res.email]);
						}
					}
				});
		} else {
			this.toastrService.warning(this.translateService.instant(`email is not verified`));
		}
	}

	public renewAuth() {
		if (this.isAuthenticated()) {
			this.checkSession$({}).subscribe(
				authResult => this._setAuth(authResult),
				err => {
					this.router.navigate([this.onAuthFailureUrl]);
				}
			);
		}
	}

	logout() {
		this.router.navigate(['/']);
		this.authStore.setToken(null);
	}

	private _handleError(err) {
		if (err.error_description) {
			console.error(`Error: ${err.error_description}`);
		} else {
			console.error(`Error: ${JSON.stringify(err)}`);
		}
	}

	public signup(email: string, password: string, role: string) {
		this.auth0.signup(
			{ connection: 'Username-Password-Authentication', email, password, user_metadata: { role } },
			err => {
				if (err) {
					this.toastrService.error(`${err.description}`);
				} else {
					let url = '';
					if (role === 'provider') {
						url = `${environment.apiUrl}/users/provider`;
					}
					if (role === 'client') {
						url = `${environment.apiUrl}/users/client`;
					}
					if (role === 'admin') {
						url = `${environment.apiUrl}/users`;
					}
					this.createUserInOurApi(url, {
						email,
						connectionType: ConnectionType.USER_PASSWORD,
						role,
						status: 'UNPUBLISHED'
					}).subscribe(res => {
						this.toastrService.success(
							this.translateService.instant(`successfully created, we've sent you a confirmation email`)
						);
					});
				}
			}
		);
	}

	public createUserInOurApi(url: string, data: any): Observable<any> {
		return this.http.post(`${url}`, data);
	}

	private storeAuth() {}

	public changePassword() {
		// TO DO
		/*
    webAuth.changePassword({
      connection: 'db-conn',
      email:   'foo@bar.com'
    }, function (err, resp) {
      if(err){
        console.log(err.message);
      }else{
        console.log(resp);
      }
    });
    */
	}

	private socialInscription(authResult: any, params: any) {
		const navigationExtras: NavigationExtras = {
			queryParams: {
				email: authResult.idTokenPayload.email,
				type: params.type,
				idToken: authResult.idToken,
				firstname: authResult.idTokenPayload.given_name,
				lastname: authResult.idTokenPayload.family_name,
			}
		  };
		this.router.navigate(['auth/confirm-social'], navigationExtras);
	}
}
