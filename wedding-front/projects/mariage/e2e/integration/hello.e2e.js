/// <reference types="Cypress" />

describe('Actions', () => {
	beforeEach(() => {
		cy.visit(Cypress.env('URL'));
	});

	it('should have a title `mariage`', () => {
		cy.title('mariage');
	});
});
