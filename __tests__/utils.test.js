const {
  convertTimestampToDate,
  createLookupObj
} = require("../db/seeds/utils");

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
  test("returns an empty array when passed an empty array", () => {
    const testArray = []
    const output = createLookupObj(testArray, 'title', 'article_id');
    expect(output).toEqual({});
  });
  test("returns an object containing a single property, with the key-value matching the respective strings, when passing two strings alongside an array of single object", () => {
    const testArray = [{
    article_id : 18,
    title: "The People Tracking Every Touch, Pass And Tackle in the World Cup", }]
    const output = createLookupObj(testArray, 'title', 'article_id');
    expect(output).toEqual({"The People Tracking Every Touch, Pass And Tackle in the World Cup" : 18});
  });
  test("returns an object containing multiple properties, with the key-value matching the respective strings, when passing two strings alongside an array of multiple objects", () => {
    const testArray =  [
        { article_id: 1, title: 'Living in the shadow of a great man' },
        { article_id: 2, title: 'Sony Vaio; or, The Laptop' },
        { article_id: 3, title: 'Eight pug gifs that remind me of mitch' }]
    const output = createLookupObj(testArray, 'title', 'article_id');
    expect(output).toEqual({'Living in the shadow of a great man' : 1,
                            'Sony Vaio; or, The Laptop'  : 2, 
                            'Eight pug gifs that remind me of mitch':3});
  });
   test("returns an empty object, when passing two empty strings alongside an array of mnultiple objects", () => {
    const testArray =  [
        { article_id: 1, title: 'Living in the shadow of a great man' },
        { article_id: 2, title: 'Sony Vaio; or, The Laptop' },
        { article_id: 3, title: 'Eight pug gifs that remind me of mitch' }]
    const output = createLookupObj(testArray, '', '');
    expect(output).toEqual({});
  });
  test("returns an empty object, when passing two strings with white spaces alongside an array of mnultiple objects", () => {
    const testArray =  [
        { article_id: 1, title: 'Living in the shadow of a great man' },
        { article_id: 2, title: 'Sony Vaio; or, The Laptop' },
        { article_id: 3, title: 'Eight pug gifs that remind me of mitch' }]
    const output = createLookupObj(testArray, '  ', '  ');
    expect(output).toEqual({});
  });
  test("returns an object containing multiple properties, with the key-value matching the respective strings, when passing two strings alongside an array of multiple objects without mutation of the original array", () => {
    const testArray =  [
        { article_id: 1, title: 'Living in the shadow of a great man' },
        { article_id: 2, title: 'Sony Vaio; or, The Laptop' },
        { article_id: 3, title: 'Eight pug gifs that remind me of mitch' }]
    const copyTestArray = [...testArray];    
    createLookupObj(testArray, 'title', 'article_id');
    expect(copyTestArray).toEqual(testArray);
  });
});

