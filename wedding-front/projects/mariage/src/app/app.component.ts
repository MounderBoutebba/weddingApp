import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {SettingsStore} from './modules/store/settings';
import {SwUpdate} from '@angular/service-worker';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AuthService} from './core/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'mariage';

  public settings$: any;

  loginFormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

	errors$: Observable<string>;
	userProfile$: Observable<any>;
	isLogged: boolean;
	constructor(
    private readonly settingsStore: SettingsStore,
    private readonly translate: TranslateService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly swUpdate: SwUpdate,
    @Inject(PLATFORM_ID) private readonly platformId: object,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly snackBar: MatSnackBar,
    private readonly authService: AuthService) {
  }

	ngOnInit(): void {
    this.translate.setDefaultLang('fr');
    this.settings$ = this.settingsStore.stateChanged;
    this.checkSwUpdate();
    this.authService.handleLoginCallback();

  }


  public checkSwUpdate(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.swUpdate.available.subscribe((evt: any) => {
        this.swUpdate.activateUpdate().then(() => {
          const snack = this.snackBar.open('Update Available', 'Reload', {
            duration: 5000
          });
          snack
            .onAction()
            .subscribe(() => {
              this.document.location.reload();
            });
        });
      });
    }
  }

}
