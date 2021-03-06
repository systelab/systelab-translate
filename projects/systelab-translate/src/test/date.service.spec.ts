import { httpLoaderFactory, I18nService } from '../public-api';
import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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

	it('Format a date in USA', (done) => {
		service.use('en-US')
			.subscribe(() => {
				const date = new Date();
				date.setFullYear(2016, 0, 28);
				expect(service.formatDate(date))
					.toBe('1/28/16');
				expect(service.formatDateFullYear(date))
					.toBe('01/28/2016');
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
				const date = new Date();
				date.setFullYear(2016, 0, 28);
				date.setHours(21);
				date.setMinutes(0, 0, 0);
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
				const date = new Date();
				date.setFullYear(2016, 0, 28);
				date.setHours(21);
				date.setMinutes(0, 0, 0);
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
				const date = new Date();
				date.setFullYear(2016, 0, 28);
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
				const date = new Date();
				date.setFullYear(2016, 0, 28);
				date.setHours(21);
				date.setMinutes(0, 0, 0);
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
				const date = new Date();
				date.setFullYear(2016, 0, 28);
				date.setHours(21);
				date.setMinutes(0, 0, 0);
				expect(service.formatTime(date))
					.toBe('09:00 PM');
				expect(service.formatDateTime(date))
					.toBe('1/28/16 09:00 PM');
				expect(service.formatDateTime(date, false, true))
					.toBe('1/28/16 09:00:00 PM');
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
