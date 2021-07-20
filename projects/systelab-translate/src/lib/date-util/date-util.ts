import { format, setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns';
import { ca, de, enGB, enUS, es, fr, gl, it, ja, ko, lt, nl, pl, pt, ru, sk, th, zhCN } from 'date-fns/locale';

export class DateUtil {

	constructor(protected locale: string) {
	}

	public setLocale(lang: string): void {
		this.locale = lang;
	}

	public formatDate(date: Date): string {
		if (!date) {
			return undefined;
		}
		return format(date, this.getDateFormat());
	}

	public formatDateFullYear(date: Date): string {
		if (!date) {
			return undefined;
		}
		return format(date, this.getDateFormat(true));
	}

	public formatTime(date: Date, withSeconds?: boolean): string {
		if (!date) {
			return undefined;
		}
		return format(date, this.getTimeFormat(withSeconds));
	}

	public formatDateTime(date: Date, fullYear?: boolean, withSeconds?: boolean): string {
		if (!date) {
			return undefined;
		}
		const formatedDate = (fullYear) ? this.formatDateFullYear(date) : this.formatDate(date);
		const formatedHour = this.formatTime(date, withSeconds);
		return formatedDate + ' ' + formatedHour;
	}

	public formatMonthAndYear(date: Date): string {
		if (!date) {
			return undefined;
		}
		return format(date, 'MMMM, yyyy', {locale: this.convertSystelabLocaleToDateFnsLocale(this.locale)});
	}

	public formatDateAndShortMonth(date: Date): string {
		if (!date) {
			return undefined;
		}
		return format(date, 'd MMM', {locale: this.convertSystelabLocaleToDateFnsLocale(this.locale)});
	}

	public getDateFrom(date: Date): Date {
		let d: Date = setHours(date, 0);
		d = setMinutes(d, 0);
		d = setSeconds(d, 0);
		d = setMilliseconds(d, 0);
		return d;
	}

	public getDateTo(date: Date): Date {
		let d: Date = setHours(date, 23);
		d = setMinutes(d, 59);
		d = setSeconds(d, 59);
		d = setMilliseconds(d, 999);
		return d;
	}

	public getDateMidDay(date: Date): Date {
		let d: Date = setHours(date, 12);
		d = setMinutes(d, 0);
		d = setSeconds(d, 0);
		d = setMilliseconds(d, 0);
		return d;
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

	private convertSystelabLocaleToDateFnsLocale(localeString: string): Locale {
		const localeForSystelabLocale = new Map<string, Locale>([
			['es', es], ['es-ES', es], ['es-CL', es], ['es-MX', es], ['es-UY', es], ['es-AR', es], ['es-BO', es],
			['es-CO', es], ['es-CR', es], ['es-DO', es], ['es-EC', es], ['es-SV', es], ['es-GT', es], ['es-HN', es],
			['es-NI', es], ['es-PA', es], ['es-PY', es], ['es-PE', es], ['es-PR', es], ['es-VE', es], ['fr', fr],
			['fr-FR', fr], ['it', it], ['it-IT', it], ['en', enUS], ['en-US', enUS], ['en-GB', enGB], ['pt', pt],
			['pt-BR', pt], ['ca', ca], ['gl', gl], ['lt', lt], ['lt-LT', lt], ['pl', pl], ['pl-PL', pl], ['sk', sk],
			['sk-SK', sk], ['ru', ru], ['ru-RU', ru], ['zh', zhCN], ['zh-CN', zhCN], ['de', de], ['de-DE', de],
			['th', th], ['th-TH', th], ['ja', ja], ['ja-JA', ja], ['ko', ko], ['ko-KR', ko], ['nl', nl], ['nl-NL', nl],
		]);
		const locale: Locale = localeForSystelabLocale.get(localeString)
		return locale ? locale : enUS;
	}
}
