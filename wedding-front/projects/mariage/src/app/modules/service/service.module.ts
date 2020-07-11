import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {TopSearchedComponent} from './top-searched/top-searched.component';
import {PopulaireComponent} from './populaire/populaire.component';


@NgModule({
  declarations: [
    TopSearchedComponent,
    PopulaireComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    TopSearchedComponent,
    PopulaireComponent
  ]
})
export class ServiceModule { }
