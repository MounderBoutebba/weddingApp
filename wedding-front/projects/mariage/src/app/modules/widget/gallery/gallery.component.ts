import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Output('close') public close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('data') public data: any[];

  public currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public closeGallery() {
    this.close.emit(true);
  }

  next() {
    if (this.currentIndex < this.data?.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.data?.length - 1;
    }
  }

  log($event) {
    console.log($event)
  }
}
