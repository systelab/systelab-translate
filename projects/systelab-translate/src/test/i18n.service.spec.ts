import { httpLoaderFactory, I18nService } from '../public-api';
import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

describe('Translate Service', () => {
	let service: I18nService;

	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				TranslateModule.forRoot({
					loader: {
						provide: TranslateLoader,
						useFactory: httpLoaderFactory,
						deps: [HttpClient]
					}
				})
			]
		});
		service = TestBed.get(I18nService);
	});

	afterEach(() => {
		service = undefined;
	});

	it('Is defined', () => {
		expect(service).toBeDefined();
		expect(service instanceof I18nService).toBeTruthy();
	});

	it('Check the translation of a key in english', (done) => {
		service.use('en-US')
			.subscribe(() => {
				expect(service.instant('COMMON_DAY'))
					.toBe('Day');
				done();
			},
				() => {
				});
	});

	it('Check the translation of a key in spanish', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				expect(service.instant('COMMON_DAY'))
					.toBe('Día');
				done();
			});
	});

	it('Check the translation of a key asynchronously', (done) => {
		service.use('en-US')
			.subscribe(() => {
				service.get('COMMON_DAY')
					.subscribe((value) => {
						expect(value)
							.toBe('Day');
						done();
					});
			},
				(error) => {
				});
	});

	it('Check the translation of an undefined key returns the key', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				expect(service.instant('COMMON_QUARTER'))
					.toBe('COMMON_QUARTER');
				done();
			});
	});

	it('Check the translation of a key that is defined in the errors json file', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				expect(service.instant('COMMON_ERROR_CODE1'))
					.toBe('Código error 1');
				done();
			});
	});

	it('Check the translation of a key that is not specific for a country takes the default one', (done) => {
		service.use('en-US')
			.subscribe(() => {
				expect(service.instant('COMMON_DAY'))
					.toBe('Day');
				done();
			});
	});

	it('Check the translation of a key that is specific for a country', (done) => {
		service.use('en-US')
			.subscribe(() => {
				expect(service.instant('COMMON_CENTER'))
					.toBe('Center');
				done();
			});
	});

	it('Check that a translation could be added on the fly', (done) => {
		service.use('en-US')
			.subscribe(() => {
				service.appendTranslation('en-US', { COMMON_USER: 'User' });
				expect(service.instant('COMMON_USER'))
					.toBe('User');
				done();
			});
	});

	it('Check that a translation could be added on the fly and overrides the current one', (done) => {
		service.use('en-GB')
			.subscribe(() => {
				service.appendTranslation('en-GB', { COMMON_DAY: 'Beautiful Day' });
				expect(service.instant('COMMON_DAY'))
					.toBe('Beautiful Day');
				done();
			});
	});

	it('Check a key with one parameters', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				expect(service.instant('USER_GENDER', { USER_GENDER: 'Male' }))
					.toBe('User gender is Male');
				done();
			});
	});

	it('Check a key with multiple named parameters', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				expect(service.instant('USER_AGE_AND_GENDER', { USER_AGE: 24, USER_GENDER: 'Male' }))
					.toBe('User age is 24 and gender is Male');
				done();
			});
	});

	it('Check a key added on the fly with one parameter', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				service.setStaticBundles({ USER_AGE_AND_GENDER: 'User gender is {{USER_GENDER}}' });
				expect(service.instant('USER_AGE_AND_GENDER', {USER_GENDER: 'Male'} ))
					.toBe('User gender is Male');
				done();
			});
	});

	it('Check a key added on the fly with empty parameters', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				service.setStaticBundles({ USER_AGE_AND_GENDER: 'User gender is {{USER_GENDER}}' });
				expect(service.instant('USER_AGE_AND_GENDER', '' ))
					.toBe('User gender is ');
				done();
			});
	});

	it('Check a key with multiple named not sorted parameters', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				expect(service.instant('USER_AGE_AND_GENDER', { USER_GENDER: 'Male', USER_AGE: 24 }))
					.toBe('User age is 24 and gender is Male');
				done();
			});
	});

	it('Check new static bundles', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				service.setStaticBundles({ KEY: 'value' });
				expect(service.instant('KEY',))
					.toBe('value');
				done();
			});
	});

	it('Check new static bundles asynchronously', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				service.setStaticBundles({ KEY: 'value' });
				service.get('KEY')
					.subscribe((value) => {
						expect(value)
							.toBe('value');
						done();
					});
			});
	});

	it('Check static bundles override', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				service.setStaticBundles({ COMMON_DAY: 'value' });
				expect(service.instant('COMMON_DAY',))
					.toBe('value');
				done();
			});
	});

	it('Should be able to get an array translations', (done) => {
		const translations = { key1: 'Value1', key2: 'Value2' };

		service.use('es-ES')
			.subscribe(() => {
				service.setTranslation('es-ES', translations);
				expect(service.instant(['key1', 'key2']))
					.toEqual(translations);
				done();
			});
	});

	it('Should return an empty value', (done) => {
		service.use('en-US')
			.subscribe(() => {
				service.setTranslation('en-US', { empty: '' });
				expect(service.instant('empty'))
					.toBe('');
				done();
			});
	});

	it('Check get the current language', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				expect(service.getCurrentLanguage())
					.toBe('es-ES');
				done();
			});
	});

	it('Should be able to get the browserLang', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				const browserLang = service.getBrowserLang();
				expect(typeof browserLang === 'string')
					.toBeTruthy();
				done();
			});
	});

	it('should throw an error if the key is not provided', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				service.setStaticBundles({ COMMON_DAY: 'value' });
				expect(() => service.instant('',))
					.toThrow(new Error('Parameter "key" required'));
				expect(() => service.instant(undefined as any,))
					.toThrow(new Error('Parameter "key" required'));
				expect(() => service.instant(null as any,))
					.toThrow(new Error('Parameter "key" required'));
				done();
			});
	});

	it('should format a number based on the decimal format', (done) => {
		service.use('en-US')
			.subscribe(() => {
				const myNumber = 3.1;
				expect(service.formatNumber(myNumber, '#.00'))
					.toBe('3.10');
				done();
			});
	});

	it('should format a number based on the decimal format and locale parameters', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				const myNumber = 3.1;
				expect(service.formatNumber(myNumber, '#.00',true))
					.toBe('3,10');
				done();
			});
	});

	it('Should allow to change the default language', (done) => {
		service.use('en-US')
			.subscribe(() => {
				expect(service.instant('COMMON_DAY'))
					.toBe('Day');
				done();
			});
	});

	it('Should merge translations using appendTranslation method', (done) => {
		service.use('en-GB')
			.subscribe(() => {
				service.appendTranslation('en-GB', {test: {sub1: 'value1'}});
				service.appendTranslation('en-GB', {test: {sub2: 'value2'}});
				expect(service.instant('test'))
					.toEqual({sub1: 'value1', sub2: 'value2'});
				done();
			});
	});

	it('Should override translations using setTranslation method', (done) => {
		service.use('en-GB')
			.subscribe(() => {
				service.setTranslation('en-GB', {test: {sub1: 'value1'}});
				service.setTranslation('en-GB', {test: {sub2: 'value2'}});
				expect(service.instant('test'))
					.toEqual({sub2: 'value2'});
				done();
			});
	});

	it('Should be able to get translations with nested keys', (done) => {
		service.use('es-ES')
			.subscribe(() => {
				service.setTranslation('es-ES',  {test: {test1: 'This is a test'}, test2: {test2: 'This is another test'}});
				expect(service.instant('test.test1'))
					.toEqual('This is a test');
				done();
			});
	});

	it('Check using reloadLanguage the translation of a key in english', (done) => {
		service.use('en-US')
			.pipe(
				switchMap(()=>service.reloadLanguage('en-US'))
			)
			.subscribe(() => {
					expect(service.instant('COMMON_DAY'))
						.toBe('Day');
					done();
				},
				() => {
				});
	});

	it('Check using reloadLanguage the translation of a key in spanish', (done) => {
		service.use('es-ES')
			.pipe(
				switchMap(()=>service.reloadLanguage('es-ES'))
			)
			.subscribe(() => {
				expect(service.instant('COMMON_DAY'))
					.toBe('Día');
				done();
			});
	});
});
