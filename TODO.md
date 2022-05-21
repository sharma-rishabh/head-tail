**TODO**

- [ ] Add extraction of option in `headMain`
- [ ] remove `getFiles`
- [ ] Make headMain for multiple files.
- [ ] Implement `parseArgs`.
  - [x] should give default options if no cl options are passed.
  - [x] should work with `-n count`
  - [x] should work with `-c count `
  - [ ] should work with `-ncount`
  - [ ] should work with `-ccount`

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
- [x] Implement `extractValidOption`
- [x] Implement `validateOptions`
- [x] Implement `areAllSwitchesSame`
- [x] Implement `assertSwitchesValidity`
- [x] add `areSwitchesValid` and `areAllSwitchesSame` to `validateOptions`
- [x] add `validateOptions` in `extractOptions`
