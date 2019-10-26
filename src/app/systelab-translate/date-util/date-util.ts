import { format, setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns';

export class DateUtil {

	constructor(protected locale: string) {
	}

	public setLocale(lang: string) {
		this.locale = lang;
	}

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
		const formatedHour = this.formatTime(date, withSeconds);
		return formatedDate + ' ' + formatedHour;
	}

	public formatMonthAndYear(date: Date) {
		return format(date, 'MMMM, YYYY', {locale: this.locale});
	}

	public getDateFrom(date: Date) {
		let d: Date = setHours(date, 0);
		d = setMinutes(d, 0);
		d = setSeconds(d, 0);
		d = setMilliseconds(d, 0);
		return d;
	}

	public getDateTo(date: Date) {
		let d: Date = setHours(date, 23);
		d = setMinutes(d, 59);
		d = setSeconds(d, 59);
		d = setMilliseconds(d, 999);
		return d;
	}

	public getDateMidDay(date: Date) {
		let d: Date = setHours(date, 12);
		d = setMinutes(d, 0);
		d = setSeconds(d, 0);
		d = setMilliseconds(d, 0);
		return d;
	}

	public getDateFormat(isFullYear = false): string {
		let stringDateFormat = '';
		switch (this.locale) {
			case 'en-US':
				stringDateFormat = 'M/D/YY';
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

	public getTimeFormat(withSeconds = false): string {
		if (withSeconds) {
			return this.locale === 'en-US' ? 'hh:mm:ss a' : 'HH:mm:ss'
		} else {
			return this.locale === 'en-US' ? 'hh:mm a' : 'HH:mm';
		}
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

	public getSeparator(locale: string): string {
		switch (locale) {
			case 'pl-PL':
			case 'lt-LT':
			case 'pt-PT':
			case 'pt-BR':
			case 'nl-NL':
				return '-';
			case 'sk-SK':
			case 'ru-RU':
			case 'de-DE':
				return '.';
			case 'en-US':
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
			case 'zh-CN':
			case 'th-TH':
			case 'ja-JA':
			default:
				return '/';
		}
	}

	public parseDate(currentDateValue: string, locale?: string): Date {

		if (!locale) {
			locale = this.locale;
		}

		if (!currentDateValue) {
			return undefined;
		}

		const auxArray = currentDateValue.split(this.getSeparator(locale));
		if (auxArray.length!==3) {
			return undefined;
		}

		switch (locale) {
			case 'en-US':
			case 'ja-JA':
			case 'zh-CN':
				return new Date(currentDateValue);
			case 'pl-PL':
			case 'lt-LT':
				return new Date(auxArray.join('/'));
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
			case 'pt-PT':
			case 'pt-BR':
			case 'nl-NL':
			case 'sk-SK':
			case 'ru-RU':
			case 'th-TH':
			case 'de-DE':
			default:
				return new Date(auxArray[1] + '/' + auxArray[0] + '/' + auxArray[2]);
		}
	}
}
