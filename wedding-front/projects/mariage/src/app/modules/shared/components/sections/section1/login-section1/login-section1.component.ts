import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'projects/mariage/src/app/core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-login-section1',
  templateUrl: './login-section1.component.html',
  styleUrls: ['./login-section1.component.scss']
})
export class LoginSection1Component implements OnInit {
  @Input() isBecomePartner = false;
  @Output() signup: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  constructor(private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly translateService: TranslateService) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    const password = this.fb.control('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255)
    ]));
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(255),
        CustomValidators.email
      ])],
      password,
    });
  }
  login() {
    if (this.form.valid) {
      const values = this.form.value;
      this.authService.login(values.email, values.password);
    } else {
      this.toastrService.error(this.translateService.instant('invalid form'));
    }
  }
}
