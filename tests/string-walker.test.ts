import 'jest'
import { StringWalker } from '../src/string-walker'

function sw(s: string) {
  return new StringWalker(s)
}

describe('StringWalker tests', () => {
  test('Expect position to be zero after instantiation', () => {
    const s = sw('test')
    expect(s.position).toEqual(0)
  })

  test('Expect length to equal the length of the string given to the constructor', () => {
    const str = 'this is the test'
    const s = sw(str)
    expect(s.length).toEqual(str.length)
  })

  test('Expect current() to do its stuff', () => {
    const str = 'this is a string'
    const s = sw(str)
    expect(s.current()).toEqual(str.charCodeAt(s.position))
    expect(s.currentChar()).toEqual(str.charAt(s.position))
  })
})
