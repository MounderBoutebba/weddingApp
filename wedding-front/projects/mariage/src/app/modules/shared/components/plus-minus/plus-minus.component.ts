import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-plus-minus',
  templateUrl: './plus-minus.component.html',
  styleUrls: ['./plus-minus.component.scss']
})
export class PlusMinusComponent implements OnInit {

  @Input() public number = 0;
  @Input() public step = 1;
  @Input() public suffix = '€';
  @Output() public plus: EventEmitter<number> = new EventEmitter<number>();
  @Output() public minus: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  public decrement() {
    if (this.number > 0) {
      this.number -= parseFloat(parseFloat(this.step as unknown as string).toFixed(2));
      this.minus.emit(this.number);
    }
  }

  public increment() {
    this.number += parseFloat(parseFloat(this.step as unknown as string).toFixed(2));
    this.plus.emit(this.number);
  }

}
