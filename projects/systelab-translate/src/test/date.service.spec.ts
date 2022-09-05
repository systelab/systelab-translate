import { httpLoaderFactory, I18nService } from '../public-api';
import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {DateUtil} from '../lib/date-util/date-util';

const getExampleDate = (oneDigitDay = false): Date => {
	const date = new Date();
	const day = oneDigitDay ? 1 : 28;
	const month = oneDigitDay ? 4 : 0;
	date.setFullYear(2016, month, day);
	return date;
};

const getExampleDateTime = (oneDigitDay = false): Date => {
	const date = getExampleDate(oneDigitDay);
	date.setHours(21);
	date.setMinutes(0, 0, 0);
	return date;
};

describe('Date Service', () => {
	let service: I18nService;

	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				TranslateModule.forRoot({
					loader: {
						provide:    TranslateLoader,
						useFactory: httpLoaderFactory,
						deps:       [HttpClient]
					}
				})
			]
		});
		service = TestBed.get(I18nService);
	});

	afterEach(() => {
		service = undefined;
	});

	it('Format a date', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				const date = new Date();
				date.setFullYear(2016, 0, 28);
				expect(service.formatDate(date))
					.toBe('28/01/16');
				expect(service.formatDateFullYear(date))
					.toBe('28/01/2016');
				expect(service.formatDateAndShortMonth(date))
					.toBe('28 ene');
				done();
			});
	});

	it('Format a date for Datepicker', done => {
		const expectations = {
			'en-US': 'm/d/y',
			'ko-KO': 'y. m. d',
			'pl-PL': 'y-mm-dd',
			'lt-LT': 'y-mm-dd',
			'pt-PT': 'dd-mm-y',
			'pt-BR': 'dd-mm-y',
			'nl-NL': 'dd-mm-y',
			'sk-SK': 'd.m.y',
			'ru-RU': 'd.m.y',
			'zh-CN': 'y-m-d',
			'de-DE': 'dd.mm.y',
			'th-TH': 'd/m/y',
			'ja-JA': 'y/mm/dd',
			'es-ES': 'dd/mm/y',
			'ca-ES': 'dd/mm/y',
		};
		const dateUtil = new DateUtil('en-US');
		Object.keys(expectations).forEach(key => {
			dateUtil.setLocale(key);
			expect(dateUtil.getDateFormatForDatePicker()).toBe(expectations[key]);
		});
		done();
	});

	it('Localized String Date Format', done => {
		const expectations = {
			'en-US': 'M/d/yy',
			'ko-KO': 'yy. M. d',
			'pl-PL': 'yy-MM-dd',
			'lt-LT': 'yy-MM-dd',
			'pt-PT': 'dd-MM-yy',
			'pt-BR': 'dd-MM-yy',
			'nl-NL': 'dd-MM-yy',
			'sk-SK': 'd.M.yy',
			'ru-RU': 'd.M.yy',
			'zh-ZH': 'yy-M-d',
			'de-DE': 'dd.MM.yy',
			'th-TH': 'd/M/yy',
			'ja-JA': 'yy/MM/dd',
			'es-ES': 'dd/MM/yy',
			'ca-ES': 'dd/MM/yy',
		};
		const dateUtil = new DateUtil('en-US');
		Object.keys(expectations).forEach(key => {
			dateUtil.setLocale(key);
			expect(dateUtil.getDateFormat()).toBe(expectations[key]);
		});
		done();
	});

	it('Format a date in USA', (done) => {
		service.use('en-US')
			.subscribe(() => {
				const date = getExampleDate();
				const dateWith1DigitDay = getExampleDate(true);
				expect(service.formatDate(date))
					.toBe('1/28/16');
				expect(service.formatDateFullYear(date))
					.toBe('01/28/2016');
				expect(service.formatDateFullYear(dateWith1DigitDay))
					.toBe('05/01/2016');
				done();
			});
	});

	it('Parse a date', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				expect(service.formatDate(service.parseDate('28/01/16')))
					.toBe('28/01/16');
				expect(service.formatDateFullYear(service.parseDate('28/01/2016')))
					.toBe('28/01/2016');
				done();
			});
	});

	it('Parse a date in USA', (done) => {
		service.use('en-US')
			.subscribe(() => {
				expect(service.formatDate(service.parseDate('1/28/16')))
					.toBe('1/28/16');
				expect(service.formatDateFullYear(service.parseDate('01/28/2016')))
					.toBe('01/28/2016');
				done();
			});
	});

	it('Format a time and a date and time', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				const date = getExampleDateTime();
				expect(service.formatTime(date))
					.toBe('21:00');
				expect(service.formatDateTime(date))
					.toBe('28/01/16 21:00');
				done();
			});
	});

	it('Format a time and a date and time in USA', (done) => {
		service.use('en-US')
			.subscribe(() => {
				const date = getExampleDateTime();
				expect(service.formatTime(date))
					.toBe('09:00 PM');
				expect(service.formatDateTime(date))
					.toBe('1/28/16 09:00 PM');
				done();
			});
	});

	it('Get dates at the begging of the day, at the end and at noon', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				const date = getExampleDate();
				date.setHours(21);
				expect(service.formatDateTime(service.getDateFrom(date)))
					.toBe('28/01/16 00:00');
				expect(service.formatDateTime(service.getDateTo(date)))
					.toBe('28/01/16 23:59');
				expect(service.formatDateTime(service.getDateMidDay(date)))
					.toBe('28/01/16 12:00');
				done();
			});
	});

	it('Format a date and time with AM/PM', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				const date = getExampleDateTime();
				expect(service.formatTime(date))
					.toBe('21:00');
				expect(service.formatDateTime(date))
					.toBe('28/01/16 21:00');
				expect(service.formatDateTime(date, false, true))
					.toBe('28/01/16 21:00:00');
				done();
			});
	});

	it('Format a date and time in USA with AM/PM', (done) => {
		service.use('en-US')
			.subscribe(() => {
				const date = getExampleDateTime();
				const dateWithOneDigitDay = getExampleDateTime(true);
				expect(service.formatTime(date))
					.toBe('09:00 PM');
				expect(service.formatDateTime(date))
					.toBe('1/28/16 09:00 PM');
				expect(service.formatDateTime(date, false, true))
					.toBe('1/28/16 09:00:00 PM');
				expect(service.formatDateTime(dateWithOneDigitDay, false, true))
					.toBe('5/1/16 09:00:00 PM');
				done();
			});
	});

	it('Format an undefined date value', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				const date = undefined;
				expect(service.formatDate(date))
					.toBe(undefined);
				expect(service.formatDateFullYear(date))
					.toBe(undefined);
				expect(service.formatTime(date))
					.toBe(undefined);
				expect(service.formatDateTime(date))
					.toBe(undefined);
				expect(service.formatMonthAndYear(date))
					.toBe(undefined);
				expect(service.formatDateFullYear(date))
					.toBe(undefined);
				expect(service.formatDateAndShortMonth(date))
					.toBe(undefined);
				done();
			});
	});

});
