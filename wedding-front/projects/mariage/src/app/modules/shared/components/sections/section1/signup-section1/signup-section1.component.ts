import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { AuthService } from 'projects/mariage/src/app/core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup-section1',
  templateUrl: './signup-section1.component.html',
  styleUrls: ['./signup-section1.component.scss']
})
export class SignupSection1Component implements OnInit {
  @Input() isBecomePartner = false;
  @Output() login: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService) { }
  buildForm() {
    const password = this.fb.control('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255)
    ]));
    const confirmPassword = this.fb.control('', CustomValidators.equalTo(password));
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(255),
        CustomValidators.email
      ])],
      password,
      confirmPassword,
    });
  }
  ngOnInit(): void {
    this.buildForm();
  }
  signup() {
    if (this.form.valid) {
      const role = this.isBecomePartner ? `provider` : `client`;
      const values = this.form.value;
      this.authService.signup(values.email, values.password, role);
    } else {
      this.toastrService.error(this.translateService.instant('invalid form'));
    }
  }

}
