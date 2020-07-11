import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ConnectionType } from '../models/connectionType.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { AuthStore } from '../../store/auth';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'projects/mariage/src/environments';
import { SettingsStore } from '../../store/settings';

@Component({
  selector: 'app-role-diag',
  templateUrl: './role-diag.component.html',
  styleUrls: ['./role-diag.component.scss']
})
export class RoleDiagComponent implements OnInit {

  userForm: FormGroup;
  data: any;
  onAuthSuccessUrl = '/';
  fr = true;

  constructor(private userFormBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
              private authStore: AuthStore,
              private readonly toastrService: ToastrService,
              private router: Router,
              private readonly settingsStore: SettingsStore,
              private readonly translateService: TranslateService) {
    this.route.queryParams.subscribe(params => {
      this.data = params;
      this.resetUserForm();
  });
  }

  ngOnInit(): void {}

  resetUserForm() {
		this.userForm = this.userFormBuilder.group({
			email: [{value: this.data.email, disabled: true}],
			firstname: [this.data.firstname, [Validators.required]],
			lastname: [this.data.lastname, [Validators.required]],
      role: [null, [Validators.required]],
		});
  }

  public changeLanguage(lang: string) {
    if (lang === 'fr') {
      this.fr = true;
    }
    if (lang === 'en') {
      this.fr = false;
    }
    this.settingsStore.SetLanguage(lang);
  }

  formSubmitted() {
    if (this.userForm.get('role').value === 'provider' || this.userForm.get('role').value === 'client') {
      const url =
        this.userForm.get('role').value === 'provider'
          ? `${environment.apiUrl}/users/provider`
          : `${environment.apiUrl}/users/client`;
      const social =
        this.data.type === 'facebook' ? ConnectionType.FACEBOOK : ConnectionType.GOOGLE;
      this.authService.createUserInOurApi(url, {
        email: this.data.email,
        connectionType: social,
        role: this.userForm.get('role').value,
        emailVerified: true,
        firstname: this.userForm.get('firstname').value,
        lastname: this.userForm.get('lastname').value,
      }).subscribe(user => {
          this.authStore.setToken(this.data.idToken, user.role);
          this.toastrService.success(this.translateService.instant('successfully completed'));
          if (
            user.firstname &&
            user.lastname &&
            user.phoneVerified &&
            (user.location && user.location.address)
          ) {
            this.router.navigate([this.onAuthSuccessUrl]);
          } else {
            this.router.navigate(['/user', user.email]);
          }
        });
    }
  }
}
