import {Observable, of as observableOf} from 'rxjs';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {DecimalFormat} from './decimal-format/DecimalFormat';
import {DateUtil} from './date-util/date-util';
import {registerLocaleData} from '@angular/common';
import localeCa from '@angular/common/locales/ca';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeGl from '@angular/common/locales/gl';
import localeIt from '@angular/common/locales/it';
import localeJa from '@angular/common/locales/ja';
import localeKo from '@angular/common/locales/ko';
import localeLt from '@angular/common/locales/lt';
import localeNl from '@angular/common/locales/nl';
import localePt from '@angular/common/locales/pt';
import localeRu from '@angular/common/locales/ru';
import localeSk from '@angular/common/locales/sk';
import localeTh from '@angular/common/locales/th';
import localeZh from '@angular/common/locales/zh';

@Injectable({providedIn: 'root'})
export class I18nService {

    protected locale: string;
    protected staticBundles: any = {};
    protected dateUtil: DateUtil;

    constructor(protected translateService: TranslateService) {
        //By default, Angular5 only contains locale data for en-US.
        registerLocaleData(localeCa);
        registerLocaleData(localeDe);
        registerLocaleData(localeEn);
        registerLocaleData(localeEs);
        registerLocaleData(localeFr);
        registerLocaleData(localeGl);
        registerLocaleData(localeIt);
        registerLocaleData(localeJa);
        registerLocaleData(localeKo);
        registerLocaleData(localeLt);
        registerLocaleData(localeNl);
        registerLocaleData(localePt);
        registerLocaleData(localeRu);
        registerLocaleData(localeSk);
        registerLocaleData(localeTh);
        registerLocaleData(localeZh);
        this.translateService.setDefaultLang('en-US');
        this.dateUtil = new DateUtil('en-US');
    }

    public use(locale: string): Observable<any> {
        this.locale = locale;
        this.dateUtil.setLocale(locale);
        return this.translateService.use(locale);
    }

    public getLocale(): string {
        return this.locale;
    }

    public getCurrentLanguage() {
        return this.translateService.currentLang;
    }

    public getBrowserLang(): string | undefined {
        return this.translateService.getBrowserLang();
    }

    public setTranslation(locale: string, translations: Object) {
        this.translateService.setTranslation(locale, translations, false);
    }

    public appendTranslation(locale: string, translations: Object) {
        this.translateService.setTranslation(locale, translations, true);
    }

    public get(bundle: string | string[]): Observable<any> {
        if (typeof bundle === 'string' && this.staticBundles[bundle]) {
            return observableOf(this.staticBundles[bundle]);
        }
        return this.translateService.get(bundle);
    }

    public instant(key: string | Array<string>, interpolateParams?: any): string | any {
        if (typeof key === 'string' && this.staticBundles[key]) {
            let bundleValue = '';
            if (typeof interpolateParams === 'object') {
                Object.keys(interpolateParams)
                    .forEach((paramKey: string) => {
                        bundleValue = this.staticBundles[key].replace('{{' + paramKey + '}}', interpolateParams[paramKey]);
                    });
                return bundleValue;
            } else if (this.staticBundles[key].indexOf('{') > -1 && !interpolateParams) {
                const regEx = /{{([^]*)}}/g;
                return this.staticBundles[key].replace(regEx, '');
            }
            return this.staticBundles[key];
        }
        return this.translateService.instant(key, interpolateParams);
    }

    public setStaticBundles(staticBundles: any): void {
        if (staticBundles) {
            this.staticBundles = staticBundles;
        }
    }

    public getDateFormat(isFullYear = false): string {
        return this.dateUtil.getDateFormat(isFullYear);
    }

    public getDateFormatForDatePicker(isFullYear = false): string {
        return this.dateUtil.getDateFormatForDatePicker(isFullYear);
    }

    public getTimeFormat(withSeconds = false): string {
        return this.dateUtil.getTimeFormat(withSeconds);
    }

    public formatDate(date: Date): string {
        return this.dateUtil.formatDate(date);
    }

    public formatDateFullYear(date: Date): string {
        return this.dateUtil.formatDateFullYear(date);
    }

    public formatTime(date: Date, withSeconds?: boolean): string {
        return this.dateUtil.formatTime(date, withSeconds);
    }

    public formatDateTime(date: Date, fullYear?: boolean, withSeconds?: boolean): string {
        return this.dateUtil.formatDateTime(date, fullYear, withSeconds);
    }

    public formatMonthAndYear(date: Date): string {
        return this.dateUtil.formatMonthAndYear(date);
    }

    public getDateFrom(date: Date) {
        return this.dateUtil.getDateFrom(date);
    }

    public getDateTo(date: Date) {
        return this.dateUtil.getDateTo(date);
    }

    public getDateMidDay(date: Date) {
        return this.dateUtil.getDateMidDay(date);
    }

    public getFirstDayOfWeek() {
        return this.dateUtil.getFirstDayOfWeek();
    }

    public parseDate(currentDateValue: string, locale?: string): Date {
        return this.dateUtil.parseDate(currentDateValue, locale);
    }

    public formatNumber(numberToFormat: number, decimalFormat: string, applyLocale?: boolean): string {
        const df: any = new DecimalFormat(decimalFormat);
        const sNumber: string = df.format(numberToFormat, decimalFormat);
        if (applyLocale) {
            let minimumFractionDigits = 0;
            if (sNumber.split('.')[1]) {
                minimumFractionDigits = sNumber.split('.')[1].length;
            }
            return Number(sNumber)
                .toLocaleString(this.locale, {'minimumFractionDigits': minimumFractionDigits});
        }
        return sNumber;
    }
}
