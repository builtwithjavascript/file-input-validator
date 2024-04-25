import { getMockFileInfo, getMockValidatorItems } from './test-helpers'
import { DefaultFileValidatorOptions } from '../../file-input-validator'
import { ValidatorStrategyLookup } from '../../file-input-validator/FileInputValidator'
import type { IFileValidatorItem, IFileValidatorOptions } from '@/file-input-validator'

describe('ValidatorStrategyLookup', () => {
  it(`should return a defined instance for "name"`, () => {
    const instance = ValidatorStrategyLookup['name']
    expect(instance).toBeDefined()
  })
  it(`should return a defined instance for "type"`, () => {
    const instance = ValidatorStrategyLookup['type']
    expect(instance).toBeDefined()
  })
  it(`should return a defined instance for "size"`, () => {
    const instance = ValidatorStrategyLookup['size']
    expect(instance).toBeDefined()
  })
  it(`should return a defined instance for "datemodified"`, () => {
    const instance = ValidatorStrategyLookup['datemodified']
    expect(instance).toBeDefined()
  })
  it(`should return a defined instance for "lastmodified"`, () => {
    const instance = ValidatorStrategyLookup['lastmodified']
    expect(instance).toBeDefined()
  })

  describe('name', () => {
    it(`should validate name and set hasError to true on the name item when name is too long`, () => {
      const fileInfo = getMockFileInfo()
      const validatorItems = getMockValidatorItems()
      const instance = ValidatorStrategyLookup['name']
      // use a name that i slonger than allowed
      fileInfo.file = {
        name: 'this is definitely too long of a name for the file.csv'
      } as any
      // set options maxNameLength to be max 20 chars
      const options = { ...DefaultFileValidatorOptions, maxNameLength: 20 }
      instance(options, fileInfo, validatorItems)

      const nameItem: IFileValidatorItem = validatorItems.find((x) => x.key === 'name') as any
      expect(nameItem?.hasError).toBeTruthy()
      expect(nameItem?.displayValue).toEqual(`File name is too long - max length allowed is 20 chars`)
      expect(nameItem?.value).toEqual(fileInfo.file?.name)
    })

    it(`should validate name and set hasError to false on the name item when name is valid`, () => {
      const fileInfo = getMockFileInfo()
      const validatorItems = getMockValidatorItems()
      const instance = ValidatorStrategyLookup['name']
      // use a name that i slonger than allowed
      fileInfo.file = {
        name: 'this is an allowed file name length.csv'
      } as any
      // set options maxNameLength to be max 20 chars
      const options = { ...DefaultFileValidatorOptions, maxNameLength: 40 }
      instance(options, fileInfo, validatorItems)

      const nameItem: IFileValidatorItem = validatorItems.find((x) => x.key === 'name') as any
      expect(nameItem?.hasError).toBeFalsy()
      expect(nameItem?.displayValue).toEqual(`this is an al  ... me length.csv`)
      expect(nameItem?.value).toEqual(fileInfo.file?.name)
    })
  })

  describe('type', () => {
    it(`should validate file type and set hasError on the type item when type is not allowed`, () => {
      const fileInfo = getMockFileInfo()
      const validatorItems = getMockValidatorItems()
      const instance = ValidatorStrategyLookup['type']
      // use a type that is not allowed
      fileInfo.file = {
        name: 'this file type is not allowed.jpg'
      } as any
      // set options maxNameLength to be max 20 chars
      const options: IFileValidatorOptions = { ...DefaultFileValidatorOptions, allowedTypes: ['txt'] }
      instance(options, fileInfo, validatorItems)

      const item: IFileValidatorItem = validatorItems.find((x) => x.key === 'type') as any
      expect(item?.hasError).toBeTruthy()
      expect(item?.displayValue).toEqual(`jpg - file type must be txt`)
      expect(item?.value).toEqual('unknown')
    })
  })
})
