import { Component } from '@angular/core';
import { I18nService } from './systelab-translate/i18n.service';

@Component({
	selector:    'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	public day = '';

	constructor(i18nService: I18nService) {
		i18nService.use('en')
			.subscribe(
				() => {
					console.log('Language set to english');
					this.day = i18nService.instant('COMMON_DAY');
				}
			)
	}

}
