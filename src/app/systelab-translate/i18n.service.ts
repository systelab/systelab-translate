import { Injectable } from '@angular/core';
import { addDays, format, setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import DecimalFormat from '../decimal-format/DecimalFormat';


@Injectable()
export class I18nService {

	protected language: string;
	protected staticBundles: any = {};

	constructor(protected translateService: TranslateService) {
		this.translateService.setDefaultLang('en');
	}

	public use(lang: string): Observable<any> {

		let translateLanguage: string = this.getLanguageFromCodeForTranslation(lang);
		this.language = lang;
		const country: string = this.getCountryFromCodeForTranslation(lang);
		if (country) {
			translateLanguage += '_' + country;
		}
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
		let stringDateFormat = '';
		switch (this.translateService.currentLang) {
			case 'us':
			case 'en_US':
				stringDateFormat = 'M/D/YY';
				break;
			case 'en':
			case 'it':
			case 'ar':
			case 'es':
			case 'bo':
			case 'cl':
			case 'co':
			case 'cr':
			case 'do':
			case 'ec':
			case 'gt':
			case 'hn':
			case 'mx':
			case 'ni':
			case 'pa':
			case 'pe':
			case 'pr':
			case 'py':
			case 'sv':
			case 'ur':
			case 've':
			case 'fr':
			case 'gl':
			case 'ca':
				stringDateFormat = 'DD/MM/YY';
				break;
			case 'ko':
				stringDateFormat = 'YY. M. D';
				break;
			case 'pl':
			case 'lt':
				stringDateFormat = 'YY-MM-DD';
				break;
			case 'pt':
			case 'pt_BR':
			case 'nl':
				stringDateFormat = 'DD-MM-YY';
				break;
			case 'sk':
			case 'ru':
				stringDateFormat = 'D.M.YY';
				break;
			case 'zh':
				stringDateFormat = 'YY-M-D';
				break;
			case 'de':
				stringDateFormat = 'DD.MM.YY';
				break;
			case 'th':
				stringDateFormat = 'D/M/YY';
				break;
			case 'ja':
				stringDateFormat = 'YY/MM/DD';
				break;
			default:
				stringDateFormat = 'DD/MM/YY';
				break;
		}
		if (isFullYear) {
			stringDateFormat = stringDateFormat.replace('YY', 'YYYY');
			if (this.translateService.currentLang === 'us' || this.translateService.currentLang === 'en_US') {
				stringDateFormat = stringDateFormat.replace('M', 'MM');
				stringDateFormat = stringDateFormat.replace('D', 'DD');
			}
		}
		return stringDateFormat;
	}

	public getTimeFormat(withSeconds = false): string {
		return (withSeconds) ? 'HH:mm:ss' : 'HH:mm';
	}

	// DATE TIME FUNCTIONS

	public formatDate(date: Date): string {
		return format(date, this.getDateFormat());

	}

	public formatDateFullYear(date: Date): string {
		return format(date, this.getDateFormat(true));

	}

	public formatTime(date: Date, withSeconds?: boolean): string {
		return format(date, this.getTimeFormat(withSeconds));
	}

	public formatDateTime(date: Date, fullYear?: boolean, withSeconds?: boolean): string {
		const formatedDate = (fullYear) ? this.formatDateFullYear(date) : this.formatDate(date);
		const formatedHour = (withSeconds) ? this.formatTime(date, true) : this.formatTime(date);
		return formatedDate + ' ' + formatedHour;
	}

	public getDateFrom(date: Date) {
		let d: Date = setHours(date, 0);
		d = setMinutes(d, 0);
		d = setSeconds(d, 0);
		d = setMilliseconds(d, 0);
		return d;
	}

	public getDateTo(date: Date) {
		let d: Date = setHours(date, 0);
		d = setMinutes(d, 0);
		d = setSeconds(d, 0);
		d = setMilliseconds(d, 0);
		d = addDays(d, 1);
		return d;
	}

	public getDateMidDay(date: Date) {
		let d: Date = setHours(date, 12);
		d = setMinutes(d, 0);
		d = setSeconds(d, 0);
		d = setMilliseconds(d, 0);
		return d;
	}

	public convertStringDateToDateFormat(currentDateValue: string, language: string): Date {
		let auxDate: string, auxArray: Array<string>;

		if (!currentDateValue) {
			currentDateValue = '';
		}

		switch (language) {
			case 'us':
			case 'en_US':
				auxArray = currentDateValue.split('/');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = currentDateValue;
				break;
			case 'en':
			case 'it':
			case 'ar':
			case 'es':
			case 'bo':
			case 'cl':
			case 'co':
			case 'cr':
			case 'do':
			case 'ec':
			case 'gt':
			case 'hn':
			case 'mx':
			case 'ni':
			case 'pa':
			case 'pe':
			case 'pr':
			case 'py':
			case 'sv':
			case 'ur':
			case 've':
			case 'fr':
			case 'gl':
			case 'ca':
				auxArray = currentDateValue.split('/');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = auxArray[1] + '/' + auxArray[0] + '/' + auxArray[2];
				break;
			case 'pl':
			case 'lt':
				auxArray = currentDateValue.split('-');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = auxArray.join('/');
				break;
			case 'pt':
			case 'pt_BR':
			case 'nl':
				auxArray = currentDateValue.split('-');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = auxArray[1] + '/' + auxArray[0] + '/' + auxArray[2];
				break;
			case 'sk':
			case 'ru':
				auxArray = currentDateValue.split('.');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = auxArray[1] + '/' + auxArray[0] + '/' + auxArray[2];
				break;
			case 'zh':
				auxArray = currentDateValue.split('/');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = currentDateValue;
				break;
			case 'de':
				auxArray = currentDateValue.split('.');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = auxArray[1] + '/' + auxArray[0] + '/' + auxArray[2];
				break;
			case 'th':
				auxArray = currentDateValue.split('/');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = auxArray[1] + '/' + auxArray[0] + '/' + auxArray[2];
				break;
			case 'ja':
				auxArray = currentDateValue.split('/');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = currentDateValue;
				break;
			default:
				auxArray = currentDateValue.split('/');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = auxArray[1] + '/' + auxArray[0] + '/' + auxArray[2];
		}
		return new Date(auxDate);
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
