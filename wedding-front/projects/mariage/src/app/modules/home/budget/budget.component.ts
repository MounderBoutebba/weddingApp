import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  public budget: number;

  constructor() {
    this.budget = 12000;
  }

  ngOnInit() {
  }

}
