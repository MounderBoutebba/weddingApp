import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../../services/faq.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type-faq',
  templateUrl: './type-faq.component.html',
  styleUrls: ['./type-faq.component.scss']
})
export class TypeFaqComponent implements OnInit {

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
