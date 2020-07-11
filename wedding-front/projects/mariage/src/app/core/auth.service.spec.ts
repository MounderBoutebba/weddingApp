import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core.module';

describe('AuthService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule]
		}).compileComponents();
	});

	it('should be created', () => {
		const service: AuthService = TestBed.get(AuthService);
		expect(service).toBeTruthy();
	});
});
