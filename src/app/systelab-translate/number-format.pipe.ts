import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from './i18n.service';
import { DecimalPipe } from '@angular/common';

@Pipe({
	name: 'numberformat'
})
export class NumberFormatPipe implements PipeTransform {
	constructor(protected i18nService: I18nService, protected decimalPipe: DecimalPipe) {
	}

	public transform(value: number, precision?: string, units?: string, priorSymbol?: string, defaultSymbolWhenNull?: string, ...args: string[]): string {

		if (value) {
			if (!precision) {
				precision = '1.0-2';
			}
			try {
				let roundedValue = this.decimalPipe.transform(value, precision, this.i18nService.getLocale());

				if (units) {
					roundedValue = roundedValue + units;
				}
				if (priorSymbol) {
					roundedValue = priorSymbol + ' ' + roundedValue;
				}
				return roundedValue;
			} catch (error) {
				console.error(error);
			}
			return '';
		} else {
			if (defaultSymbolWhenNull) {
				return defaultSymbolWhenNull;
			}
			return '';
		}
	}
}