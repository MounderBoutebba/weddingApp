import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from './core/core.module';
import {SharedModule} from './modules/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {WidgetModule} from './modules/widget/widget.module';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
      imports: [
        SharedModule,
        TranslateModule.forRoot({}),
        ReactiveFormsModule,
        CoreModule,
        WidgetModule,
        FormsModule,
        LoadingBarRouterModule,
        LoadingBarHttpClientModule,
        ReactiveFormsModule,
      ],
			declarations: [AppComponent]
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'mariage'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('mariage');
	});

	it.skip('should render title in a h1 tag', () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('h1').textContent).toContain('Welcome to mariage!');
	});
});
