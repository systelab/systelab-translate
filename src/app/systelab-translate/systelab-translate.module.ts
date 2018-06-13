import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { LocalizableTranslateStaticLoader } from './LocalizableTranslateStaticLoader';
import { I18nService } from './i18n.service';
import { GeneralTranslatePipe } from './translate.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NumberFormatPipe } from './number-format.pipe';
import { DecimalPipe } from '@angular/common';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient, location: Location) {
	return new LocalizableTranslateStaticLoader(http, location);
}

@NgModule({
	imports:      [
		TranslateModule.forRoot({
			loader: {
				provide:    TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps:       [HttpClient, Location]
			}
		})
	],
	declarations: [
		GeneralTranslatePipe,
		NumberFormatPipe
	],
	exports:      [
		GeneralTranslatePipe,
		NumberFormatPipe],
	providers:    [
		DecimalPipe,
		Location,
		{provide: LocationStrategy, useClass: PathLocationStrategy}
	]
})
export class SystelabTranslateModule {
	public static forRoot(entryComponents?: Array<Type<any> | any[]>): ModuleWithProviders {
		return {
			ngModule:  SystelabTranslateModule,
			providers: [
				{provide: I18nService, useClass: I18nService},
				{provide: NumberFormatPipe, useClass: NumberFormatPipe}
			]
		};
	}

}

