import { Component, OnInit, Input } from '@angular/core';
import { SettingsStore } from '../../../../store/settings';
import { AuthStore } from '../../../../store/auth';
import { AuthService } from 'projects/mariage/src/app/core/auth.service';
import { UserService } from '../../../../user/services/user.service';

@Component({
  selector: 'app-section1',
  templateUrl: './section1.component.html',
  styleUrls: ['./section1.component.scss']
})
export class Section1Component implements OnInit {
  @Input() isBecomePartner = false;
  public language: string;
  title: string;
  description: any;
  isAuthenticated: boolean;
  user: {name: string, photo: string};
  showSignup = true;
  imgSrc: string;
  constructor(private readonly settingsStore: SettingsStore,
    private readonly authStore: AuthStore,
    private readonly authService: AuthService,
    private readonly userService: UserService) { }

  ngOnInit(): void {
    this.title = this.isBecomePartner ? `Devenez partenaire Winwez !` : `Cherchez, comparez et réserver sur Winwez !`;
    this.description = this.isBecomePartner ? {bold: `Augmentez jusqu'à 30 % `, normal: `le volume de vos réservations`}
    : `Réservez vos prestataires et protégez vos paiements`;
    this.imgSrc = this.isBecomePartner ? '/assets/images/become-a-partner.png' : '/assets/images/how-it-works1.png';
    this.language = this.settingsStore.getCurrentLanguage();
    this.isAuthenticated = this.authStore.isAuthenticated();
    if (this.isAuthenticated) {
      this.userService.findUser(this.authStore.getUser().email).subscribe(
        (user) => {
          this.user = {name: `${user.firstname} ${user.lastname}`, photo: this.authStore.getPhoto()};
        }
      );
    }
  }
  public changeLanguage() {
    this.settingsStore.SetLanguage(this.language);
  }
  loginSocial(socialtype: string) {
    this.authService.loginAuthorize(socialtype);
  }

}
