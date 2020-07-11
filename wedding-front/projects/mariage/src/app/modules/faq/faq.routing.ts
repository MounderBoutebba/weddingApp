import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FaqComponent } from './components/faq/faq.component';
import { TypeFaqComponent } from './components/client/type-faq/type-faq.component';
import { CategoryFaqComponent } from './components/client/category-faq/category-faq.component';
import { SubCategoryComponent } from './components/client/subCategory/subCategory.component';
import { ResponseFaqComponent } from './components/client/response-faq/response-faq.component';


const routes: Routes = [{
  path: '', children: [
    { path: '', component: FaqComponent },
    { path: ':type', component: TypeFaqComponent },
    { path: ':type/:category', component: CategoryFaqComponent },
    { path: ':type/:category/:subCategory', component: SubCategoryComponent },
    { path: ':type/:category/:subCategory/:question', component: ResponseFaqComponent }
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class FaqRoutingMoudule {
}
