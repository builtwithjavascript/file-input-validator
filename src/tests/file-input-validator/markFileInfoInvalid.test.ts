import { getMockFileInfo } from './test-helpers'
import { markFileInfoInvalid } from '../../file-input-validator/FileInputValidator'

describe('markFileInfoInvalid', () => {
  it(`should mark FileInfo isValid to false`, () => {
    const fileInfo = getMockFileInfo()
    const result = markFileInfoInvalid(fileInfo)
    expect(result).toBeDefined()
    expect(result.isValid).toBeFalsy()
    expect(result.message.length).toBe(0)
  })

  it(`should mark FileInfo isValid to false and set a message`, () => {
    const msg = 'No file selected'
    const fileInfo = getMockFileInfo()
    const result = markFileInfoInvalid(fileInfo, msg)
    expect(result).toBeDefined()
    expect(result.isValid).toBeFalsy()
    expect(result.message).toEqual(msg)
  })
})
