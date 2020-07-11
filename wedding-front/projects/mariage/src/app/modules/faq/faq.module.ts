import { NgModule } from '@angular/core';
import { FaqComponent } from './components/faq/faq.component';
import { SharedModule } from '../shared/shared.module';
import { FaqRoutingMoudule } from './faq.routing';
import { FaqSidenavComponent } from './components/client/faq-sidenav/faq-sidenav.component';
import { SubCategoryComponent } from './components/client/subCategory/subCategory.component';
import { TypeFaqComponent } from './components/client/type-faq/type-faq.component';
import { CategoryFaqComponent } from './components/client/category-faq/category-faq.component';
import { ResponseFaqComponent } from './components/client/response-faq/response-faq.component';


@NgModule({
  declarations: [
    FaqComponent,
    TypeFaqComponent,
    FaqSidenavComponent,
    CategoryFaqComponent,
    SubCategoryComponent,
    ResponseFaqComponent
  ],
  imports: [
    SharedModule,
    FaqRoutingMoudule
  ]
})
export class FaqModule { }
