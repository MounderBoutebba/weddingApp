import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../../services/faq.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-category',
  templateUrl: './subCategory.component.html',
  styleUrls: ['./subCategory.component.scss']
})
export class SubCategoryComponent implements OnInit {

  public questions = [];
  public type;
  public category;
  public subCategory;

  constructor(private readonly  faqService:FaqService,
              private readonly activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.category = this.activatedRoute.snapshot.paramMap.get('category');
    this.subCategory = this.activatedRoute.snapshot.paramMap.get('subCategory');
    this.faqService.findSubCategory(this.type,this.category,this.subCategory).subscribe((res: any) => {
      this.questions = res[0].questions;
    });
  }

}
