import { Component, OnInit } from '@angular/core';
import { AuthStore } from '../../../../store/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucess-company-creation',
  templateUrl: './sucess-company-creation.component.html',
  styleUrls: ['./sucess-company-creation.component.scss']
})
export class SucessCompanyCreationComponent implements OnInit {

  constructor(private readonly authStore: AuthStore, private readonly router: Router) { }

  ngOnInit() {
  }

  redirectToAdminPanel() {
    if (this.authStore.getUser().role === 'admin') {
      this.router.navigate([`/administration/${this.authStore.getUser().email}/`]);
      return;
    }
    if (this.authStore.getUser().role === 'provider') {
			this.router.navigate([`/user/${this.authStore.getUser().email}`]);
		}
    return;
  }

}
