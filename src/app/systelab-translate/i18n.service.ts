import { Injectable } from '@angular/core';
import { addDays, format, setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

import { DecimalFormat } from './decimal-format/DecimalFormat'
import { DateUtil } from './date-util/date-util-service';

@Injectable()
export class I18nService {

	protected language: string;
	protected staticBundles: any = {};
	protected dateUtil: DateUtil;

	constructor(protected translateService: TranslateService) {
		this.translateService.setDefaultLang('en');
		this.dateUtil = new DateUtil('en');
	}

	public use(lang: string): Observable<any> {

		let translateLanguage: string = this.getLanguageFromCodeForTranslation(lang);
		this.language = lang;
		const country: string = this.getCountryFromCodeForTranslation(lang);
		if (country) {
			translateLanguage += '_' + country;
		}
		this.dateUtil.setLanguage(translateLanguage);
		return this.translateService.use(translateLanguage);

	}

	public getCurrentLanguage() {
		return this.translateService.currentLang;
	}

	public getBrowserLang(): string | undefined {
		return this.translateService.getBrowserLang();
	}

	public setTranslation(lang: string, translations: Object) {
		this.translateService.setTranslation(this.getLanguageFromCodeForTranslation(lang), translations, false);
	}

	public appendTranslation(lang: string, translations: Object) {
		this.translateService.setTranslation(this.getLanguageFromCodeForTranslation(lang), translations, true);
	}

	public get(bundle: string | string[]): Observable<any> {
		if (typeof bundle === 'string' && this.staticBundles[bundle]) {
			return Observable.of(this.staticBundles[bundle]);
		}
		return this.translateService.get(bundle);
	}

	public instant(key: string | Array<string>, interpolateParams?: any): string | any {
		if (typeof key === 'string' && this.staticBundles[key]) {
			let bundleValue = '';
			if (typeof interpolateParams === 'object') {
				Object.keys(interpolateParams)
					.forEach((paramKey: string) => {
						bundleValue = this.staticBundles[key].replace('{{' + paramKey + '}}', interpolateParams[paramKey]);
					});
				return bundleValue;
			} else if (this.staticBundles[key].indexOf('{') > -1 && !interpolateParams) {
				const regEx = /{{([^]*)}}/g;
				return this.staticBundles[key].replace(regEx, '');
			}
			return this.staticBundles[key];
		}
		return this.translateService.instant(key, interpolateParams);
	}

	public setStaticBundles(staticBundles: any): void {
		if (staticBundles) {
			this.staticBundles = staticBundles;
		}
	}

	public getCountryFromCodeForTranslation(code: string): string {

		if ('us' === code) {
			return 'US';
		}
		if ('br' === code) {
			return 'BR';
		}
		return undefined;
	}

	public getLanguageFromCodeForTranslation(code: string) {
		if ('mx' === code) {
			return 'es';
		} else if ('ur' === code) {
			return 'es';
		} else if ('cl' === code) {
			return 'es';
		} else if ('ar' === code) {
			return 'es';
		} else if ('bo' === code) {
			return 'es';
		} else if ('co' === code) {
			return 'es';
		} else if ('cr' === code) {
			return 'es';
		} else if ('do' === code) {
			return 'es';
		} else if ('ec' === code) {
			return 'es';
		} else if ('sv' === code) {
			return 'es';
		} else if ('gt' === code) {
			return 'es';
		} else if ('hn' === code) {
			return 'es';
		} else if ('ni' === code) {
			return 'es';
		} else if ('pa' === code) {
			return 'es';
		} else if ('py' === code) {
			return 'es';
		} else if ('pe' === code) {
			return 'es';
		} else if ('pr' === code) {
			return 'es';
		} else if ('ve' === code) {
			return 'es';
		} else if ('us' === code) {
			return 'en';
		} else if ('br' === code) {
			return 'pt';
		} else {
			return code;
		}
	}

	public getDateFormat(isFullYear = false): string {
		return this.dateUtil.getDateFormat(isFullYear);
	}

	public getTimeFormat(withSeconds = false): string {
		return this.dateUtil.getTimeFormat(withSeconds);
	}

	public formatDate(date: Date): string {
		return this.dateUtil.formatDate(date);
	}

	public formatDateFullYear(date: Date): string {
		return this.dateUtil.formatDateFullYear(date);
	}

	public formatTime(date: Date, withSeconds?: boolean): string {
		return this.dateUtil.formatTime(date, withSeconds);
	}

	public formatDateTime(date: Date, fullYear?: boolean, withSeconds?: boolean): string {
		return this.dateUtil.formatDateTime(date, fullYear, withSeconds);
	}

	public getDateFrom(date: Date) {
		return this.dateUtil.getDateFrom(date);
	}

	public getDateTo(date: Date) {
		return this.dateUtil.getDateTo(date);
	}

	public getDateMidDay(date: Date) {
		return this.dateUtil.getDateMidDay(date);
	}

	public convertStringDateToDateFormat(currentDateValue: string, language: string): Date {
		return this.dateUtil.convertStringDateToDateFormat(currentDateValue, language);
	}

	public formatNumber(numberToFormat: number, decimalFormat: string, applyLocale?: boolean): string {
		const df: any = new DecimalFormat(decimalFormat);
		const locale: string = this.getLanguageFromCodeForTranslation(this.language) + '-' + this.language.toUpperCase();
		const sNumber: string = df.format(numberToFormat, decimalFormat);
		if (applyLocale) {
			let minimumFractionDigits = 0;
			if (sNumber.split('.')[1]) {
				minimumFractionDigits = sNumber.split('.')[1].length;
			}
			return Number(sNumber)
				.toLocaleString(locale, {'minimumFractionDigits': minimumFractionDigits});
		}
		return sNumber;
	}
}
