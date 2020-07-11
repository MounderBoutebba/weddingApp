import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-top-searched',
  templateUrl: './top-searched.component.html',
  styleUrls: ['./top-searched.component.scss']
})
export class TopSearchedComponent implements OnInit {

  public services$: Observable<any> = of(null);
  constructor() { }

  ngOnInit() {
    const ser = [
      {
        icon: '/assets/icons/svg/photo-camera.svg',
        title: 'photographe'
      }, {
        icon: '/assets/icons/svg/castle.svg',
        title: 'hebergement'
      }, {
        icon: '/assets/icons/svg/chef.svg',
        title: 'traiteur'
      }, {
        icon: '/assets/icons/svg/dj.svg',
        title: 'dj'
      }, {
        icon: '/assets/icons/svg/scissors.svg',
        title: 'coiffure'
      }, {
        icon: '/assets/icons/svg/bouquet.svg',
        title: 'fleuriste'
      }, {
        icon: '/assets/icons/svg/just-married.svg',
        title: 'voiture'
      }
    ];
    this.services$ = of(ser);
  }

}
