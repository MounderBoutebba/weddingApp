import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../../services/faq.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-faq',
  templateUrl: './category-faq.component.html',
  styleUrls: ['./category-faq.component.scss']
})
export class CategoryFaqComponent implements OnInit {

  public subCategories = [];
  public type;
  public category;

  constructor(private readonly  faqService:FaqService,
              private readonly activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.category = this.activatedRoute.snapshot.paramMap.get('category');
    this.faqService.findCategory(this.type,this.category).subscribe((res: any) => {
      const categorie = res[0];
      this.subCategories = categorie.sous_categories;
    });
  }

}
