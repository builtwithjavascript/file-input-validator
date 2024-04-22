import { useFileInputValidator } from '../../file-input-validator'

describe('useFileInputValidator', () => {
  it(`should return a defined instance`, () => {
    const options = {}
    const instance = useFileInputValidator(options)
    expect(instance).toBeDefined()
  })
})
