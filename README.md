# systelab-translate

Library with I18N tools to speed up our Angular developments

## Installing the library

```bash
npm install systelab-translate --save
```

## How to use the library
In order to use this library you must import the module SystelabTranslateModule. Remember to import SystelabTranslateModule.forRoot() in your application module.

In you main component, you can inject a I18NService and setup the initial language calling the method use:
```javascript
 this.i18nService.use('en').subscribe(() => console.log('Language set to english.'));
```

In order to translate a key, you can call to the instant method:
```javascript
this.i18nService.instant('COMMON_CODE')
```

In order to async translate a key, returning an Observable, you can call to the get method:
```javascript
this.i18nService.get('COMMON_CODE')
```

You can translate a key in tour templates by using the translate pipe:
```html
<p> {{ 'COMMON_CODE' | translate | async }} </p>
```

## Provide the translartion files
In order to provide the translation files, you must include properties files in the /i18n/language and /i18n/error folders.

For the basic bundles, include a MessageBundle_xx_XX.json file for each language and country (not mandatory). 

For the error bundles, include a ErrorsBundle_xx_XX.json file for each language and country (not mandatory). 

Sample files names are: MessageBundle_es.json, MessageBundle_en.json, MessageBundle_en_US.json.

Inside each file include a single line for each key and translation. For example:
```html
"COMMON_ABOUT": "About",
"COMMON_CODE": "Code to display",
```
The are other convenient method to work with dates, like getDateFormat, getTimeFormat, formatDate, formatDateFullYear, formatTime, formatDateTime, getDateFrom, getDateTo, getDateMidDay, convertStringDateToDateFormat and formatNumber. See the source code to get more information.

## Working with the repo


```bash
git clone https://github.com/systelab/systelab-translate.git
cd systelab-translate
npm install
ng serve
```
