import { addDays, format, setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns';

export class DateUtil {

	constructor(protected locale: string) {
	}

	public setLocale(lang: string) {
		this.locale = lang;
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

	public formatMonthAndYear(date: Date) {
		return format(date, 'MMMM, YYYY', { locale: this.locale });
	}

	public getDateFormat(isFullYear = false): string {
		let stringDateFormat = '';
		switch (this.locale) {
			case 'en-US':
				stringDateFormat = 'M/D/YY';
				break;
			case 'en-GB':
			case 'it-IT':
			case 'es-AR':
			case 'es-ES':
			case 'es-BO':
			case 'es-CL':
			case 'es-CO':
			case 'es-CR':
			case 'es-DO':
			case 'es-EC':
			case 'es-GT':
			case 'es-HN':
			case 'es-MX':
			case 'es-NI':
			case 'es-PA':
			case 'es-PE':
			case 'es-PR':
			case 'es-PY':
			case 'es-SV':
			case 'es-UR':
			case 'es-VE':
			case 'fr-FR':
			case 'gl-GL':
			case 'ca-CA':
				stringDateFormat = 'DD/MM/YY';
				break;
			case 'ko-KO':
				stringDateFormat = 'YY. M. D';
				break;
			case 'pl-PL':
			case 'lt-LT':
				stringDateFormat = 'YY-MM-DD';
				break;
			case 'pt-PT':
			case 'pt-BR':
			case 'nl-NL':
				stringDateFormat = 'DD-MM-YY';
				break;
			case 'sk-SK':
			case 'ru-RU':
				stringDateFormat = 'D.M.YY';
				break;
			case 'zh-ZH':
				stringDateFormat = 'YY-M-D';
				break;
			case 'de-DE':
				stringDateFormat = 'DD.MM.YY';
				break;
			case 'th-TH':
				stringDateFormat = 'D/M/YY';
				break;
			case 'ja-JA':
				stringDateFormat = 'YY/MM/DD';
				break;
			default:
				stringDateFormat = 'DD/MM/YY';
				break;
		}
		if (isFullYear) {
			stringDateFormat = stringDateFormat.replace('YY', 'YYYY');
			if (this.locale === 'en-US') {
				stringDateFormat = stringDateFormat.replace('M', 'MM');
				stringDateFormat = stringDateFormat.replace('D', 'DD');
			}
		}
		return stringDateFormat;
	}

	public getDateFormatForDatePicker(isFullYear = false): string {
		let stringDateFormat = '';
		switch (this.locale) {
			case 'en-US':
				stringDateFormat = 'm/d/y';
				break;
			case 'en-GB':
			case 'it-IT':
			case 'es-AR':
			case 'es-ES':
			case 'es-BO':
			case 'es-CL':
			case 'es-CO':
			case 'es-CR':
			case 'es-DO':
			case 'es-EC':
			case 'es-GT':
			case 'es-HN':
			case 'es-MX':
			case 'es-NI':
			case 'es-PA':
			case 'es-PE':
			case 'es-PR':
			case 'es-PY':
			case 'es-SV':
			case 'es-UR':
			case 'es-VE':
			case 'fr-FR':
			case 'gl-GL':
			case 'ca-CA':
				stringDateFormat = 'dd/mm/y';
				break;
			case 'ko-KO':
				stringDateFormat = 'y. m. d';
				break;
			case 'pl-PL':
			case 'lt-LT':
				stringDateFormat = 'y-mm-dd';
				break;
			case 'pt-PT':
			case 'pt-BR':
			case 'nl-NL':
				stringDateFormat = 'dd-mm-y';
				break;
			case 'sk-SK':
			case 'ru-RU':
				stringDateFormat = 'd.m.y';
				break;
			case 'zh-CN':
				stringDateFormat = 'y-m-d';
				break;
			case 'de-DE':
				stringDateFormat = 'dd.mm.y';
				break;
			case 'th-TH':
				stringDateFormat = 'd/m/y';
				break;
			case 'ja-JA':
				stringDateFormat = 'y/mm/dd';
				break;
			default:
				stringDateFormat = 'dd/mm/y';
				break;
		}
		if (isFullYear) {
			stringDateFormat = stringDateFormat.replace('y', 'yy');
			if (this.locale === 'en-US') {
				stringDateFormat = stringDateFormat.replace('m', 'mm');
				stringDateFormat = stringDateFormat.replace('d', 'dd');
			}
		}
		return stringDateFormat;
	}

	public getFirstDayOfWeek(): number {
		switch (this.locale) {
			case 'en-US':
			case 'zh-CN':
			case 'th-TH':
			case 'ja-JA':
				return 0; // Sunday
			default:
				return 1; // Monday
		}
	}

	public parseDate(currentDateValue: string, locale?: string): Date {
		let auxDate: string, auxArray: Array<string>;

		if (!currentDateValue) {
			currentDateValue = '';
		}

		if (!locale) {
			locale = this.locale;
		}


		switch (locale) {
			case 'en-US':
				auxArray = currentDateValue.split('/');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = currentDateValue;
				break;
			case 'en-GB':
			case 'it-IT':
			case 'es-AR':
			case 'es-ES':
			case 'es-BO':
			case 'es-CL':
			case 'es-CO':
			case 'es-CR':
			case 'es-DO':
			case 'es-EC':
			case 'es-GT':
			case 'es-HN':
			case 'es-MX':
			case 'es-NI':
			case 'es-PA':
			case 'es-PE':
			case 'es-PR':
			case 'es-PY':
			case 'es-SV':
			case 'es-UR':
			case 'es-VE':
			case 'fr-FR':
			case 'gl-GL':
			case 'ca-CA':
				auxArray = currentDateValue.split('/');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = auxArray[1] + '/' + auxArray[0] + '/' + auxArray[2];
				break;
			case 'pl-PL':
			case 'lt-LT':
				auxArray = currentDateValue.split('-');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = auxArray.join('/');
				break;
			case 'pt-PT':
			case 'pt-BR':
			case 'nl-NL':
				auxArray = currentDateValue.split('-');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = auxArray[1] + '/' + auxArray[0] + '/' + auxArray[2];
				break;
			case 'sk-SK':
			case 'ru-RU':
				auxArray = currentDateValue.split('.');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = auxArray[1] + '/' + auxArray[0] + '/' + auxArray[2];
				break;
			case 'zh-CN':
				auxArray = currentDateValue.split('/');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = currentDateValue;
				break;
			case 'de-DE':
				auxArray = currentDateValue.split('.');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = auxArray[1] + '/' + auxArray[0] + '/' + auxArray[2];
				break;
			case 'th-TH':
				auxArray = currentDateValue.split('/');
				if (auxArray.indexOf('') > -1) {
					return undefined;
				}
				auxDate = auxArray[1] + '/' + auxArray[0] + '/' + auxArray[2];
				break;
			case 'ja-JA':
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
	public isWithinRange(pBeginDate1: Date, pEndDate1: Date, pBeginDate2: Date, pEndDate2: Date): boolean {
		// ( ( start1 >= start2 and start1 <= end2 ) or
		// ( end1 >= start2 and end1 <= end2 ) or
		// ( start1 <= start2 and end1 >= end2 ) )
		return (pBeginDate1.getTime() >= pBeginDate2.getTime() && pBeginDate1.getTime() <= pEndDate2.getTime())
			|| (pEndDate1.getTime() >= pBeginDate2.getTime() && pEndDate1.getTime() <= pEndDate2.getTime())
			|| ((pBeginDate1.getTime() < pBeginDate2.getTime() || pEndDate1.getTime() === pBeginDate2.getTime()) && pEndDate1.getTime() >= pEndDate2.getTime());
	}
}
