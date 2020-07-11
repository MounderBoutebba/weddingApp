import { Component, OnInit } from '@angular/core';
import { AuthStore } from '../../../store/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss']
})
export class AdminSidenavComponent implements OnInit {

  constructor(private authStore: AuthStore, private readonly router: Router) { }

  ngOnInit() {
  }

  redirectTo(component: string) {
    this.router.navigate([`/administration/${this.authStore.getUser().email}/${component}`]);
  }

}
