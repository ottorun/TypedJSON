
// Jasmine and expectjs (used in mashboard) both define global expect function. Following code is used
// to prevent conflict in unit tests.
// Be sure to include this module before each of the test files.
let jasmineExpect: (actual: Function | any) => jasmine.Matchers = (<any>jasmine.getEnv()).expect;

export default jasmineExpect;
