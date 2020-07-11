import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section5',
  templateUrl: './section5.component.html',
  styleUrls: ['./section5.component.scss']
})
export class Section5Component implements OnInit {
  columns = [
    `Couverture totalement gratuite`,
    `S'applique automatiquement à chaque réservation`,
    `Nombreuses mesures pour assurer vos paiements`,
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
