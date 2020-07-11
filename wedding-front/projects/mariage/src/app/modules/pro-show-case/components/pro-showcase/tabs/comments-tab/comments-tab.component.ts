import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'projects/mariage/src/environments';
import { Comments } from 'projects/mariage/src/app/modules/user/models/comment.model';

@Component({
	selector: 'app-comments-tab',
	templateUrl: './comments-tab.component.html',
	styleUrls: ['./comments-tab.component.scss']
})
export class CommentsTabComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() searchedCategory: string;
	public categoryLabelEnum = CategoryLabelEnum;
	commentsHidden: boolean;
	qualiteServivceValue: number;
	flexibiliteValue: number;
	professionalismeValue: number;
	rapportQualitePrixValue: number;
	noteMoyenne: number;
	comments: Comments[] = [];
	totalPage: number = 0;
	currentPage: number = 1;

	constructor(private readonly http: HttpClient) {}

	ngOnInit(): void {
		this.getComments().subscribe(res => {
			this.comments = res.items;
			this.totalPage = res.totalItems;
		});
		this.flexibiliteValue = this.companyDescriptionInfo?.company.flexibilite;
		this.professionalismeValue = this.companyDescriptionInfo?.company.professionnalisme;
		this.rapportQualitePrixValue = this.companyDescriptionInfo?.company.rapportQualitePrix;
		this.qualiteServivceValue = this.companyDescriptionInfo?.company.qualiteService;
		this.noteMoyenne = this.companyDescriptionInfo?.company.totalNotes;
	}
	showMore() {
		this.commentsHidden = !this.commentsHidden;
	}
	public getComments(): Observable<any> {
		return this.http.get(
			`${environment.apiUrl}/comments/company/${this.companyDescriptionInfo.company.id}?page=${this.currentPage}`
		);
	}
	searchPaginated($event) {
		this.currentPage = $event.pageIndex;
		this.getComments();
		console.log($event);
	}
}
