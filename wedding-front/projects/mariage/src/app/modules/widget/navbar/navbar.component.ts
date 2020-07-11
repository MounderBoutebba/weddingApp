import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { interval, Observable, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SettingsStore } from '../../store/settings';
import { AuthStore } from '../../store/auth';
import { AuthService } from '../../../core/auth.service';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../user/services/notifications.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isHandset$: Observable<boolean>;
  public darkThemeToggle: boolean;
  public lang: string;
  public settings$: any;
  public auth$: any;
  public notificationCount: any = 0;
  public currentUser: Observable<User>;
  public storeSubscription: any;
  public currentRoute: string[] = [];
  public showFullLogo = false;
  public hideNavBar$: Observable<boolean> = of(true);
  public notificationsSubscription: Subscription;
  public countSubscription: Subscription;
  public newNotification = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly settingsStore: SettingsStore,
    private readonly authStore: AuthStore,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly usersService: UserService,
    private readonly authService: AuthService,
    private readonly notificationsService:NotificationsService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {

    router.events.subscribe(res => {
      this.currentRoute = router.url.split('/').splice(1);
      if (this.currentRoute[0] === '') {
        this.showFullLogo = true;
      } else {
        this.showFullLogo = false;
      }
      if (this.currentRoute[1]) {
        if (this.currentRoute[1].includes('confirm-social')) {
          this.hideNavBar$ = of(false);
        } else {
          this.hideNavBar$ = of(true);
        }
      }
    });
    this.isHandset$ = this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Small
    ]).pipe(map((result) => result.matches));

    this.currentUser = of(new User());
  }

  ngOnInit() {

    this.countSubscription =this.notificationsService.getEmittedNotificationsCount()
      .subscribe(res => {
        console.log(res);
        this.notificationCount = res;
      });
    this.usersService.getEmitted().subscribe((res) => {
        this.currentUser = this.usersService.findUser(this.authStore.getUser().email);
    });
    this.storeSubscription = this.authStore.stateChanged.subscribe((res) => {
      if (!!this.authStore.getUser() && !!this.authStore.getUser().email) {
        this.currentUser = this.usersService.findUser(this.authStore.getUser().email);
        this.usersService.patchUserLastConnexion(this.authStore.getUser().email, {lastConnexionDate: new Date()}).subscribe( us => {
          console.log(us);
        });
        this.notificationsService.getNotificationsCount().subscribe(data => {
          this.notificationCount = data.count;
          this.notificationsService.emitNotificationsCount(this.notificationCount);
        });
        this.notificationsSubscription = interval(1000 * 60 * 2)
          .pipe(
            switchMap(value => {
              return this.notificationsService.getNotificationsCount();
            })
          )
            .subscribe((result) => {
/*              if (this.notificationCount < result.count) {
                this.newNotification = true;
              }*/
              this.notificationCount = result.count;
              this.notificationsService.emitNotificationsCount(this.notificationCount);
              /*           if (isPlatformBrowser(this.platformId) && this.newNotification) {
                           const audio = new Audio('/assets/sounds/notification.mp3');
                           audio.play();
                           this.newNotification = false;
                         }*/
            });
        }
    });
    this.auth$ = this.authStore.stateChanged;
    this.settings$ = this.settingsStore.stateChanged;
  }
  redirectToCompany() {
    // tslint:disable-next-line:max-line-length
    const url = !!this.authStore.getCategory() ? `/user/${this.authStore.getUser().email}/edit/company-details/${this.authStore.getCategory()}`
                                               : `/user/${this.authStore.getUser().email}/edit/company`;
    this.router.navigateByUrl(url);
  }
  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.storeSubscription.unsubscribe();
      this.notificationsSubscription.unsubscribe();
      this.countSubscription.unsubscribe();
    }
  }
}
