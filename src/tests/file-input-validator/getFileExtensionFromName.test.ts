import { getFileExtensionFromName } from '../../file-input-validator/FileInputValidator'

describe('getFileExtensionFromName', () => {
  it(`should return expected extension`, () => {
    const input = `This is a mocked file name with extension.csv`
    const result = getFileExtensionFromName(input)
    expect(result).toBeDefined()
    expect(result).toEqual('csv')
  })

  it(`should return expected extension when file name extension is uppercase`, () => {
    const input = `This is a mocked file name with extension.CSV`
    const result = getFileExtensionFromName(input)
    expect(result).toBeDefined()
    expect(result).toEqual('csv')
  })

  it(`should return expected extension when file name contains leading and trailing spaces`, () => {
    const input = `    This is a mocked file name with extension.csv    `
    const result = getFileExtensionFromName(input)
    expect(result).toBeDefined()
    expect(result).toEqual('csv')
  })
})
