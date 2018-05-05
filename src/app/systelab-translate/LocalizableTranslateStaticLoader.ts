
import {of as observableOf, forkJoin as observableForkJoin} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

export class LocalizableTranslateStaticLoader implements TranslateLoader {

	protected prefix = '';

	constructor(private http: HttpClient) {

		if (!(window.location.pathname === '/' || window.location.pathname === '/context.html')) {
			if (window.location.pathname.endsWith('index.html')) {
				// That's the case of Electron when starting from local file.
				this.prefix = window.location.pathname.replace('index.html', '');
			} else {
				this.prefix = window.location.pathname + '/';
			}
		}
	}

	public getTranslation(locale: string): Observable<any> {
		const language: string = locale.split('-')[0];
		const country: string = locale.split('-')[1];

		const languageAndCountry: string = language + '_' + country;

		return observableForkJoin(
			this.http.get(`${this.prefix}i18n/language/MessagesBundle_${language}.json`).pipe(
				catchError(e => observableOf({}))),
			this.http.get(`${this.prefix}i18n/language/MessagesBundle_${languageAndCountry}.json`).pipe(
				catchError(e => observableOf({}))),
			this.http.get(`${this.prefix}i18n/error/ErrorsBundle_${language}.json`).pipe(
				catchError(e => observableOf({}))),
			this.http.get(`${this.prefix}i18n/error/ErrorsBundle_${languageAndCountry}.json`).pipe(
				catchError(e => observableOf({})))).pipe(
			map((translations: any[]) => {

				if (translations.length > 0) {
					let bundles = translations[0];
					for (let i = 1; i < translations.length; i++) {
						bundles = this.mergeRecursive(bundles, translations[i]);
					}
					return bundles;
				} else {
					return observableOf(undefined);
				}
			}));
	}

	private mergeRecursive(obj1: any, obj2: any) {
		for (const p in obj2) {
			try {
				// Property in destination object set; update its value.
				if (obj2[p].constructor === Object) {
					obj1[p] = this.mergeRecursive(obj1[p], obj2[p]);
				} else {
					obj1[p] = obj2[p];
				}
			} catch (e) {
				// Property in destination object not set; create it and set its value.
				obj1[p] = obj2[p];
			}
		}
		return obj1;
	}

}

