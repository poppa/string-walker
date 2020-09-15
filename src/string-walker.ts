type Maybe<T> = T | undefined

/**
 * Class with methods to navigate within a string
 */
export class StringWalker {
  /** The string to operate on */
  protected readonly data: string
  /** The length of the string */
  protected len: number
  /** Current position within the string */
  protected cursor: number

  /**
   * Constructor
   *
   * @param data The string to operate on
   * @param normalizeWhiteSpace If `true` newline characters will be normalized
   * to only consist of `\n`. Default is `false`.
   */
  constructor(data: string | Buffer, normalizeWhiteSpace = false) {
    if (data instanceof Buffer) {
      data = data.toString('utf8')
    }

    if (normalizeWhiteSpace) {
      data = data.replace('\r\n', '\n').replace('\r', '\n')
    }

    this.data = data
    this.len = this.data.length
    this.cursor = 0
  }

  /** Property getter for the current position within the string */
  public get position(): number {
    return this.cursor
  }

  /** Property getter for the length of the string */
  public get length(): number {
    return this.len
  }

  /** Check if the the cursor is at the end of the string */
  public isEof(): boolean {
    return this.cursor >= this.len
  }

  /**
   * Moves the cursor to the next position and returns the character code
   * of the new position
   *
   * @see StringWalker.nextChar()
   *
   * @returns The character code of the new position. If the next position is
   * the end of the string `NaN` is returned
   */
  public next(): number {
    if (this.cursor + 1 > this.len) {
      return NaN
    }

    this.cursor += 1
    return this.data.charCodeAt(this.cursor)
  }

  /**
   * @see StringWalker.next()
   *
   * @returns The character at the new position. If the next position is the
   * end of the string `undefined` is returned
   */
  public nextChar(): Maybe<string> {
    if (this.cursor + 1 > this.len) {
      return undefined
    }

    this.cursor += 1
    return this.data.charAt(this.cursor)
  }

  /**
   * Returns the character code of the current position
   */
  public current(): number {
    return this.data.charCodeAt(this.cursor)
  }

  /**
   * Returns the character of the current position
   */
  public currentChar(): string {
    return this.data.charAt(this.cursor)
  }

  /**
   * Look `n` (default `1`) number of characters ahead of the current position
   *
   * @example
   * const s = new StringWalker('lorem ipsum')
   * s.peek()   // > 111 (o)
   * s.peek(2)  // > 114 (r)
   * s.peek(3)  // > 101 (e)
   * s.peek(99) // > NaN
   *
   * @param n Number of characters to peek
   * @returns The character code of the peeked positon, or `NaN` if peeking
   * beyond the end of the string
   */
  public peek(n = 1): number {
    if (this.cursor + n >= this.len) {
      return NaN
    }

    return this.data.charCodeAt(this.cursor + n)
  }

  /**
   * @see StringWalker.peek()
   * @returns The character of the peeked positon, or `undefined` if peeking
   * beyond the end of the string
   */
  public peekChar(n = 1): Maybe<string> {
    if (this.cursor + n >= this.len) {
      return undefined
    }

    return this.data.charAt(this.cursor + n)
  }

  /**
   * Look `n` (default `1`) number of characters behind the current position.
   * @param n Number of characters to look behind
   * @returns The character code of the look behind character, or `NaN` if
   * looking before the start of the string
   */
  public behind(n = 1): number {
    n = n || 1

    if (this.cursor - n < 0) {
      return NaN
    }

    return this.data.charCodeAt(this.cursor - n)
  }

  /**
   * @see StringWalker.behind()
   * @returns The character code of the look behind character, or `NaN` if
   * looking before the start of the string
   */
  public behindChar(n = 1): Maybe<string> {
    n = n || 1

    if (this.cursor - n < 0) {
      return undefined
    }

    return this.data.charAt(this.cursor - n)
  }

  /**
   * Find the position of `char`
   *
   * @note This method does not move the position within the string
   *
   * @example
   * const s = new StringWalker('lorem ipsum')
   * s.findNext(' ') // > 4
   *
   * @see StringWalker.findNextOf()
   * @param char Either a character or a character code
   * @throws An error is thrown if `char` is a string of length other than `1`
   * @returns The position of `char`, or `NaN` if `char` was not found
   */
  public findNext(char: string | number): number {
    if (typeof char === 'string') {
      if (char.length !== 1) {
        throw new Error('findNext() expected a single character')
      }

      char = char.charCodeAt(0)
    }

    let i = this.cursor + 1

    do {
      const k = this.data.charCodeAt(i)

      if (k === char) {
        return i
      }

      i += 1
    } while (i < this.len)

    return NaN
  }

  /**
   * Find the next position of either of `chars`
   *
   * @see StringWalker.findNext()
   *
   * @example
   * const s = new StringWalker('lorem ipsum')
   * s.findNextOf(['s', 'e']) // > 3 (position of e)
   *
   * @param chars List of characters to search for. This can either be
   * characters or character codes
   * @throws An error is thrown if `chars` contains a string of length
   * other than `1`
   * @returns The position of the first found character, or `NaN` if none was
   * found
   */
  public findNextOf(chars: Array<string | number>): number {
    const x = chars.map((c) => {
      if (typeof c === 'string') {
        if (c.length > 1) {
          throw new Error(`findNextOf() expects single characters, got ${c}`)
        }

        return c.charCodeAt(0)
      }

      return c
    })

    let i = this.cursor + 1

    do {
      const k = this.data.charCodeAt(i)

      if (x.includes(k)) {
        return i
      }

      i += 1
    } while (i < this.length)

    return NaN
  }

  /**
   * Move the internal cursor by `steps` number of positions
   * @param steps Steps to move the cursor by
   * @throws An error if the cursor will move beyond the end, or before
   * the start, of the string
   */
  public moveBy(steps: number): this {
    this.assertSaneStart(this.cursor + steps)
    this.assertSaneEnd(this.cursor + steps)
    this.cursor += steps
    return this
  }

  /**
   * Move the internal cursor to the postion `to`
   * @param to Position to move the cursor to
   * @throws An error if the cursor will move beyond the end, or before
   * the start, of the string
   */
  public moveTo(to: number): this {
    this.assertSaneStart(to)
    this.assertSaneEnd(to)
    this.cursor = to
    return this
  }

  /**
   * Returns the character code of the character at position `pos`
   * @param pos The position to get the character code for
   */
  public at(pos: number): number {
    return this.data.charCodeAt(pos)
  }

  /**
   * Returns the character at position `pos`
   * @param pos The position to get the character of
   */
  public charAt(pos: number): string {
    return this.data.charAt(pos)
  }

  /**
   * Moves the internal cursor forward as long as any character in `char` is
   * consecutively found
   *
   * @example
   * // Consume all consecutive whitespace
   * const s = new StringWalker('lorem \t\n ipsum')
   * const spacePos = s.findNext(' ')
   * s.moveTo(spacePos).consume([' ', '\n', '\t'])
   * // Now the cursor is at 'i'.
   *
   * @param char A character, character code or array of these
   */
  public consume(char: string | number | string[] | number[]): this {
    if (!Array.isArray(char)) {
      if (typeof char === 'string') {
        char = char.charCodeAt(0)
      }

      char = [char]
    }

    const chars = (char as Array<string | number>).map((c) => {
      return typeof c === 'string' ? c.charCodeAt(0) : c
    })

    const d = this.data

    while (chars.includes(d.charCodeAt(this.cursor))) {
      this.cursor += 1

      if (this.isEof()) {
        break
      }
    }

    return this
  }

  /**
   * Reset the internal cursor to position `0`
   */
  public rewind(): this {
    this.cursor = 0
    return this
  }

  /**
   * Returns the substring from `from` to `to`. This behaves the same as
   * JavaScripts native `substring()`
   *
   * @throws An error is throws if either `from` is greater than `to`, from
   * is less than `0` or `to` is greater than the string length
   *
   * @returns The substring of `from` to `to`
   */
  public substring(from: number, to?: number): string {
    if (!to) {
      to = this.length
    }

    if (from > to) {
      throw new Error(`from (${from}) can not be greater than (${to})`)
    }

    this.assertSaneStart(from)
    this.assertSaneEnd(to)

    return this.data.substring(from, to)
  }

  /**
   * Throws an error if `n` is less than `0`
   * @param n
   */
  protected assertSaneStart(n: number): void {
    if (n < 0) {
      throw new Error(`Start position ${n} is less than zero`)
    }
  }

  /**
   * Throws an error if `n` is greater than {@see StringWalker#length}
   * @param n
   */
  protected assertSaneEnd(n: number): void {
    if (n > this.len) {
      throw new Error(
        `End position ${n} is greater than the string length ${this.len}`
      )
    }
  }
}
