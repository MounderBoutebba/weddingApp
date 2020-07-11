import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AvatarModule } from 'ngx-avatar';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragScrollModule } from 'ngx-drag-scroll';
import { NgxStarsModule } from 'ngx-stars';
import { Ng5SliderModule } from 'ng5-slider';
/*
import { IonicModule } from '@ionic/angular';
*/

@NgModule({
	declarations: [],
	imports: [
/*    IonicModule.forRoot({
      mode: 'ios'
    }),*/
    DragScrollModule,
    FlexLayoutModule,
    MaterialModule,
    NgxStarsModule,
    Ng5SliderModule,
		ToastrModule.forRoot({
			timeOut: 5000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
			closeButton: true,
      progressBar: false,
      countDuplicates: true
		})
  ],
	exports: [
    /*IonicModule,*/
    DragScrollModule,
    MaterialModule,
    ToastrModule,
    AvatarModule,
    FlexLayoutModule,
    NgxStarsModule,
    Ng5SliderModule
  ]
})
export class UiModule {}
