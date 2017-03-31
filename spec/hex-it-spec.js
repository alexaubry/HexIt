var HexIt = require('../lib/hex-it.js');

describe('HexIt', () => {

  // Hex => Decimal

  it('can convert lowercase hex to dec', () => {
    let lowercaseHex = "0xabc";
    let converted = HexIt.makeDecimal(lowercaseHex);
    expect(converted).toBe('2748');
  });

  it('can convert uppercase hex to dec', () => {
    let uppercaseHex = "0XABC";
    let converted = HexIt.makeDecimal(uppercaseHex);
    expect(converted).toBe('2748');
  });

  it('can convert hex without prefix to dec', () => {
    let unprefixedHex = "39F";
    let converted = HexIt.makeDecimal(unprefixedHex);
    expect(converted).toBe('927');
  });

  // Decimal => Hex

  it("can convert dec to hex", () => {
      let hex = "927";
      let converted = HexIt.makeHexadecimal(hex, "0X", true);
      expect(converted).toBe("0X039f");
  });

  it("does not convert nondecimal text", () => {
      let nonHex = "abc";
      let nonConverted = HexIt.makeHexadecimal(nonHex, "0x", false);
      expect(nonConverted).toBe("abc");
  });

  it("converts with leading zeros", () => {
    let prefixable = "5";
    let converted = HexIt.makeHexadecimal(prefixable, "0x", true);
    expect(converted).toBe("0x05");
  });

  it("converts without leading zeros", () => {
    let prefixable = "5";
    let converted = HexIt.makeHexadecimal(prefixable, "0x", false);
    expect(converted).toBe("0x5");
  });

  it("does not add leading zeros", () => {
    let convertible = "110";
    let converted = HexIt.makeHexadecimal(convertible, "0x", true);
    expect(converted).toBe("0x6e");
  });

});
