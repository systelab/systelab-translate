import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { LocalizableTranslateStaticLoader } from './LocalizableTranslateStaticLoader';
import { I18nService } from './i18n.service';
import { GeneralTranslatePipe } from './translate.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NumberFormatPipe } from './number-format.pipe';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
	return new LocalizableTranslateStaticLoader(http);
}

@NgModule({
	imports:      [
		TranslateModule.forRoot({
			loader: {
				provide:    TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps:       [HttpClient]
			}
		})
	],
	declarations: [
		GeneralTranslatePipe,
		NumberFormatPipe
	],
	exports:      [
		GeneralTranslatePipe,
		NumberFormatPipe]

})
export class SystelabTranslateModule {
	public static forRoot(entryComponents?: Array<Type<any> | any[]>): ModuleWithProviders {
		return {
			ngModule:  SystelabTranslateModule,
			providers: [
				{provide: I18nService, useClass: I18nService}
			]
		};
	}

}

