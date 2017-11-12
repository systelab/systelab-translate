import { Observable } from 'rxjs/Rx';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

export class LocalizableTranslateStaticLoader implements TranslateLoader {

	protected static prefix = 'i18n';

	constructor(private http: HttpClient) {

		if (window.location.pathname !== '/') {
			LocalizableTranslateStaticLoader.prefix = window.location.pathname + '/' + LocalizableTranslateStaticLoader.prefix;
		}
	}

	/**
	 * Gets the base translation overriden by the localizations if corresponds
	 */

	public getTranslation(locale: string): Observable<any> {
		const language: string = locale.split('_')[0];
		return Observable.forkJoin(
			this.http.get(`${LocalizableTranslateStaticLoader.prefix}/language/MessagesBundle_${language}.json`),
			this.http.get(`${LocalizableTranslateStaticLoader.prefix}/language/MessagesBundle_${locale}.json`),
			this.http.get(`${LocalizableTranslateStaticLoader.prefix}/error/ErrorsBundle_${language}.json`),
			this.http.get(`${LocalizableTranslateStaticLoader.prefix}/error/ErrorsBundle_${locale}.json`))
			.map((translations: any[]) => {
				const bundles: any[] = this.mergeRecursive(
					this.mergeRecursive(
						this.mergeRecursive(translations[0], translations[1]),
						translations[2]),
					translations[3]);

				return bundles;

			});
	}

	private mergeRecursive(obj1: any, obj2: any) {
		for (let p in obj2) {
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

