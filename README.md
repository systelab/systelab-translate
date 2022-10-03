[![Codacy Badge](https://app.codacy.com/project/badge/Grade/42d93e4a6a4a46f5850a785977c1f94e)](https://www.codacy.com/gh/systelab/systelab-translate/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=systelab/systelab-translate&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.com/systelab/systelab-translate.svg?branch=master)](https://travis-ci.com/systelab/systelab-translate)
[![codecov](https://codecov.io/gh/systelab/systelab-translate/branch/master/graph/badge.svg)](https://codecov.io/gh/systelab/systelab-translate)
[![npm version](https://badge.fury.io/js/systelab-translate.svg)](https://badge.fury.io/js/systelab-translate)
[![Known Vulnerabilities](https://snyk.io/test/github/systelab/systelab-translate/badge.svg?targetFile=package.json)](https://snyk.io/test/github/systelab/systelab-translate?targetFile=package.json)

# systelab-translate

Library with I18N tools to speed up our Angular developments


## Working with the repo

To download the repository and setup all the dependencies, run the following script:

```bash
git clone https://github.com/systelab/systelab-translate.git
cd systelab-translate
npm ci
```
## Test

### Unit

```bash
ng test
```

## Publish the library:

Given that you have a user with enough privileges, in order to publish the library in npmjs.com run the following script:

```bash
npm run build
cd dist/systelab-translate
npm publish
```

Library will be published at: https://www.npmjs.com/package/systelab-translate

## Documentation

Read the [provided documentation](https://github.com/systelab/systelab-translate/blob/master/projects/systelab-translate/README.md) to use the library

# Breaking changes

## Version 7
Few changes where introduce in version 7 in order to standardize the library and support Angular 9.
The following steps should be consider when migrating from version 6.

1. When importing the module do not use .forRoot(); In Webstorm, replace in path:
```
- SystelabTranslateModule.forRoot\(\)
- SystelabTranslateModule
```
2. When importing services and modules import them from systelab-translate root. In Webstorm, replace in path:
```
- from 'systelab-translate/lib.+
- from 'systelab-translate';
```

## Version 14.x.x - Angular 14

[Angular 13 news](https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296)

- **View Engine** is no longer available
- Libraries built with the latest version of the **APF** [Angular Package Format](https://angular.io/guide/angular-package-format) will no longer require the use of ngcc. As a result of these changes library developers can expect leaner package output and faster execution.
- The new API removes the need for ComponentFactoryResolver being injected into the constructor. Ivy creates the opportunity to instantiate the component with ViewContainerRef.createComponent without creating an associated factory
- **End of IE11 support**
- Angular now supports the use of persistent build cache by default for new v13 projects [More info](https://github.com/angular/angular-cli/issues/21545) and [CLI Cache](https://angular.io/cli/cache)
- **RxJS 7.4** is now the default for apps created with ng new
- Dynamically enable/disable validators: allows built-in validators to be disabled by setting the value to null
- Important improvements to TestBed that now does a better job of tearing down test modules and environments after each test
- *canceledNavigationResolution* router flag to restore the computed value of the browser history when set to *computed*
- [TypeScript 4.4](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html)

[Angular 14 news](https://blog.angular.io/angular-v14-is-now-available-391a6db736af)

- [Standalone Components](https://angular.io/guide/standalone-components)
- [Typed Angular Forms](https://angular.io/guide/typed-forms)
- Streamlined page title accessibility
- Extended developer diagnostics
- Catch the invalid “Banana in a box” error on your two-way data bindings: writing _([])_ instead of _[()]_
- Catch nullish coalescing on non-nullable values in Angular templates
- Bind to protected component members directly from the templates
- Optional injectors in Embedded Views
- Support for passing in an optional injector when creating an embedded view through *ViewContainerRef.createEmbeddedView* and *TemplateRef.createEmbeddedView*
- NgModel changes are reflected in the UI for OnPush components
- [TypeScript 4.6](https://devblogs.microsoft.com/typescript/announcing-typescript-4-6/)

## Version 11.x.x - Angular 12

IE11 support has been deprecated due to the upgrade to Angular 12

Use of [Ivy](https://angular.io/guide/ivy), applications that uses this library have to use Angular 12 and Ivy rendering.


Added --noImplicitOverride flag to allow override methods and get error for unintentionally overrides 
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#override-and-the---noimplicitoverride-flag

## Version 10.x.x - Angular 11

There's few changes related to pipes:
- Some pipes (decimal, percent, currency, date, etc) now explicitly state which types are accepted.
- The slice pipe now returns null for the undefined input value, which is consistent with the behavior of most pipes.
- The async pipe no longer claims to return undefined for an input that was typed as undefined. Note that the code actually returned null on undefined inputs
- The uppercase and lowercase pipes no longer let falsy values through. They now map both null and undefined to null and raise an exception on invalid input (0, false, NaN). This matches other Angular pipes

## Version 8

date-fns is updated to 2.14. Check breaking changes here: https://date-fns.org/v2.14.0/docs/Change-Log

In the library changes involved replacing DD, YY, YYY for dd, yy, yyyy. Also using date-fns locale object instead of a string.
