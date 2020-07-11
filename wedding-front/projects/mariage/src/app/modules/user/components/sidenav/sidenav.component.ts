import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthStore } from '../../../store/auth';
import { AuthService } from '../../../../core/auth.service';
import { map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  public isHandset$: Observable<boolean>;
  public category: string;
  public hasCategory: boolean;
  public auth$: any;
  public currentUser: Observable<User>;
  public storeSubscription: any;
  toggleIconEnterprise = this.thisIsAnEnterpriseLink();
  toggleIconReservation = false;
  constructor(private breakpointObserver: BreakpointObserver,
              private readonly authStore: AuthStore,
              private readonly usersService: UserService,
              private readonly companyService: CompanyService,
              private readonly router: Router,
              private readonly authService: AuthService) {

    this.isHandset$ = this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Small
    ]).pipe(map((result) => result.matches));
    this.currentUser = of(new User());

  }

  ngOnInit() {

    this.usersService.getEmitted().subscribe((res) => {
      this.currentUser = this.usersService.findUser(this.authStore.getUser().email);
    });

    this.storeSubscription = this.authStore.stateChanged.subscribe((res) => {
      console.log('state changes');
      if (!!this.authStore.getUser() && !!this.authStore.getUser().email) {
        this.currentUser = this.usersService.findUser(this.authStore.getUser().email);
        this.companyService.findCompanyByEmail(this.authStore.getUser().email).subscribe(
          (data) => {
            console.log('categories', data.categories);
            this.category = data.categories[0];
            this.hasCategory = this.category ? true : false;
            this.thisIsAnEnterpriseLink();
          }
        );
      }
    });
    this.auth$ = this.authStore.stateChanged;
  }

  logout() {
    this.authService.logout();
  }
  thisIsAnEnterpriseLink(): boolean {
    const infoPath = `/user/${this.authStore.getUser().email}/edit/company`;
    const detailPath = `/user/${this.authStore.getUser().email}/edit/company-details/`;
    const pricingPath = `/user/${this.authStore.getUser().email}/edit/company-pricing/`;
    const settingsPath = `/user/${this.authStore.getUser().email}/edit/company-settings`;
    return this.router.url.includes(detailPath)
            || this.router.url.includes(pricingPath)
            || this.router.url.includes(infoPath)
            || this.router.url.includes(settingsPath);
  }
  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
