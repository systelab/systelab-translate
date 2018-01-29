import { I18nService } from '../app/systelab-translate/i18n.service';
import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory } from '../app/systelab-translate/systelab-translate.module';

describe('Translate Service', () => {
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

	it('Check the translation of a key in english', (done) => {
		service.use('en-US')
			.subscribe(() => {
					expect(service.instant('COMMON_DAY'))
						.toBe('Day');
					done();
				},
				(error) => {
				})
	});

	it('Check the translation of a key in spanish', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				expect(service.instant('COMMON_DAY'))
					.toBe('Día');
				done();
			})
	});

	it('Check the translation of an undefined key returns the key', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				expect(service.instant('COMMON_QUARTER'))
					.toBe('COMMON_QUARTER');
				done();
			})
	});

	it('Check the translation of a key that is defined in the errors json file', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				expect(service.instant('COMMON_ERROR_CODE1'))
					.toBe('Código error 1');
				done();
			})
	});

	it('Check the translation of a key that is not specific for a country takes the default one', (done) => {
		service.use('en-US')
			.subscribe(() => {
				expect(service.instant('COMMON_DAY'))
					.toBe('Day');
				done();
			})
	});

	it('Check the translation of a key that is specific for a country', (done) => {
		service.use('en-US')
			.subscribe(() => {
				expect(service.instant('COMMON_CENTER'))
					.toBe('Center');
				done();
			})
	});

	it('Check that a translation could be added on the fly', (done) => {
		service.use('en-US')
			.subscribe(() => {
				service.appendTranslation('en-US', {'COMMON_USER': 'User'})
				expect(service.instant('COMMON_USER'))
					.toBe('User');
				done();
			})
	});

	it('Check that a translation could be added on the fly and overrides the current one', (done) => {
		service.use('en-GB')
			.subscribe(() => {
				service.appendTranslation('en-GB', {'COMMON_DAY': 'Beautiful Day'})
				expect(service.instant('COMMON_DAY'))
					.toBe('Beautiful Day');
				done();
			})
	});


	it('Check a simple pattern', (done) => {
		service.use('en-GB')
			.subscribe(() => {
				expect(service.formatNumber(12,'#.00'))
					.toBe('12.00');
				done();
			})
	});
});
