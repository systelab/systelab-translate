import { Observable } from 'rxjs/Rx';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

export class LocalizableTranslateStaticLoader implements TranslateLoader {

	protected prefix = '';

	constructor(private http: HttpClient,
				private location: Location) {

		if (!(window.location.pathname === '/' || window.location.pathname === '/context.html')) {
			this.prefix = window.location.pathname;
			if (this.prefix.endsWith('index.html')) {
				// That's the case of Electron when starting from local file.
				this.prefix = this.prefix.substr(0, this.prefix.length - 10);
			}
			if (this.prefix.endsWith('/')) {
				this.prefix = this.prefix.substr(0, this.prefix.length - 1);
			}
			if (this.prefix.endsWith(this.location.path())) {
				// When starting from an Angular application route
				this.prefix = this.prefix.substr(0, this.prefix.length - this.location.path().length);
			}

			this.prefix = (this.prefix !== '') ? this.prefix + '/' : '';
		}
	}

	public getTranslation(locale: string): Observable<any> {
		const language: string = locale.split('-')[0];
		const country: string = locale.split('-')[1];

		const languageAndCountry: string = language + '_' + country;

		return Observable.forkJoin(
			this.http.get(`${this.prefix}i18n/language/MessagesBundle_${language}.json`)
				.catch(e => Observable.of({})),
			this.http.get(`${this.prefix}i18n/language/MessagesBundle_${languageAndCountry}.json`)
				.catch(e => Observable.of({})),
			this.http.get(`${this.prefix}i18n/error/ErrorsBundle_${language}.json`)
				.catch(e => Observable.of({})),
			this.http.get(`${this.prefix}i18n/error/ErrorsBundle_${languageAndCountry}.json`)
				.catch(e => Observable.of({})))
			.map((translations: any[]) => {

				if (translations.length > 0) {
					let bundles = translations[0];
					for (let i = 1; i < translations.length; i++) {
						bundles = this.mergeRecursive(bundles, translations[i]);
					}
					return bundles;
				} else {
					return Observable.of(undefined);
				}
			});
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

