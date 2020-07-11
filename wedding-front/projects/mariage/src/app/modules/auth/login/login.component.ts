import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CustomValidators} from 'ngx-custom-validators';
import {AuthService} from '../../../core/auth.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public loginForm: FormGroup;
  userProfile$: any;
  errors$: any;

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService,
              private authService: AuthService) {

    this.buildLoginForm();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const values = this.loginForm.value;
      this.authService.login(values.email, values.password);
    } else {
      this.toastrService.error(this.translateService.instant('invalid form'));
    }
  }

  public buildLoginForm(): void {
    this.loginForm = this.fb.group({

      email: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(255),
        CustomValidators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255)
      ])]
    });
  }

  login() {
    const loginFormValue = this.loginForm.value;
    this.authService.login(loginFormValue.email, loginFormValue.password);
  }

  loginSocial(socialtype: string) {
    this.authService.loginAuthorize(socialtype);
  }

  logout() {
    this.authService.logout();
  }


}
