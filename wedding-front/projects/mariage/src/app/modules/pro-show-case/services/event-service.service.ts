import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class EventServiceService {
	modalOpened: Subject<boolean> = new Subject<boolean>();

	private styleTag: HTMLStyleElement;

	constructor() {
		this.styleTag = this.buildStyleElement();
	}

	// I disable the scrolling feature on the main viewport.
	public disable(): void {
		document.body.appendChild(this.styleTag);
	}

	// I re-enable the scrolling feature on the main viewport.
	public enable(): void {
		document.body.removeChild(this.styleTag);
	}
	// I build and return a Style element that will prevent scrolling on the body.
	private buildStyleElement(): HTMLStyleElement {
		var style = document.createElement('style');

		style.type = 'text/css';
		style.setAttribute('data-debug', 'Injected by event service image gallery tab.');
		style.textContent = `
		body {
			overflow: hidden !important ;
		}
	`;

		return style;
	}
}
