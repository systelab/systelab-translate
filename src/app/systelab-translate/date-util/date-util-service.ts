import { addDays, format, setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns';

export class DateUtil {

	constructor(protected language: string) {
	}

	public setLanguage(lang: string) {
		this.language = lang;
	}

	public getDateFormat(isFullYear = false): string {
		let stringDateFormat = '';
		switch (this.language) {
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
			if (this.language === 'us' || this.language === 'en_US') {
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

	// TODO: Review.
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

}
