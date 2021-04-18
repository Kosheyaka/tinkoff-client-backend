import * as md5 from 'md5';

describe('md5', () => {
  const cases: [string, string][] = [
    ['hello', '5d41402abc4b2a76b9719d911017c592'],
    ['test_string', '3474851a3410906697ec77337df7aae4'],
    ['Кириллица', '1e5b03112eb72c8f27f2a3dd0cb2df01'],
    ['998877', '05dc4be3550a5f2ec6bdb5e3a2fc5059'],
    ['Words with spaces', '5fbe81a873e105bd40e13401eb01e2cc'],
  ];

  test.each(cases)('%s', (input, expected) => {
    expect(md5(input)).toBe(expected);
  });
});
