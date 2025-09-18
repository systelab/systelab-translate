import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { I18nService } from './i18n.service';

@Pipe({
    name: 'translate',
    standalone: false
})
@Injectable({
	providedIn: 'root'
})
export class GeneralTranslatePipe implements PipeTransform {
	constructor(protected i18nService: I18nService) {
	}

	public transform(query: string, ...args: string[]): any {
		return this.i18nService.get(query);
	}
}
