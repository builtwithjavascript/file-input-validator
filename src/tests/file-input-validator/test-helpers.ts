import { FileInputValidatorItems } from '../../file-input-validator'
import type { IFileInfo, IFileValidatorItem } from '../../file-input-validator'

export const getMockFileInfo = (): IFileInfo => {
  return {
    file: {} as any,
    lastModified: '',
    fileSelected: true,
    isValid: true,
    name: 'Unit test file.csv',
    displayName: 'Unit test file.csv',
    message: ''
  }
}

export const getMockValidatorItems = (): IFileValidatorItem[] => {
  return FileInputValidatorItems
}
