import { format, setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns';
import { ca, de, enGB, enUS, es, fr, gl, it, ja, ko, lt, nl, pl, pt, ptBR, ru, sk, th, zhCN } from 'date-fns/locale';

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

	public formatMonthAndYear(date: Date) {
		return format(date, 'MMMM, yyyy', {locale: this.convertSystelabLocaleToDateFnsLocale(this.locale)});
	}

	public getTimeFormat(withSeconds = false): string {
		if (withSeconds) {
			return this.locale === 'en-US' ? 'hh:mm:ss a' : 'HH:mm:ss';
		} else {
			return this.locale === 'en-US' ? 'hh:mm a' : 'HH:mm';
		}
	}

	public getDateFormat(isFullYear = false): string {
		let stringDateFormat = '';
		switch (this.locale) {
			case 'en-US':
				stringDateFormat = 'M/d/yy';
				break;
			case 'ko-KO':
				stringDateFormat = 'yy. M. d';
				break;
			case 'pl-PL':
			case 'lt-LT':
				stringDateFormat = 'yy-MM-dd';
				break;
			case 'pt-PT':
			case 'pt-BR':
			case 'nl-NL':
				stringDateFormat = 'dd-MM-yy';
				break;
			case 'sk-SK':
			case 'ru-RU':
				stringDateFormat = 'd.M.yy';
				break;
			case 'zh-ZH':
				stringDateFormat = 'yy-M-d';
				break;
			case 'de-DE':
				stringDateFormat = 'dd.MM.yy';
				break;
			case 'th-TH':
				stringDateFormat = 'd/M/yy';
				break;
			case 'ja-JA':
				stringDateFormat = 'yy/MM/dd';
				break;
			default:
				stringDateFormat = 'dd/MM/yy';
				break;
		}
		if (isFullYear) {
			stringDateFormat = stringDateFormat.replace('yy', 'yyyy');
			if (this.locale === 'en-US') {
				stringDateFormat = stringDateFormat.replace('M', 'MM');
				stringDateFormat = stringDateFormat.replace('D', 'dd');
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
		if (auxArray.indexOf('') > -1) {
			return undefined;
		}

		switch (locale) {
			case 'pl-PL':
			case 'lt-LT':
				return new Date(auxArray.join('/'));
			case 'zh-CN':
			case 'ja-JA':
			case 'en-US':
				return new Date(currentDateValue);
			default:
				return new Date(auxArray[1] + '/' + auxArray[0] + '/' + auxArray[2]);
		}
	}

	private convertSystelabLocaleToDateFnsLocale(locale: string): Locale {
		switch (locale) {
			case 'es':
			case 'es-ES':
			case 'es-CL':
			case 'es-MX':
			case 'es-UY':
			case 'es-AR':
			case 'es-BO':
			case 'es-CO':
			case 'es-CR':
			case 'es-DO':
			case 'es-EC':
			case 'es-SV':
			case 'es-GT':
			case 'es-HN':
			case 'es-NI':
			case 'es-PA':
			case 'es-PY':
			case 'es-PE':
			case 'es-PR':
			case 'es-VE':
				return es;
			case 'fr':
			case 'fr-FR':
				return fr;
			case 'it':
			case 'it-IT':
				return it;
			case 'en':
			case 'en-US':
				return enUS;
			case 'en-GB':
				return enGB;
			case 'pt':
				return pt;
			case 'pt-BR':
				return ptBR;
			case 'ca':
				return ca;
			case 'gl':
				return gl;
			case 'lt':
			case 'lt-LT':
				return lt;
			case 'pl':
			case 'pl-PL':
				return pl;
			case 'sk':
			case 'sk-SK':
				return sk;
			case 'ru':
			case 'ru-RU':
				return ru;
			case 'zh':
			case 'zh-CN':
				return zhCN;
			case 'de':
			case 'de-DE':
				return de;
			case 'th':
			case 'th-TH':
				return th;
			case 'ja':
			case 'ja-JA':
				return ja;
			case 'ko':
			case 'ko-KR':
				return ko;
			case 'nl':
			case 'nl-NL':
				return nl;
			default:
				return enUS;
		}
	}
}
