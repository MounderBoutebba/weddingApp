import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-become-a-partner',
  templateUrl: './become-a-partner.component.html',
  styleUrls: ['./become-a-partner.component.scss']
})
export class BecomeAPartnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  goToTop() {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 50); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 16);
  }

}
