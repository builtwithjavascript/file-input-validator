import { formatBytes } from '../../file-input-validator/FileInputValidator'

describe('formatBytes', () => {
  // KB
  describe('KB', () => {
    it(`should return expected value for 1024 bytes`, () => {
      const input = 1024
      const expected = `1 KB`
      const result = formatBytes(input)
      expect(result).toBeDefined()
      expect(result).toEqual(expected)
    })

    // test edges
    it(`should return expected value for 1023 bytes`, () => {
      const input = 1023
      const expected = `1023 Bytes`
      const result = formatBytes(input)
      expect(result).toBeDefined()
      expect(result).toEqual(expected)
    })
    it(`should return expected value for 1025 bytes`, () => {
      const input = 1025
      const expected = `1 KB`
      const result = formatBytes(input)
      expect(result).toBeDefined()
      expect(result).toEqual(expected)
    })
    it(`should return expected value for 2023 bytes`, () => {
      const input = 2023
      const expected = `1.98 KB`
      const result = formatBytes(input)
      expect(result).toBeDefined()
      expect(result).toEqual(expected)
    })
  })

  // MB
  describe('MB', () => {
    it(`should return expected value for 1024000 bytes`, () => {
      const input = 1024000
      const expected = `1000 KB`
      const result = formatBytes(input)
      expect(result).toBeDefined()
      expect(result).toEqual(expected)
    })

    // test edges
    it(`should return expected value for 1023999 bytes`, () => {
      const input = 1023999
      const expected = `1000 KB`
      const result = formatBytes(input)
      expect(result).toBeDefined()
      expect(result).toEqual(expected)
    })
    it(`should return expected value for 1024001 bytes`, () => {
      const input = 1024001
      const expected = `1000 KB`
      const result = formatBytes(input)
      expect(result).toBeDefined()
      expect(result).toEqual(expected)
    })
    it(`should return expected value for 2048000 bytes`, () => {
      const input = 2048000
      const expected = `1.95 MB`
      const result = formatBytes(input)
      expect(result).toBeDefined()
      expect(result).toEqual(expected)
    })
    it(`should return expected value for 2047999 bytes`, () => {
      const input = 2047999
      const expected = `1.95 MB`
      const result = formatBytes(input)
      expect(result).toBeDefined()
      expect(result).toEqual(expected)
    })
    it(`should return expected value for 2048001 bytes`, () => {
      const input = 2048001
      const expected = `1.95 MB`
      const result = formatBytes(input)
      expect(result).toBeDefined()
      expect(result).toEqual(expected)
    })
  })
})
