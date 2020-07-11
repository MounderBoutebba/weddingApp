import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {BehaviorSubject, interval, Observable, Subject} from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';
import {DragScrollComponent} from 'ngx-drag-scroll';

@Component({
  selector: 'app-populaire',
  templateUrl: './populaire.component.html',
  styleUrls: ['./populaire.component.scss']
})
export class PopulaireComponent implements OnInit, OnDestroy {

  public services: Array<object>;
  public isHandset$: Observable<boolean>;
  public isTablet$: Observable<boolean>;
  private currentIndex: number;
  private endSubscription: Subject<boolean> = new Subject<boolean>();
  // @ts-ignore
  @ViewChild('scrollable', {read: DragScrollComponent}) ds: DragScrollComponent;


  constructor(private readonly domSanitizer: DomSanitizer,
              private breakpointObserver: BreakpointObserver) {

    this.isHandset$ = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(map((result) => result.matches));
    this.isTablet$ = this.breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Small])
      .pipe(map((result) => result.matches));
    this.currentIndex = 0;

  }

  ngOnInit() {
    this.services = this.getServices();
  }

  ngOnDestroy(): void {
    this.endSubscription.next(true);
    this.endSubscription.complete();
  }

  public moveLeft() {
    this.ds.moveLeft();
  }

  public moveRight() {
    this.ds.moveRight();
  }

  public getServices(): Array<object> {
    return [
      {
        url: this.domSanitizer.bypassSecurityTrustResourceUrl('https://via.placeholder.com/250x300.png?text=cover+image+placeholder'),
        position: 'auvergne rhone alpes,valence',
        title: 'title',
        price: 2500,
        description: 'cover image for test service',
        avatarAlt: 'avatar desc',
        avatar: this.domSanitizer.bypassSecurityTrustResourceUrl('https://via.placeholder.com/300x200'),
      }, {
        url: this.domSanitizer.bypassSecurityTrustResourceUrl('https://via.placeholder.com/250x300.png?text=cover+image+placeholder'),
        position: 'auvergne rhone alpes,valence',
        title: 'title',
        price: 2500,
        description: 'cover image for test service',
        avatarAlt: 'avatar desc',
        avatar: this.domSanitizer.bypassSecurityTrustResourceUrl('https://via.placeholder.com/300x200'),
      }, {
        url: this.domSanitizer.bypassSecurityTrustResourceUrl('https://via.placeholder.com/250x300.png?text=cover+image+placeholder'),
        position: 'auvergne rhone alpes,valence',
        title: 'title',
        price: 2500,
        description: 'cover image for test service',
        avatarAlt: 'avatar desc',
        avatar: this.domSanitizer.bypassSecurityTrustResourceUrl('https://via.placeholder.com/300x200'),
      }, {
        url: this.domSanitizer.bypassSecurityTrustResourceUrl('https://via.placeholder.com/250x300.png?text=cover+image+placeholder'),
        position: 'auvergne rhone alpes,valence',
        title: 'title',
        price: 2500,
        description: 'cover image for test service',
        avatarAlt: 'avatar desc',
        avatar: this.domSanitizer.bypassSecurityTrustResourceUrl('https://via.placeholder.com/300x200'),
      },
    ];
  }

}
