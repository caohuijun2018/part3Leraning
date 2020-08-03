const { average } = require('../utils/for_testing')

const palindrome = require('../utils/for_testing').palindrome

test('palindrome of a', () => {
  const result = palindrome('a')

  expect(result).toBe('a')
})

test('palindrome of react', () => {
  const result = palindrome('react')

  expect(result).toBe('tcaer')
})

test('palindrome of releveler', () => {
  const result = palindrome('releveler')

  expect(result).toBe('releveler')
})
// test('average',() => {
//     const result = average([2,2,2])
//     expect(result).toBe(2)
// })
// test('average1',() => {
//     const result = average([55,66,77,88])
//     expect(result).toBe(71.5)
// })