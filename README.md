[![Codacy Badge](https://api.codacy.com/project/badge/Grade/904bf3dbdb5f4fed90ce79d9ac487ebc)](https://app.codacy.com/app/alfonsserra/systelab-translate?utm_source=github.com&utm_medium=referral&utm_content=systelab/systelab-translate&utm_campaign=badger)
[![Build Status](https://travis-ci.org/systelab/systelab-translate.svg?branch=master)](https://travis-ci.org/systelab/systelab-translate)
[![codecov](https://codecov.io/gh/systelab/systelab-translate/branch/master/graph/badge.svg)](https://codecov.io/gh/systelab/systelab-translate)
[![npm version](https://badge.fury.io/js/systelab-translate.svg)](https://badge.fury.io/js/systelab-translate)
[![Known Vulnerabilities](https://snyk.io/test/github/systelab/systelab-translate/badge.svg?targetFile=package.json)](https://snyk.io/test/github/systelab/systelab-translate?targetFile=package.json)

# systelab-translate

Library with I18N tools to speed up our Angular developments

## Installing the library

```bash
npm install systelab-translate --save
```

## How to use the library
In order to use this library you must import the module SystelabTranslateModule. Remember to import SystelabTranslateModule.forRoot() in your application module.

Once done this, you can inject a I18NService and setup the initial locale calling the method 'use':

```javascript
 this.i18nService.use('en-US').subscribe(() => console.log('Locale set to American English.'));
```

If you want to get the current language, call the method:

```javascript
this.i18nService.getCurrentLanguage()
```

If you want to get the browser language, call the method:

```javascript
this.i18nService.getBrowserLang()
```

### Translate

There are two convenient methods to set or append new keys to an specific locale:

```javascript
public setTranslation(locale: string, translations: Object)
public appendTranslation(locale: string, translations: Object)
```

In order to translate a key, you can call to the instant method:

```javascript
this.i18nService.instant('COMMON_CODE')
```

This method has an optional parameter interpolateParams that will allow you to provide some parameters. For example:

Provided the key "USER_AGE_AND_GENDER": "User age is {{USER_AGE}} and gender is {{USER_GENDER}}" you can set the parameters with the following call


```javascript
this.i18nService.instant('USER_AGE_AND_GENDER', {USER_AGE: 24, USER_GENDER: 'Male'})
```


In order to async translate a key, returning an Observable, you can call to the get method:

```javascript
this.i18nService.get('COMMON_CODE')
```

You can translate a key in your templates by using the 'translate' pipe:

```html
<p> {{ 'COMMON_CODE' | translate | async }} </p>
```

#### Provide the translation files

In order to provide the translation files, you must include several properties files in the /i18n/language and /i18n/error folders.

For the basic bundles, include a MessagesBundle_xx_XX.json file for each language and country (not mandatory).

For the error bundles, include a ErrorsBundle_xx_XX.json file for each language and country (not mandatory).

This two files are mandatory if you are going to use the language.

Sample files names are: MessageBundle_es.json, MessageBundle_en.json, MessageBundle_en_US.json or MessageBundle_pt_BR.json

Inside each file include a single line for each key and translation. For example:

```html
"COMMON_ABOUT": "About",
"COMMON_CODE": "Code to display",
```

### Working with dates

The are some convenient methods to work with dates:

```javascript
public getDateFormat(isFullYear = false): string
```
Returns the Date Format depending on the locale. If full year, the year will have 4 digits.

```javascript
public getTimeFormat(withSeconds = false): string
```
Returns the Time Format depending on the locale. If specified, seconds will be added.

```javascript
public formatDate(date: Date): string
```
Formats a Date depending on the locale.

```javascript
public formatDateFullYear(date: Date): string
```
Formats a Date with the year in 4 digits depending on the locale.

```javascript
public formatTime(date: Date, withSeconds?: boolean): string
```
Formats a Time depending on the locale.

```javascript
public formatDateTime(date: Date, fullYear?: boolean, withSeconds?: boolean): string
```
Formats a Date Time depending on the locale.

```javascript
public formatMonthAndYear(date: Date): string
```
Returns the month in text and the year.

```javascript
public getDateFrom(date: Date)
```
Returns the date at the beginning of the day.

```javascript
public getDateTo(date: Date)
```
Returns the date at the end of the day.

```javascript
public getDateMidDay(date: Date)
```
Returns the date at noon.

```javascript
public getFirstDayOfWeek()
```
Returns a 0 if the first day of the week for the locale is Sunday. Returs 1 if is Monday.

```javascript
public parseDate(currentDateValue: string, locale?: string): Date
```
Returns a Date from currentDateValue applying the Date Format of the locale.

See the source code to get more information.

### Working with numbers

Use the method formatNumber to format a Number using the Java DecimalFormat.

```javascript
public formatNumber(numberToFormat: number, decimalFormat: string, applyLocale?: boolean): string
```

### Working with numbers (using numberformat Pipe)

Use the pipe numberformat to get a value with a defined precision taking into accound the locale, units, priorSymbol and default symbol when undefined.

```html
<label>{{value | numberformat : '1.0-5':'%'}</label>
```
Returns the value rounded to 5 decimals and with units. For example: an output may be 5.23455%

```html
<label>{{value | numberformat : '1.0-2':'%':'<'':'-'}}</label>
```
Returns the value rounded to 2 decimals, % as units and < as the previous symbol. For example: an output may be < 3.44% or just - in case the value is undefined.

```javascript
public transform(value: number, precision?: string, units?: string, priorSymbol?: string, defaultSymbolWhenNull?): string
```
This pipe can be used from any component through the method transform.


## Working with the repo


```bash
git clone https://github.com/systelab/systelab-translate.git
cd systelab-translate
npm install
ng serve
```
