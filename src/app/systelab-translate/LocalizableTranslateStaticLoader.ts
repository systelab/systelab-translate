import { Observable } from 'rxjs/Rx';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

export class LocalizableTranslateStaticLoader implements TranslateLoader {

	protected prefix = '';

	constructor(private http: HttpClient) {

		console.log('------------');
		console.log(window.location.pathname);
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

