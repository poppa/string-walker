import 'jest'
import { StringWalker } from '../src/string-walker'

describe('StringWalker tests', () => {
  test('Expect position to be zero after instantiation', () => {
    const s = new StringWalker('test')
    expect(s.position).toEqual(0)
  })

  test('Expect length to be correct', () => {
    const str = 'this is the test'
    const s = new StringWalker(str)
    expect(s.length).toEqual(str.length)
  })

  test('Expect current() to do its stuff', () => {
    const str = 'this is a string'
    const s = new StringWalker(str)
    expect(s.current()).toEqual(str.charCodeAt(s.position))
    expect(s.currentChar()).toEqual(str.charAt(s.position))
  })
})
