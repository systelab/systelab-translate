import { I18nService } from '../app/systelab-translate/i18n.service';
import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory } from '../app/systelab-translate/systelab-translate.module';

describe('Date Service', () => {
	let service: I18nService;

	beforeEach(() => {

		TestBed.configureTestingModule({
			imports:   [
				HttpClientModule,
				TranslateModule.forRoot({
					loader: {
						provide:    TranslateLoader,
						useFactory: HttpLoaderFactory,
						deps:       [HttpClient]
					}
				})
			],
			providers: [
				I18nService
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
				let date = new Date();
				date.setFullYear(2016, 0, 28);
				expect(service.formatDate(date))
					.toBe('28/01/16');
				expect(service.formatDateFullYear(date))
					.toBe('28/01/2016');
				done();
			})
	});

	it('Format a date in USA', (done) => {
		service.use('en-US')
			.subscribe(() => {
				let date = new Date();
				date.setFullYear(2016, 0, 28);
				expect(service.formatDate(date))
					.toBe('1/28/16');
				expect(service.formatDateFullYear(date))
					.toBe('01/28/2016');
				done();
			})
	});

	it('Parse a date', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				expect(service.formatDate(service.parseDate('28/01/16')))
					.toBe('28/01/16');
				expect(service.formatDateFullYear(service.parseDate('28/01/2016')))
					.toBe('28/01/2016');
				done();
			})
	});

	it('Parse a date in USA', (done) => {
		service.use('en-US')
			.subscribe(() => {
				expect(service.formatDate(service.parseDate('1/28/16')))
					.toBe('1/28/16');
				expect(service.formatDateFullYear(service.parseDate('01/28/2016')))
					.toBe('01/28/2016');
				done();
			})
	});

	it('Format a time and a date and time', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				let date = new Date();
				date.setFullYear(2016, 0, 28);
				date.setHours(21);
				date.setMinutes(0,0,0);
				expect(service.formatTime(date))
					.toBe('21:00');
				expect(service.formatDateTime(date))
					.toBe('28/01/16 21:00');
				done();
			})
	});


	it('Format a time and a date and time in USA', (done) => {
		service.use('en-US')
			.subscribe(() => {
				let date = new Date();
				date.setFullYear(2016, 0, 28);
				date.setHours(21);
				date.setMinutes(0,0,0);
				expect(service.formatTime(date))
					.toBe('21:00');
				expect(service.formatDateTime(date))
					.toBe('1/28/16 21:00');
				done();
			})
	});

	it('Get dates at the begging of the day, at the end and at noon', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				let date = new Date();
				date.setFullYear(2016, 0, 28);
				date.setHours(21);
				expect(service.formatDateTime(service.getDateFrom(date)))
					.toBe('28/01/16 00:00');
				expect(service.formatDateTime(service.getDateTo(date)))
					.toBe('29/01/16 00:00');
				expect(service.formatDateTime(service.getDateMidDay(date)))
					.toBe('28/01/16 12:00');
				done();
			})
	});
});
