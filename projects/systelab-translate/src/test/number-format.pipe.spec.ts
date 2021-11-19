import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { httpLoaderFactory } from '../public-api';
import { NumberFormatPipe } from '../public-api';
import { I18nService } from '../public-api';
import { DecimalPipe } from '@angular/common';

describe('Pipe: NumberFormatPipe', () => {
	let pipe: NumberFormatPipe;
	let i18nService: I18nService;
	let decimalPipe: DecimalPipe;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports:   [
				HttpClientModule,
				TranslateModule.forRoot({
					loader: {
						provide:    TranslateLoader,
						useFactory: httpLoaderFactory,
						deps:       [HttpClient]
					}
				})
			],
			providers: [
				DecimalPipe]
		});
		i18nService = TestBed.get(I18nService);
		decimalPipe = TestBed.get(DecimalPipe);
		pipe = TestBed.get(NumberFormatPipe);
	});

	afterEach(() => {
		i18nService = undefined;
		decimalPipe = undefined;
		pipe = undefined;
	});

	it('check number format - value undefined', () => {
		expect(pipe.transform(undefined))
			.toBe('');
	});

	it('check number format - value undefined and defaultSymbolWhenNull', () => {
		expect(pipe.transform(undefined, undefined, undefined, undefined, '-'))
			.toBe('-');
	});

	it('check number format - value', () => {
		expect(pipe.transform(3.33333333))
			.toBe('3.33');
	});

	it('check number format - rounding', () => {
		expect(pipe.transform(3.333335, '1.0-5'))
			.toBe('3.33334');
	});

	it('check number format - rounding and units', () => {
		expect(pipe.transform(3.333335, '1.0-5', '%'))
			.toBe('3.33334%');
	});

	it('check number format - rounding and priorSymbol', () => {
		expect(pipe.transform(3.3323335, '1.0-2', '', '<'))
			.toBe('< 3.33');
	});

	it('check number format - rounding, units and priorSymbol', () => {
		expect(pipe.transform(3.3323335, '1.0-2', '%', '<'))
			.toBe('< 3.33%');
	});

	it('check number format - invalid rounding', () => {
		expect(pipe.transform(3.3323335, '1dsfas3333423422', '%', '<'))
			.toBe('');
	});

	it('check number format with 0.0', () => {
		expect(pipe.transform(0.0, '1.0-2', '', ''))
			.toBe('0');
	});
});

