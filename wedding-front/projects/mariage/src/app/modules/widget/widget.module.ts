import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { PaginatorComponent } from './paginator/paginator.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MenuUserComponent } from './menu-user/menu-user.component';

@NgModule({
  declarations: [
    NavbarComponent,
    PaginatorComponent,
    GalleryComponent,
    MenuUserComponent
  ],
  exports: [
    NavbarComponent,
    PaginatorComponent,
    GalleryComponent
  ],
  imports: [
    SharedModule,
    AuthModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class WidgetModule {
}
