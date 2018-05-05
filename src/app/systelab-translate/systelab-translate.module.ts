import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { LocalizableTranslateStaticLoader } from './LocalizableTranslateStaticLoader';
import { I18nService } from './i18n.service';
import { GeneralTranslatePipe } from './translate.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NumberFormatPipe } from './number-format.pipe';
import { DecimalPipe } from '@angular/common';

// AoT requires an exported function for factories
export function httpLoaderFactory(http: HttpClient) {
	return new LocalizableTranslateStaticLoader(http);
}

@NgModule({
	imports:      [],
	declarations: [
		GeneralTranslatePipe,
		NumberFormatPipe
	],
	exports:      [
		GeneralTranslatePipe,
		NumberFormatPipe],
	providers:    [
		DecimalPipe]
})
export class SystelabTranslateModule {
	public static forRoot(entryComponents?: Array<Type<any> | any[]>): ModuleWithProviders {
		let module = TranslateModule.forRoot({
			loader: {
				provide:    TranslateLoader,
				useFactory: (httpLoaderFactory),
				deps:       [HttpClient]
			}
		});
		module.ngModule = SystelabTranslateModule;
		module.providers.push({provide: I18nService, useClass: I18nService});
		module.providers.push({provide: NumberFormatPipe, useClass: NumberFormatPipe});
		return module;
	}
}

