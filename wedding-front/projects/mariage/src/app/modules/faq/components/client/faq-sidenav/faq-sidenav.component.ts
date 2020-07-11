import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../../services/faq.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-faq-sidenav',
  templateUrl: './faq-sidenav.component.html',
  styleUrls: ['./faq-sidenav.component.scss']
})
export class FaqSidenavComponent implements OnInit {

  public categories = [];
  public type;

  constructor(private readonly  faqService:FaqService,
              private readonly activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.faqService.getCategories(this.type).subscribe((res: any) => {
      this.categories = res;
    });
  }

}
