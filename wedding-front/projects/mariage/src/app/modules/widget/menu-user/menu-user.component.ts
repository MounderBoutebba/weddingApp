import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/auth.service';
import {AuthStore} from '../../store/auth';
import { Router } from '@angular/router';
import { CompanyService } from '../../user/services/company.service';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss']
})
export class MenuUserComponent implements OnInit {
  public auth$: any;

  constructor(
    private readonly authService: AuthService,
    private readonly authStore: AuthStore,
    private readonly router: Router,
    private readonly companyService: CompanyService
  ) { }

  ngOnInit() {
    this.auth$ = this.authStore.stateChanged;

  }
  redirectToCompany() {
    let url = '';
    this.companyService.findCompanyByEmail(this.authStore.getUser().email).subscribe(company => {
      if (company) {
        switch (company.currentStep) {
          case 'company-info':
            // tslint:disable-next-line:max-line-length
            url = `/user/${this.authStore.getUser().email}/edit/company`;
            break;
          case 'company-details':
            // tslint:disable-next-line:max-line-length
            url = `/user/${this.authStore.getUser().email}/edit/company-details/${this.authStore.getCategory()}`;
            break;
          case 'company-pricing':
            // tslint:disable-next-line:max-line-length
            url = `/user/${this.authStore.getUser().email}/edit/company-pricing/${company.categories[0]}`;
            break;
          case 'company-settings':
            // tslint:disable-next-line:max-line-length
            url = `/user/${this.authStore.getUser().email}/edit/company-settings`;
            break;
          case 'company-billing':
            // tslint:disable-next-line:max-line-length
            url = `/user/${this.authStore.getUser().email}/edit/company-billing`;
            break;
          default:
            // tslint:disable-next-line:max-line-length
            url = !!this.authStore.getCategory() ? `/user/${this.authStore.getUser().email}/edit/company-details/${this.authStore.getCategory()}`
                                                : `/user/${this.authStore.getUser().email}/edit/company`;
            break;
        }

      } else {
        // tslint:disable-next-line:max-line-length
        url = !!this.authStore.getCategory() ? `/user/${this.authStore.getUser().email}/edit/company-details/${this.authStore.getCategory()}`
                                                  : `/user/${this.authStore.getUser().email}/edit/company`;
      }
      this.router.navigateByUrl(url);
    });
  }

  logout() {
    this.authService.logout();
  }
}
