import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {SettingsStore} from '../../../store/settings';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public isHandset$: Observable<boolean>;
  public language: string;
  public dark: boolean;


  constructor(private breakpointObserver: BreakpointObserver,
              private readonly settingsStore: SettingsStore
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map((result) => result.matches)
      );
  }

  ngOnInit() {
    this.language = this.settingsStore.getCurrentLanguage();
    this.dark = this.settingsStore.isDarkTheme();
  }

  public changeLanguage() {
    this.settingsStore.SetLanguage(this.language);
  }

  public toggleDarkTheme() {
    this.settingsStore.SetDarkTheme(this.dark);
  }
}
