import { Component } from '@angular/core';
import { I18nService } from './systelab-translate/i18n.service';

@Component({
	selector:    'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	public day = '';
	public rep = '';
	public repArray = '';
	constructor(i18nService: I18nService) {
		i18nService.use('en-US')
			.subscribe(
				() => {
					console.log('Language set to english');
					const replaceKeys = [];
					const replaceValues = [];
					this.day = i18nService.instant('COMMON_DAY');
					this.rep = i18nService.replaceVariableInString('COMMON_REPLACEMENT', '%replace%', 'Wednesday');
					replaceKeys.push('%s', '%i', '%f');
					replaceValues.push('Wednesday', '7', '14');
					this.repArray = i18nService.replaceVariableInString('COMMON_REPLACEMENT_ARRAY', replaceKeys, replaceValues);
				}
			)
	}

}
