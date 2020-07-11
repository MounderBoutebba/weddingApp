import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../../services/faq.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response-faq',
  templateUrl: './response-faq.component.html',
  styleUrls: ['./response-faq.component.scss']
})
export class ResponseFaqComponent implements OnInit {

  public question;
  public questionUrl;
  public type;
  public category;
  public subCategory;
  public otherQts=[];

  constructor(private readonly  faqService: FaqService,
              private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.category = this.activatedRoute.snapshot.paramMap.get('category');
    this.subCategory = this.activatedRoute.snapshot.paramMap.get('subCategory');
    this.questionUrl = this.activatedRoute.snapshot.paramMap.get('question');
    this.faqService.findSubCategory(this.type, this.category, this.subCategory).subscribe((res: any) => {
      res = res[0];
      this.otherQts= res?.questions.filter((qts: any) => {
        return qts.question !== this.questionUrl.replaceAll('-', ' ');
      });
      this.question = res?.questions.filter((qts: any) => {
        return qts.question === this.questionUrl.replaceAll('-', ' ');
      });
      this.question = this.question[0];
    });
  }
}
