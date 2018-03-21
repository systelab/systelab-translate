import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

import { DecimalFormat } from './decimal-format/DecimalFormat'
import { DateUtil } from './date-util/date-util';

@Injectable()
export class I18nService {

	protected locale: string;
	protected staticBundles: any = {};
	protected dateUtil: DateUtil;

	constructor(protected translateService: TranslateService) {
		this.translateService.setDefaultLang('en-US');
		this.dateUtil = new DateUtil('en-US');
	}

	public use(locale: string): Observable<any> {
		this.locale = locale;
		this.dateUtil.setLocale(locale);
		return this.translateService.use(locale);
	}

	public getCurrentLanguage() {
		return this.translateService.currentLang;
	}

	public getBrowserLang(): string | undefined {
		return this.translateService.getBrowserLang();
	}

	public setTranslation(locale: string, translations: Object) {
		this.translateService.setTranslation(locale, translations, false);
	}

	public appendTranslation(locale: string, translations: Object) {
		this.translateService.setTranslation(locale, translations, true);
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

	public getDateFormat(isFullYear = false): string {
		return this.dateUtil.getDateFormat(isFullYear);
	}

	public getDateFormatForDatePicker(isFullYear = false): string {
		return this.dateUtil.getDateFormatForDatePicker(isFullYear);
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

	public formatMonthAndYear(date: Date): string {
		return this.dateUtil.formatMonthAndYear(date);
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

	public getFirstDayOfWeek() {
		return this.dateUtil.getFirstDayOfWeek();
	}

	public parseDate(currentDateValue: string, locale?: string): Date {
		return this.dateUtil.parseDate(currentDateValue, locale);
	}


	public formatNumber(numberToFormat: number, decimalFormat: string, applyLocale?: boolean): string {
		const df: any = new DecimalFormat(decimalFormat);
		const sNumber: string = df.format(numberToFormat, decimalFormat);
		if (applyLocale) {
			let minimumFractionDigits = 0;
			if (sNumber.split('.')[1]) {
				minimumFractionDigits = sNumber.split('.')[1].length;
			}
			return Number(sNumber)
				.toLocaleString(this.locale, {'minimumFractionDigits': minimumFractionDigits});
		}
		return sNumber;
	}
}
