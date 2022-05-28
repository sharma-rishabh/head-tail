# Tail


**TODO**

- [ ] make `reverseContent` work.
- [ ] make `noFormatting` work.
- [ ] make `compileOptions`.
- [ ] create a closure for `parseLines` and `parseCount`.
- [ ] Restructure `readme.md`
- [ ] refactor tailMain.

**MAYBE**


**DONE**

- [x] update `readme` with tail contract
- [x] create a `testTailLib.js`
- [x] create a `tailLib.js`.
- [x] implement `tail`
- [x] Extract `stringUtils`
- [ ] ~~Extract `fileUtils`~~
- [x] Extract throw objects to functions.
- [x] Change contract of `headMultipleFiles` to accept a formatter.
- [x] Extract `testFileUtils` in a separate functions.
- [x] get rid of unnecessary code.
- [x] Consider changing contract of parse args to not convert to number.
- [x] change error of illegal option.
- [x] add error for option required.
- [x] Change directory structure to accommodate for `tail`
- [x] make `extractData`
- [x] Use `stringUtils` in tail.js
- [x] implement `tailMain` for single file.
- [x] make `testTailMain.js`
- [x] make `tail` work for a single file.
- [x] make `createIterator`
- [x] Implement basic `parseArgs` to work with files.
- [X] implement `getLegalOptions`.
- [x] implement `parseLineOption`.
- [x] implement `parseCountOption`.
- [x] Implement `getOptionsAndParsers`.
- [x] Implement `getParser`
- [x] Change Name of `parseCountOption` to `parseCharOption`
- [x] Make `parseArgs` for tail.
- [x] `parseArgs` should throw and error if given option is illegal.
- [x] Add parameter to `parseArgs` to accept allOptions.
- [x] Create separate file for `parseTail`.
- [x] move `parseArgs` to library.
- [x] Add logic for `+|- num` option in `parseArgs`
- [x] print correct usage for tail.
- [x] Connect `tail` with cl inputs.
- [x] implement `getFileContent`
- [x] implement `headFile`
- [x] Investigate how slice handles negative indices.
- [x] implement `formatContent`
- [x] make `tail` work for multiple files.
- [x] use print functions in tail.
- [x] change condition in `isOption`
- [x] add validators for all flags in parseTail.
- [x] extract throw out `parseHyphen` to validate function and pass it as part of allOption.
- [x] Remove `return` from all tests.
- [x] Restructure `todo.md`
- [x] change contract of `tailMain`.
- [x] pull the `startIndex` decision out of `extract data` to `tail`.
- [x] remove dependency of `content` from `startIndex`


# Head

**TODO**


**MAYBE**

**DONE**

- [x] Implement `splitBy` and `joinBy`.
- [x] Make `src` and `test` directories.
- [x] Make `testHeadLib.js`
- [x] Write expectation for `extractData`
- [x] Write `extractData`
- [x] Make `headLib.js`
- [x] `extractData` should give the whole array back if length is less than 10.
- [x] Make `extractData` work for any given array.
- [x] Add test for `splitBy` and `joinBy`.
- [x] Implement `head` to work for content not file.
- [x] Implement  `extractData` to accept count.
- [x] Implement `headMain`(It should take the file and pass the content to `head`).
- [x] make `head fileName` work.
- [x] Implement `head` to work with count.
- [x] Implement `splitBy` to take a separator.
- [x] Implement `joinBy` to take a connector.
- [x] Separate test for headMain.
- [x] Implement `head` to take a separator.
- [x] change contract of `head` to accept options.
- [x] change contract of headMain to accept cl options.
- [x] hookup parseArgs with headMain.
- [x] surround read file with try catch.
- [x] ~~Consider changing the name of `extractData` to `extractLines`~~
- [x] Refactor parseArgs.
- [x] Move decision of assigning separator from parseArgs to head.
- [x] change contract of headMain to accept fileName as array.
- [x] Implement `getFiles` in parseArgs.
- [ ] ~~Implement `getOptions` in parseArgs using while loop.~~
- [x] Implement `isOption`
- [x] Implement `parseArgs` to give the last option if multiple options are given
- [x] move get options inside parseArgs.
- [x] get rid of all unnecessary functions in `parseArgs`.
- [x] change contract of parseArgs to return all option objects.
- [x] Implement `validateOptions`
- [x] Implement `areAllSwitchesSame`
- [x] Implement `assertSwitchesValidity`
- [x] add `areSwitchesValid` and `areAllSwitchesSame` to `validateOptions`
- [x] add `validateOptions` in `extractOptions`
- [x] remove `getFiles`
- [x] Add extraction of option in `headMain`
- [x] show appropriate errors through head.js
- [x] validate line count
- [x] show usage if no arguments are provided.
- [x] fix error format for read file errors
- [x] pull readFile try catch out of main.
- [x] Implement `extractValidOption`
- [x] fix error message for illegalOption. 
- [x] Implement `parseArgs`.
  - [x] should give default options if no cl options are passed.
  - [x] should work with `-n count`
  - [x] should work with `-c count `
  - [x] should work with `-ncount`
  - [x] should work with `-ccount`
- [x] Assert files existence.
- [x] Remove `assertArgumentValidity`
- [x] Add more validation for line count.
- [x] make a `parseOption` function.
- [x] Add `parseOption` in `parseArgs`
- [x] implement `printContent`
- [x] implement `headSingleFile`
- [x] change contract of `head` to accept a separator.
- [x] change contract of `headMain`
- [x] implement `formatOutput`
- [x] implement `headMultipleFiles`
- [x] Make headMain for multiple files.
- [x] Make `-num` special option work.
- [x] Give appropriate error if byte count is invalid.
- [x] refactor test for `lib` and `main`.
- [x] refactor test for `parseArgs`.
- [x] changed contract of `headMain` to return the exit code.
- [x] change `optionsArray` to `options`
- [s] change `option` to flag.
- [x] refactor test for `extractValidOption`.
- [x] refactor test for `fileUtils`.
