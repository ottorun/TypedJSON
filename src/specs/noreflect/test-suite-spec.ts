import * as p from "./polymorphism";
import * as pac from "./polymorphism-abstract-class";
import * as pcn from "./polymorphism-custom-names";
import * as pi from "./polymorphism-interface";
import * as pna from "./polymorphism-nested-arrays";
import * as sc from "./single-class";
import expect from './../expect-no-conflict';

describe('Test without Reflect pollyfil', () => {
    var isLogActivated = false;
    it('should handle polymorphism', () => {
        expect(p.test(isLogActivated)).toBe(true);
    });
    it('should handle polymorphism with abstract class', () => {
        expect(pac.test(isLogActivated)).toBe(true);
    });
    it('should handle polymorphism with custom names', () => {
        expect(pcn.test(isLogActivated)).toBe(true);
    });
    it('should handle polymorphism interface', () => {
        expect(pi.test(isLogActivated)).toBe(true);
    });
    it('should handle polymorphism with nested arrays', () => {
        expect(pna.test(isLogActivated)).toBe(true);
    });
    it('should handle single class', () => {
        expect(sc.test(isLogActivated)).toBe(true);
    });
});
