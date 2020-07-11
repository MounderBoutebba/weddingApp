import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-number-result',
  templateUrl: './toggle-number-result.component.html',
  styleUrls: ['./toggle-number-result.component.scss']
})
export class ToggleNumberResultComponent implements OnInit {
  @Input() data: number;
  @Output() focusOut: EventEmitter<number> = new EventEmitter<number>();
  @Input() unit: string;
  @Input() baseValue: number;
  editMode = false;
  constructor() {}

  ngOnInit() {
    console.log('baseValue', this.baseValue);
  }

  onFocusOut() {
    if (this.data <= 0) {this.data = this.baseValue; }
    this.focusOut.emit(this.data);
  }
}
