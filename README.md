[![Codacy Badge](https://api.codacy.com/project/badge/Grade/904bf3dbdb5f4fed90ce79d9ac487ebc)](https://app.codacy.com/app/alfonsserra/systelab-translate?utm_source=github.com&utm_medium=referral&utm_content=systelab/systelab-translate&utm_campaign=badger)
[![Build Status](https://travis-ci.org/systelab/systelab-translate.svg?branch=master)](https://travis-ci.org/systelab/systelab-translate)
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
npm install
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

## Version 8

date-fns is updated to 2.14. Check breaking changes here: https://date-fns.org/v2.14.0/docs/Change-Log

In the library changes involved replacing DD, YY, YYY for dd, yy, yyyy. Also using date-fns locale object instead of an string.

## Version 11

There's few changes related to pipes:
- Some pipes (decimal, percent, currency, date, etc) now explicitly state which types are accepted.
- The slice pipe now returns null for the undefined input value, which is consistent with the behavior of most pipes.
- The async pipe no longer claims to return undefined for an input that was typed as undefined. Note that the code actually returned null on undefined inputs
- The uppercase and lowercase pipes no longer let falsy values through. They now map both null and undefined to null and raise an exception on invalid input (0, false, NaN). This matches other Angular pipes
