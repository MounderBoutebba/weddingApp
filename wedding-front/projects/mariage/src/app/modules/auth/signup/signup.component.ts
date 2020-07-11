import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ngx-custom-validators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {


  public signupForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService,
              private authService: AuthService) {

    this.buildSignUpForm();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const values = this.signupForm.value;
      this.authService.signup(values.email, values.password, values.role);
    } else {
      this.toastrService.error(this.translateService.instant('invalid form'));
    }
  }

  loginSocial(socialtype: string) {
      this.authService.loginAuthorize(socialtype);
  }

  public buildSignUpForm(): void {
    const password = this.fb.control('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255)
    ]));
    const confirmPassword = this.fb.control('', CustomValidators.equalTo(password));

    this.signupForm = this.fb.group({

      email: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(255),
        CustomValidators.email
      ])],
      conditions: ['', Validators.compose([
        Validators.requiredTrue
      ])],
      role: ['', Validators.compose([
        Validators.required
      ])],
      password,
      confirmPassword,
    });
  }

}
