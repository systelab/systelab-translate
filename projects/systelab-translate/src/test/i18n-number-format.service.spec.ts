import { httpLoaderFactory, I18nService } from '../public-api';
import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Translate Service: Number Format', () => {
	let service: I18nService;

	beforeEach(() => {

		TestBed.configureTestingModule({
    imports: [TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            }
        })],
    providers: [provideHttpClient(withInterceptorsFromDi())]
});
		service = TestBed.inject(I18nService);
	});

	afterEach(() => {
		service = undefined;
	});

	it('Check a simple number pattern (British)', (done) => {
		service.use('en-GB')
			.subscribe(() => {
				expect(service.formatNumber(12, '#.00'))
					.toBe('12.00');
				done();
			});
	});

	it('Check a simple number pattern (Spanish)', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				expect(service.formatNumber(12, '#.00'))
					.toBe('12.00');
				done();
			});
	});

	it('Check a simple number pattern for negative numbers', (done) => {
		service.use('en-GB')
			.subscribe(() => {
				expect(service.formatNumber(-12, '#.00'))
					.toBe('-12.00');
				done();
			});
	});

	it('Check a simple number pattern with rounding down', (done) => {
		service.use('en-GB')
			.subscribe(() => {
				expect(service.formatNumber(12.1234, '#.00'))
					.toBe('12.12');
				done();
			});
	});

	it('Check a simple number pattern with rounding up', (done) => {
		service.use('en-GB')
			.subscribe(() => {
				expect(service.formatNumber(12.1278, '#.00'))
					.toBe('12.13');
				done();
			});
	});

	it('Check a simple number pattern with rounding and no fraction', (done) => {
		service.use('en-GB')
			.subscribe(() => {
				expect(service.formatNumber(12.78, '#'))
					.toBe('13');
				done();
			});
	});

	it('Check a simple number pattern with locale', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				expect(service.formatNumber(12, '#.00', true))
					.toBe('12,00');
				done();
			});
	});
});
