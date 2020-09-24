import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { LocalizableTranslateStaticLoader } from './LocalizableTranslateStaticLoader';
import { GeneralTranslatePipe } from './translate.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NumberFormatPipe } from './number-format.pipe';
import { DecimalPipe, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

// AoT requires an exported function for factories
export function httpLoaderFactory(http: HttpClient, location: Location, url: string) {
  return new LocalizableTranslateStaticLoader(http, location, url);
}

export interface ISystelabTranslateModule {
  customUrl: string;
}

let _translationFilesUrl = null;

@NgModule({
  imports:      [
    TranslateModule.forRoot({
      loader: {
        provide:    TranslateLoader,
        useFactory: (httpLoaderFactory),
        deps:       [HttpClient, Location, _translationFilesUrl]
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
  static forRoot(params: ISystelabTranslateModule): ModuleWithProviders<SystelabTranslateModule> {
    return {
      ngModule: SystelabTranslateModule,
      providers: [
        {
          provide: _translationFilesUrl,
          useValue: params.customUrl
        }
      ]
    };
  }
}

